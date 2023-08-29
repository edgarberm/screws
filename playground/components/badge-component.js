import { ScrewComponent, html, css } from '../../core/index.js'

const style = css`
  :host {}
`

export class BadgeComponent extends ScrewComponent(HTMLElement) {
  static style = style

  static props = {}

  // eslint-disable-next-line no-unused-vars
  onConnected() {
    console.log(this.innerHTML);
  }

  render() {
    return html`
      <slot name="badge">
        ${this.innerHTML}
      </slot>
    `
  }
}

customElements.define('badge-component', BadgeComponent)
