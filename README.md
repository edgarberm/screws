

<p align="center" style="margin-top: 0;">
  <img src="https://github.com/edgarberm/screws/blob/main/playground/src/screws-logo.svg" alt="screws logo" width="60px" />
</p>

<h1 align="center" style="margin-top: 4px;">
  Screws
</h1>

<h4 align="center">
Web Components without drama 🍿
</h4>


<br />

> **NOTE:** This repos is intended for personal use and is not yet ready for production projects. Please use it at your own risk. 🚨

<br />

### Why

This project stems from the necessity to wield potent and efficient tools for my personal projects and experiments, all while sidestepping the boilerplate overhead that often accompanies the initiation of a new JavaScript web project.


### What

**screws** is rooted in [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) technology and introduces a lightweight layer for node reconciliation within the Shadow DOM, yielding superior performance and a more seamless DX.

The core essence of screws is to offer an uncomplicated and effective approach to crafting custom elements on the web, all while harnessing the advantages of both shadow and virtual DOMs.

My objectives are centered around:

- Leveraging native and compatible browsers technologies.
- Completely eschewing dependencies and the need for code compilation.
- A DX akin to that of contemporary JavaScript libraries and their paradigms.
- Creating reactive components that dynamically respond to state changes.


### How

To give you a taste of how **screws** works, here's a simple example of creating a custom element using this project:

```js
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

export class AppComponent extends ScrewComponent(HTMLElement) {
  static style = style

  static state = {
    count: 0,
    name: 'Awesome Virtual Shadow DOM Components',
    email: '',
  }

  onConnected() {
    console.log('AppComponent connected!')
  }

  // eslint-disable-next-line no-unused-vars
  onClickCount(event) {
    this.setStateProp('count', this.state.count + 1)
  }

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
```

<br />

If you want to test it out or play with it, you only need to clone the repo, go to the "examples" folder, and run it. You don't need to install anything or transpile the code; you only need a server like the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VSCode extension.

Please, if you use it, let me know about any feedback or issues you encounter! Since this project is still a work in progress, any input you can provide would be highly valuable.