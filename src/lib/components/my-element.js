import {LitElement, html} from 'lit';

class MyElement extends LitElement {
  render() {
    return html`
      <div>😊</div>
    `;
  }
}
customElements.define('my-element', MyElement);