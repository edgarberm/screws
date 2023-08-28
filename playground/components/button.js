import { ScrewComponent, html, css, shortID } from '../../core/index.js'

const style = css`
  :host {
    font-family: 'SF Pro Text', 'SF Pro Display', -apple-system,
          BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
          'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

    --background: var(--grey-8);
    --border: var(--grey-8);
    --color: var(--grey-0);
  }
  
  .button {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 40px;
    margin: 0;
    padding: 0 12px;
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: 6px;

    font-size: 14px;
    font-weight: 400;
    color: var(--color);

    transition: background-color 0.15s ease, border-color 0.15s ease;
  }
  .button.small {
    height: 32px;
  }
  .button.large {
    height: 44px;
    font-size: 16px;
  }

  .button:hover {
    background-color: var(--grey-7);
    border-color: var(--grey-7);
  }
`

export class ButtonComponent extends ScrewComponent(HTMLElement) {
  static style = style

  static props = {
    id: shortID(),
    size: 'default',
    type: 'button'
  }

  // Same as native connectedCallback
  onConnected() {
    // eslint-disable-next-line no-console
    console.log(`Connected ${this.name}`)
  }

  /**
   * Is not needed set the events to this DOM becauso the SVDOM component
   * automatically adds the events to the custom element. 😎
   * 
   * But if for some reason you need, you can intercept the events:
   * 
   * @example
   * ```js
   * <button ... @click=${this.hendleClick}>
   * ```
   */
  // eslint-disable-next-line no-unused-vars
  handleClick(event) {}

  render() {
    return html`
      <button type="button" id="${this.props.id}" class="button ${this.props.size}">
        ${this.textContent}
      </button>
    `
  }
}

customElements.define('button-sv', ButtonComponent)
