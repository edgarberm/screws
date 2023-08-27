import { SVDOMComponent, html, css } from '../../core/index.js'

const style = css`
  .section {
    margin-top: 32px;
  }
  .circle {
    margin-top: 20px;
    background-color: #00ff00;
    border-radius: 50%;
  }
`

export class CircleComponent extends SVDOMComponent(HTMLElement) {
  static style = style

  static state = {
    size: 80
  }

  handleSize(event) {
    event.preventDefault()
    this.setStateProp('size', Number(event.target.value))
  }

  render() {
    return html`
      <div class="section">
        <p>Change circle size! <strong>${this.state.size}px</strong></p>

        <input
          type="range"
          id="range"
          name="range"
          min="80"
          max="200"
          step="1"
          value=${this.state.size}
          @input=${this.handleSize}
        />

        <div
          class="circle"
          style="
              width: ${this.state.size}px;
              height: ${this.state.size}px;
            "
        ></div>
      </div>
    `
  }
}

customElements.define('circle-component', CircleComponent)
