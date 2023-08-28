import { ScrewComponent, html, css } from 'core/index.js'
const style = css`
  :host {}
`

export class KkkKkk extends ScrewComponent(HTMLElement) {
  static style = style

  static props = {}

  // eslint-disable-next-line no-unused-vars
  onConnected() {}

  render() {
    return html`
      <div>
        ${this.textContent}
      </div>
    `
  }
}

customElements.define('kkk-kkk', KkkKkk)
