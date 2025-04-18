class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set note(data) {
    this._note = data;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
          <style>
            .note {
              border: 1px solid #ddd;
              padding: 10px;
              margin: 5px;
              border-radius: 5px;
              background: #f9f9f9;
            }
            .note-actions {
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
            }
          </style>
          <div class="note">
            <p class="note-title">
              ${this._note.title} ${this._note.archived ? "(Archived)" : ""}
            </p>
            <div class="note-content">${this._note.body}</div>
            <div class="note-actions">
              <div class="note-date">${this._note.createdAt}</div>
              <div class="note-buttons">
                <button onclick="deleteNote('${this._note.id}')">Delete</button>
                <button onclick="editNote('${this._note.id}')">Edit</button>
              </div>
            </div>
          </div>
        `;
  }
}

customElements.define("note-item", NoteItem);

// Komponen untuk catatan yang tidak diarsipkan
class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set notes(data) {
    this._notes = data.filter((note) => !note.archived);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = "";
    const container = document.createElement("div");
    this._notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.note = note;
      container.appendChild(noteItem);
    });
    this.shadowRoot.appendChild(container);
  }
}

customElements.define("note-list", NoteList);

// Komponen untuk catatan yang diarsipkan
class NoteArchived extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set notes(data) {
    this._notes = data.filter((note) => note.archived);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = "";
    const container = document.createElement("div");
    this._notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.note = note;
      container.appendChild(noteItem);
    });
    this.shadowRoot.appendChild(container);
  }
}

customElements.define("note-archived", NoteArchived);
