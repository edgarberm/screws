import { ScrewComponent, html, css } from '../../core/index.js'

const style = css`
  p {
    margin: 0 0 12px 0;
    color: var(--grey-6);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
  }
  strong {
    color: var(--grey-8);
  }
  .circle {
    margin-top: 20px;
    background-color: #00ff00;
    border-radius: 50%;
  }
`

export class CircleComponent extends ScrewComponent(HTMLElement) {
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
      <div class="wrapper">
        <p>Size: <strong>${this.state.size}px</strong></p>

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
