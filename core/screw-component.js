import { dashify, parseListener } from './utils.js'


const PARSER = 'text/html'

/**
 * The Component base class for all components.
 *
 * As the properties and class methods of ES6 are not enumerable we need to wrap our class
 * into a function to solve this problem.
 *
 * Refs:
 * - https://html.spec.whatwg.org/multipage/custom-elements.html
 *
 * @type {WebComponent}
 * */
export const ScrewComponent = (SuperClass /** @type {HTMLElement} */) =>
  class extends SuperClass {
    /** @type {string} */
    name = undefined
    /** @type {ElementInternals} */
    internals = undefined
    /** @type {ShadowRoot} */
    shadow = undefined
    /** @type {HTMLElement} */
    VSDOM = undefined
    /** @type {[key: string]: unkown} */
    // internalEventListeners = {}
    /** @type {[key: string]: unkown} */
    state = undefined
    /** @type {name: unkown} */
    props = {}
    /** @type {HTMLDivElement} */
    component = undefined
    /** @type {HTMLTemplateElement} */
    stylesTemplate = undefined

    constructor() {
      super()

      // Get component registration name
      this.name = dashify(this.constructor.name)

      this.shadow = super.attachShadow({ mode: 'closed' })
      this.internals = super.attachInternals()

      // KISS state handling
      this.state = Object.freeze(this.constructor.state || {})

      this.setState = this.constructor.setState.bind(this)
      this.setStateProp = this.constructor.setStateProp.bind(this)

      // Set the component and the stylesheet
      this.constructor.setComponentContainer.call(this)
      this.constructor.style && this.constructor.setStylesheet.call(this)
    }

    /**
     * First time component initialization we need to render all the markup
     */
    connectedCallback() {
      this.setProperties.call(this)
      super.connectedCallback?.()
      this.onConnected?.()

      this.constructor.render.call(this)
      this.constructor.addInitialEventListeners.call(this)
    }

    /**
     * @internal
     * @todo
     */
    // eslint-disable-next-line no-unused-vars
    attributeChangedCallback(prop, next, prev) {}

    setProperties() {
      if (this.attributes.length > 0) {
        Array.from(this.attributes).forEach((attr) => {
          this.props = {
            ...this.constructor.props,
            ...this.props,
            [attr.name]: attr.value,
          }
        })
      }
    }

    /**
     * @internal
     * Fake reactive state.
     */
    static setState(newState) {
      const apply = this.onStateChange?.(newState, this.state)

      if (apply !== false) {
        this.state = Object.freeze({ ...newState })
        this.reconciliate()
      }
    }

    /**
     * @internal
     */
    static setStateProp(property, value) {
      const prev = { ...this.state }
      const tmp = { ...this.state }
      tmp[property] = value

      const apply = this.onStateChange?.(prev, tmp)

      if (apply !== false) {
        this.state = Object.freeze(tmp)
        this.reconciliate()
      }
    }

    // For better performance?
    // static replaceStateProp(property, value) {
    //   const tmp = { ...this.state }
    //   if (!tmp[property]) {
    //     throw new Error(`WebComponent: ${property} don't exist into the state.`)
    //   }
    //   delete tmp[property]
    //   this.state = Object.freeze({ ...tmp, property: value })
    //   this.update()
    // }

    /**
     * @method
     * This method is responsible for updating the markup of the component.
     */
    static render() {
      if (!this.component) return
      this.VSDOM = this.render?.()
      // console.log(JSON.parse(JSON.stringify(this.vsdom)))
      const currentContent = this.component.innerHTML

      if (this.VSDOM !== currentContent) {
        this.component.innerHTML = this.VSDOM
      }
    }

    /**
     * @internal
     *
     * After component initialization and render in the most cases we don't need to render
     * the full  the markup any more. To avoid this, we need to use an reconciliation
     * algorithm that runs through the nodes of the current VSDOM snapshot and compares it
     * to the new nodes data to determine if the node need to be re-rendered or not.
     *
     * In this way we can achieve a very efficient and selective DOM rendering which give
     * us a very high performance.
     */
    reconciliate() {
      // console.time()
      const nextVSDOM = this.render?.()

      if (this.VSDOM !== nextVSDOM) {
        const nextDOM = new DOMParser().parseFromString(nextVSDOM, PARSER)

        this.reconciliateDOMNodes(
          this.component.firstElementChild,
          nextDOM.body.firstChild
        )
        this.VSDOM = nextVSDOM
      }

      // console.timeEnd()
    }

    /**
     * @internal
     *
     * New approach ⚡️
     *
     * Since we can't check if they are different we have to change strategy,
     * so we will use that to discard or not the nodes.
     *
     * If they are the same we don't continue comparing their children, otherwise
     * we will go through the tree and continue with the same strategy.
     *
     * This new approach is more efficient since it will discard the parent nodes.
     *
     * @todo
     * - Optimize the cloning of the nodes. It may not be necessary to clone the entire node,
     *   just update its attributes. It is necessary to evaluate if it is worth it.
     * - Keying. Study on the subject.
     * - testing.
     */
    reconciliateDOMNodes(currentNode, nextNode) {
      const currChilds = currentNode.children
      const nextChilds = nextNode.children

      if (currentNode.innerHTML !== nextNode.innerHTML) {
        if (!currChilds.length || !nextChilds.length) {
          if (currentNode.innerHTML !== nextNode.innerHTML) {
            currentNode.replaceWith(nextNode)
            return
          }
        }

        if (currChilds.length !== nextChilds.length) {
          currentNode.replaceWith(nextNode)
          return
        }

        for (let i = 0; i < currChilds.length; i++) {
          this.reconciliateDOMNodes(currChilds[i], nextChilds[i])
        }
      } else if (!currChilds.length || !nextChilds.length) {
        const currAttrs = Array.from(currentNode.attributes)
        const nextAttrs = Array.from(nextNode.attributes)
        // Change for another faster loop?
        currAttrs.forEach((attr, i) => {
          if (attr.value !== nextAttrs[i].value) {
            currentNode.setAttribute(attr.name, nextAttrs[i].value)
          }
        })
      }
    }

    /**
     * @internal
     * Set the component container to the shadow.
     *
     * This is useful to improve the queries to the shadow DOM and to keep thisngs clean
     * and easy. The render method attach the renderized content to this container.
     * ⚠️ Keep in mind that. Avoid to append nodes direclty to the shadow.
     */
    static setComponentContainer() {
      this.component = document.createElement('div')
      this.component.setAttribute('data-component-name', this.name)
      this.shadow.appendChild(this.component)
    }

    /**
     * @internal
     * Sets the stylesheet to de component shadow
     */
    static setStylesheet() {
      const style = document.createElement('style')
      style.textContent = this.constructor.style
      this.shadow.prepend(style)
    }

    /**
     * @internal
     * Attach the events to the element.
     * To make it work, we need to set the events we want to attach (and listen).
     */
    static addInitialEventListeners() {
      const all = this.shadow.querySelectorAll('*')
      const nodes = Array.from(all).filter((node) => node.nodeType !== 3)

      for (const node of nodes) {
        const attrs = node
          .getAttributeNames()
          .filter((name) => name.startsWith('@'))

        for (const attr of attrs) {
          const type = attr.substring(1).toLowerCase()
          const listener = node.getAttribute(attr)
          const { name, args } = parseListener(listener)
          node.addEventListener(type, (event) => {
            this[name](event, ...args)
          })
        }
      }
    }
  }
