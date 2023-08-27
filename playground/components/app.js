import { SVDOMComponent, html, css } from '../../core/index.js'

// Import child components
import './circle.js'

const style = css`
  :host {
    margin: 0;
    padding: 0;
  }
  .app {
    margin-top: 24px;
    padding: 18px;
    background-color: #f8f8f8;
    border: 1px solid #dadada;
    border-radius: 4px;
  }
  h2 {
    margin-bottom: 12px;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .container > * {
    margin-top: 12px;
  }
  button {
    padding: 0 4px;
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
    name: 'Awesome Virtual Shadow DOM Components',
    email: '',
  }

  /**
   * @method
   * This method is called when the component is connected.
   * Is a wrapper for the custom element connectedCallback method.
   */
  onConnected() {
    // eslint-disable-next-line no-console
    console.log('Component connected')
    // eslint-disable-next-line no-console
    console.log(this.name)
  }

  /**
   * @method
   * This method is called when the component state changes.
   * Here, we can handle posible side effects and update the component accordingly.
   *
   * @param {State} prev
   * @param {State} next
   */
  onStateChange(prev, next) {
    return true
  }

  // eslint-disable-next-line no-unused-vars
  onClickCount(event) {
    this.setStateProp('count', this.state.count + 1)
  }

  // eslint-disable-next-line no-unused-vars
  onInputChange(event) {
    this.setStateProp('email', event.target.value)
  }

  render() {
    return html`
      <div class="app">
        <h2 data-tag="tag">AppComponent</h2>

        <p class="label">${this.state.name}</p>

        <p class="label" style="margin-top: 12px;">
          This value comes from the reactive state:
          <strong>${this.state.count}</strong>
        </p>

        <div class="container">
          <a href="your-url.here" target="_blank">Link</a>
          <button id="btn" @click=${this.onClickCount}>click me</button>
          <input
            type="email"
            name="input"
            id="input"
            placeholder="Enter a valid email"
            autocomplete="off"
            @input=${this.onInputChange}
          />
          <p>Input value: <strong>${this.state.email}</strong></p>
        </div>

        <circle-component></circle-component>
      </div>
    `
  }
}

customElements.define('app-component', AppComponent)
