import { SVDOMComponent, html, css } from '../../core/index.js'

// Import child components
import './button.js'
import './circle.js'

const style = css`
  :host {
    padding: 0;
    color: #ededed;
  }
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 200px;
  }
  .content {
    width: 75%;
    margin-top: 40px;
  }
  h1 {
    margin: 0 0 32px 0;
    font-size: 40px;
  }
  h2 {
    margin-bottom: 12px;
    font-size: 28px;
  }
  p {
    color: var(--grey-6);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
  }
  strong {
    color: var(--grey-8);
  }
  a {
    color: var(--grey-8);
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 32px;
  }
  .container > * {
    margin-top: 12px;
  }
  input {
    appearance: textfield;
    outline: none;
    width: 300px;
    height: 40px;
    padding: 0 12px;
    background-color: var(--grey-1);
    border: 1px solid var(--grey-2);
    border-radius: 6px;

    font-size: 14px;
    color: var(--grey-8);
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input:focus-visible {
    outline-width: 2px;
    outline-style: solid;
    outline-color: var(--grey-6);
  }
  .component-presentation {
    display: flex;
    width: 100%;
    height: auto;
    padding: 24px;
    border: 1px solid var(--grey-2);
    border-radius: 6px;
  }
  .component-presentation.row {
    flex-direction: row;
    justify-content: space-between;
  }
  .component-presentation.col {
    flex-direction: column;
    justify-content: flex-start;
  }
`

/**
 * This class extends form our Component base class
 */
export class AppComponent extends SVDOMComponent(HTMLElement) {
  /**
   * @property
   * Set the stylesheet
   */
  static style = style

  /**
   * @property
   * The component "reactive" state.
   */
  static state = {
    count: 0,
    email: '',
  }

  /**
   * @method
   * This method is called when the component is connected.
   * Is a wrapper for the custom element connectedCallback method.
   */
  onConnected() {
    // eslint-disable-next-line no-console
    console.log(`Connected ${this.name}`)
  }

  /**
   * @method
   * This method is called when the component state changes.
   * Here, we can handle posible side effects and update the component accordingly.
   *
   * @param {State} prev
   * @param {State} next
   */
  // eslint-disable-next-line no-unused-vars
  onStateChange(prev, next) {
    return true
  }

  // eslint-disable-next-line no-unused-vars
  onClickCount(event, increment) {
    const value = increment ? Number(increment) : 1
    this.setStateProp('count', this.state.count + value)
  }

  // eslint-disable-next-line no-unused-vars
  onInputTextChange(event) {
    this.setStateProp('email', event.target.value)
  }
  
  // eslint-disable-next-line no-unused-vars
  onInputNumberChange(event) {
    this.setStateProp('count', Number(event.target.value))
  }

  render() {
    return html`
      <div class="app">
        <div class="content">
          <h1>svdom</h1>
          <h3>Web Components without drama 🍿</h3>
          
          <h2>What</h2>
          <p>
            <strong>svdom</strong> is rooted in web components technology and introduces 
            a lightweight layer for node reconciliation within the Shadow DOM, yielding
            superior performance and a more seamless DX.
          </p>
          <p>
            The core essence of svdom is to offer an uncomplicated and effective approach
            to crafting custom elements on the web, all while harnessing the advantages
            of both shadow and virtual DOMs.
          </p>

          <a href="https://github.com/edgarberm/svdom" target="_blank">GitHub</a>

          <div class="container">
            <h2>Button</h2>
            <p>Testing events, properties and styling. 😎</p>

            <p class="label">
              State count: <strong>${this.state.count}</strong>
            </p>

            <div class="component-presentation row">
              <button-sv ize="small" @click="${this.onClickCount}">
                <strong>＋</strong>
              </button-sv>
              <button-sv size="default" @click=${this.onClickCount}>
                Increment
              </button-sv>
              <button-sv size="large" @click="${() => this.onClickCount(100)}">
                Add 100
              </button-sv>
            </div>
          </div>

          <div class="container">
            <h2>Input</h2>

            <div class="component-presentation col">
              <input
                type="email"
                name="input"
                id="input"
                placeholder="Enter a valid email"
                autocomplete="off"
                @input=${this.onInputTextChange}
              />
              <p>Input value: <strong>${this.state.email}</strong></p>

              <input
                type="number"
                name="number"
                id="number"
                placeholder="Sets the state count"
                autocomplete="off"
                @input=${this.onInputNumberChange}
              />
            </div>
          </div>

          <div class="container">
            <h2>Experiment</h2>
            <p>Change circle size! 🍿</p>

            <div class="component-presentation col">
              <circle-component></circle-component>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('app-component', AppComponent)
