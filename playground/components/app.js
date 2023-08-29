import { ScrewComponent, html, css } from '../../core/index.js'

// Import child components
import './button.js'
import './circle.js'
import './icon-component.js'

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
export class AppComponent extends ScrewComponent(HTMLElement) {
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
          <svg
            width="81"
            height="81"
            viewBox="0 0 81 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.641 75.282C39.7727 86.3277 64.2363 79.7728 75.282 60.641C86.3278 41.5092 79.7727 17.0457 60.641 6C41.5093 -5.0457 17.0457 1.50924 6 20.641C-5.04573 39.7728 1.50931 64.2363 20.641 75.282ZM48.7047 34.6743L56.7718 20.7017L49.8436 16.7017L41.9106 30.442L34.442 32.4432L20.7017 24.5102L16.7017 31.4384L30.6741 39.5054L32.5772 46.6079L24.5102 60.5803L31.4384 64.5803L39.6395 50.3756L46.3757 48.5707L60.5803 56.7718L64.5803 49.8436L50.6077 41.7765L48.7047 34.6743Z"
              fill="white"
            />
          </svg>
          <h1>screws</h1>
          <h3>Web Components without drama 🍿</h3>

          <h2>What</h2>
          <p>
            <strong>screws</strong> is rooted in web components technology and
            introduces a lightweight layer for node reconciliation within the
            Shadow DOM, yielding superior performance and a more seamless DX.
          </p>
          <p>
            The core essence of screws is to offer an uncomplicated and
            effective approach to crafting custom elements on the web, all while
            harnessing the advantages of both shadow and virtual DOMs.
          </p>

          <a href="https://github.com/edgarberm/screws" target="_blank"
            >GitHub</a
          >

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
            <h2>Icon</h2>
            <p>Testing load SVG sources.</p>
            
            <div class="component-presentation row">
              <icon-component icon="cancel" color="#9377E3"></icon-component>
              <icon-component icon="panel-bottom" color="#3082FC"></icon-component>
              <icon-component icon="drag-indicator" color="#007CF0"></icon-component>
              <icon-component icon="autorenew" color="#00DFD8"></icon-component>
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
