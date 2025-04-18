class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
        <link rel="stylesheet" href="style.css">
        <div class="modal" id="formModal">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Note</h5>
              <button class="close" id="closeButton" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
              <form action="" method="POST" id="noteForm">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" id="title" name="title" />
                  <small class="error-message" id="titleError"></small>
                </div>
                <div class="form-group">
                  <label for="body">Body</label>
                  <textarea id="body" name="body" rows="3"></textarea>
                  <small class="error-message" id="bodyError"></small>
                </div>
                <div class="form-checkbox">
                  <label for="archived">Archived ?</label>
                  <input type="checkbox" id="archived" name="archived" />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" id="closeModalButton" onclick="closeModal()">
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary" id="submitButton" disabled>
                    Create Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("note-form", NoteForm);
