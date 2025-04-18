class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "style.css");

    const header = document.createElement("div");
    header.classList.add("header");
    header.textContent = "📒 Note App";

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(header);
  }
}

customElements.define("app-bar", AppBar);
