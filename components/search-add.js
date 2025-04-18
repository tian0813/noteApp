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
          <input type="text" id="search" placeholder="Cari catatan berdasarkan judul...">
        </div>
        <button class="toggle-form-button" onclick="openModal()">Add New Note</button>
      </div>
    `;
  }

  setupEventListeners() {
    const searchInput = this.shadowRoot.querySelector("#search");
    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        const searchQuery = event.target.value.toLowerCase();
        this.filterNotes(searchQuery);
      });
    }
  }

  filterNotes(query) {
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(query)
    );
    renderNotes(filteredNotes);
  }
}

customElements.define("search-add", SearchAdd);
