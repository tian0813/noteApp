class SearchAdd extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="style.css">
      <div class="search-add">
        <div class="search-box">
          <input type="text" id="search" placeholder="Cari catatan berdasarkan id">
        </div>
        <button class="toggle-form-button">Add New Note</button>
      </div>
    `;
  }

  setupEventListeners() {
    const toggleFormButton = this.shadowRoot.querySelector(
      ".toggle-form-button"
    );

    if (toggleFormButton) {
      toggleFormButton.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("open-modal"));
      });
    }
  }
}

customElements.define("search-add", SearchAdd);
