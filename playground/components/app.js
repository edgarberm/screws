import { ScrewComponent, html, css } from '../../core/index.js'

// Import child components
import './button.js'
import './circle.js'
import './icon-component.js'

const style = css`
  :host {
    margin: 0;
    padding: 0;
  }
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 200px;
    color: #0a0a0a;
  }
  .content {
    width: 75%;
    margin-top: 40px;
  }
  .logo {

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
    color: var(--grey-4);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
  }
  strong {
    color: var(--grey-1);
  }
  a {
    color: var(--grey-1);
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
    background-color: var(--grey-8);
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
  .presentation {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    border: 1px solid var(--grey-7);
    border-radius: 6px;
    overflow: hidden;
  }
  .presentation .component {
    display: flex;
    padding: 24px;
  }
  .presentation .component.row {
    flex-direction: row;
    justify-content: space-between;
  }
  .presentation .component.col {
    flex-direction: column;
    justify-content: flex-start;
  }
  .presentation .description {
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: space-between;
    width: 100%;
    height: 40px;
    padding: 0 24px;
    background-color: var(--grey-8);
  }
  .description p {
    font-weight: 400;
    color: var(--grey-5);
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
          <div class="logo">
            <icon-component icon="logo" viewBox="0 0 81 81" size="40" color="#9377E3"></icon-component>
          </div>
          
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
          
            <div class="presentation">
              <div class="component row">
                <button-sv size="small" @click=${this.onClickCount}>
                  Small
                </button-sv>
                <button-sv size="default" @click=${this.onClickCount}>
                  Default
                </button-sv>
                <button-sv size="large" @click="${() => this.onClickCount(100)}">
                  Large
                </button-sv>
              </div>

              <div class="description">
                <p>Buttons</p>
              </div>
            </div>

            <div class="component row">
              <button-sv
                size="small"
                iconstart="autorenew"
                @click=${this.onClickCount}
              >
                Start
              </button-sv>
              <button-sv
                size="default"
                iconend="autorenew"
                @click=${this.onClickCount}
              >
                End
              </button-sv>
              <button-sv
                size="large"
                iconstart="autorenew"
                iconend="autorenew"
                @click="${() => this.onClickCount(100)}"
              >
                Double
              </button-sv>
            </div>
          </div>

          <div class="container">
            <h2>Icon</h2>
            <p>Testing load SVG sources.</p>

            <div class="component row">
              <icon-component icon="cancel" color="#9377E3"></icon-component>
              <icon-component
                icon="panel-bottom"
                color="#3082FC"
              ></icon-component>
              <icon-component
                icon="drag-indicator"
                color="#007CF0"
              ></icon-component>
              <icon-component icon="autorenew" color="#00DFD8"></icon-component>
            </div>
          </div>

          <div class="container">
            <h2>Input</h2>

            <div class="component col">
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

            <div class="component col">
              <circle-component></circle-component>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('app-component', AppComponent)
