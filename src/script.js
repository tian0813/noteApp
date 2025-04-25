import "../public/style.css";

import "./components/app-bar.js";
import "./components/search-add.js";
import "./components/note-components.js";
import "./components/note-form.js";

const getNotes = async () => {
  try {
    showLoading("Memuat semua catatan...");
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.data;
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
  }
};

const getNote = async (id) => {
  try {
    showLoading("Memuat 1 catatan...");
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.data;
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
  }
};

const setNote = async (note) => {
  try {
    showLoading("Menambahkan catatan...");
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.data;
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
  }
};

const getArchivedNotes = async () => {
  try {
    showLoading("Memuat semua catatan yang diarsip...");
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/archived`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.data;
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
  }
};

const archiveNote = async (id) => {
  try {
    showLoading("Memuat 1 catatan yang diarsip...");
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}/archive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.data;
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
  }
};

const unarchiveNote = async (id) => {
  try {
    showLoading("Unarchive catatan...");
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.data;
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
  }
};

const removeNote = async (id) => {
  try {
    showLoading("Menghapus catatan...");
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.data;
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
  }
};

function showLoading(text = "Memuat...") {
  const loading = document.getElementById("loading");
  const loadingText = loading.querySelector(".loading-text");
  const app = document.getElementById("container");

  if (loadingText) loadingText.textContent = text;
  if (loading) loading.style.display = "flex";
  if (app) app.style.display = "none";
}

function hideLoading() {
  const loading = document.getElementById("loading");
  const app = document.getElementById("container");

  if (loading) loading.style.display = "none";
  if (app) app.style.display = "block";
}

function formatDateSimple(isoString) {
  const date = new Date(isoString);
  return (
    date.toLocaleDateString("id-ID") +
    " " +
    date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
  );
}

async function addNote() {
  const formComponent = document.querySelector("note-form");
  let titleInput, bodyInput, archivedInput;

  if (formComponent && formComponent.shadowRoot) {
    titleInput = formComponent.shadowRoot.getElementById("title");
    bodyInput = formComponent.shadowRoot.getElementById("body");
    archivedInput = formComponent.shadowRoot.getElementById("archived");
  } else {
    titleInput = document.getElementById("title");
    bodyInput = document.getElementById("body");
    archivedInput = document.getElementById("archived");
  }

  if (!titleInput || !bodyInput) {
    console.error("Form input tidak ditemukan!");
    return;
  }

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) {
    alert("Title dan Body tidak boleh kosong!");
    return;
  }

  await setNote({ title, body });

  renderNotes();
  closeModal();
}

function resetForm() {
  const formComponent = document.querySelector("note-form");
  let form;

  if (formComponent && formComponent.shadowRoot) {
    form = formComponent.shadowRoot.getElementById("noteForm");
  } else {
    form = document.getElementById("noteForm");
  }

  if (form) {
    form.reset();
  } else {
    console.error("Form tidak ditemukan!");
  }
}

async function renderNotes(note) {
  const notesContainer = document.querySelector(".notes");
  const archivedContainer = document.querySelector(".notes-archived");

  notesContainer.innerHTML = "";
  archivedContainer.innerHTML = "";

  const res = await getNotes();
  const resArchived = await getArchivedNotes();

  const createNoteElement = (note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    noteElement.innerHTML = `
      <p class="note-title">${note.title} ${
      note.archived ? "(Archived)" : ""
    }</p>
      <div class="note-content">${note.body}</div>
      <div class="note-actions">
        <div class="note-date">${formatDateSimple(note.createdAt)}</div>
        <div class="note-combine">
          <div class="note-hapus">
            <button type="button" class="delete-button" data-id="${
              note.id
            }">Delete</button>
          </div>
          <div class="note-edit">
            <button type="button" class="archive-button" data-id="${note.id}">
              ${note.archived ? "Unarchive" : "Archive"}
            </button>
          </div>
        </div>
      </div>
    `;

    // Delete button
    noteElement
      .querySelector(".delete-button")
      .addEventListener("click", async () => {
        await deleteNoteTrigger(note.id);
      });

    // Archive / Unarchive button
    const archiveBtn = noteElement.querySelector(".archive-button");
    archiveBtn.addEventListener("click", async () => {
      if (note.archived) {
        await unarchiveNoteTrigger(note.id);
      } else {
        await archiveNoteTrigger(note.id);
      }
    });

    return noteElement;
  };

  console.log(note);

  if (note) {
    const el = createNoteElement(note);
    if (note.archived) {
      notesContainer.innerHTML = "";
      notesContainer.appendChild(el);
    } else {
      archivedContainer.innerHTML = "";
      archivedContainer.appendChild(el);
    }
  } else {
    if (res.length === 0) {
      notesContainer.innerHTML = "<p>Tidak ada catatan</p>";
    } else {
      res.forEach((note) => {
        const el = createNoteElement(note);
        notesContainer.appendChild(el);
      });
    }

    if (resArchived.length === 0) {
      archivedContainer.innerHTML = "<p>Tidak ada arsip</p>";
    } else {
      resArchived.forEach((note) => {
        const el = createNoteElement(note);
        archivedContainer.appendChild(el);
      });
    }
  }
}

async function deleteNoteTrigger(noteId) {
  const confirmation = confirm("Apakah Anda yakin ingin menghapus note ini?");
  if (confirmation) {
    await removeNote(noteId);
    renderNotes();
    alert("Note berhasil dihapus");
  }
}

async function archiveNoteTrigger(noteId) {
  try {
    const confirmation = confirm("Apakah Anda yakin ingin mengarsip note ini?");
    if (confirmation) {
      await archiveNote(noteId);
      renderNotes();
      alert("Note berhasil diarsipkan");
    }
  } catch (error) {
    console.log(error);
  }
}

async function unarchiveNoteTrigger(noteId) {
  try {
    const confirmation = confirm(
      "Apakah Anda yakin ingin mengunarsip note ini?"
    );
    if (confirmation) {
      await unarchiveNote(noteId);
      renderNotes();
      alert("Note berhasil di unarsipkan");
    }
  } catch (error) {
    console.log(error);
  }
}

let searchTimeout;

async function searchNote(e) {
  clearTimeout(searchTimeout); // reset timer setiap kali user ngetik lagi

  searchTimeout = setTimeout(async () => {
    const id = e.data;

    console.log("id: ", id);
    if (id) {
      const note = await getNote(id);
      if (note) {
        renderNotes(note); // Tampilkan catatan yang ditemukan
      } else {
        console.log("Catatan tidak ditemukan");
        // Anda bisa menambahkan logika untuk menampilkan pesan di UI jika diinginkan
      }
    } else {
      await renderNotes(); // Jika input kosong, tampilkan semua catatan
    }
  }, 2000); // jeda waktu 5 detik
}

document.addEventListener("DOMContentLoaded", async function () {
  const noteFormComponent = document.querySelector("note-form");
  const searchAddComponent = document.querySelector("search-add");

  searchAddComponent.addEventListener("open-modal", openModal);
  noteFormComponent.addEventListener("close-modal", closeModal);

  if (noteFormComponent) {
    noteFormComponent.shadowRoot
      .querySelector("#noteForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        await addNote();
      });
  }

  if (searchAddComponent && searchAddComponent.shadowRoot) {
    const searchInput = searchAddComponent.shadowRoot.getElementById("search");

    if (searchInput) {
      searchInput.addEventListener("input", async (e) => {
        console.log(e);
        e.preventDefault();
        await searchNote(e);
      });
    }
  }

  renderNotes();
});

function openModal() {
  const noteForm = document.querySelector("note-form");

  if (!noteForm || !noteForm.shadowRoot) {
    console.error("Elemen note-form atau shadowRoot tidak ditemukan!");
    return;
  }

  const modal = noteForm.shadowRoot.querySelector("#formModal");

  if (modal) {
    modal.classList.add("show");
  } else {
    console.error("Modal tidak ditemukan!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  function attachFormListener() {
    const noteFormComponent = document.querySelector("note-form");

    if (noteFormComponent && noteFormComponent.shadowRoot) {
      const form = noteFormComponent.shadowRoot.getElementById("noteForm");
      const titleInput = noteFormComponent.shadowRoot.getElementById("title");
      const bodyInput = noteFormComponent.shadowRoot.getElementById("body");
      const titleError =
        noteFormComponent.shadowRoot.getElementById("titleError");
      const bodyError =
        noteFormComponent.shadowRoot.getElementById("bodyError");
      const submitButton =
        noteFormComponent.shadowRoot.getElementById("submitButton");

      if (
        !form ||
        !titleInput ||
        !bodyInput ||
        !titleError ||
        !bodyError ||
        !submitButton
      ) {
        setTimeout(attachFormListener, 100);
        return;
      }

      function validateForm() {
        let isValid = true;

        if (titleInput.value.trim().length < 3) {
          titleError.textContent = "Judul minimal 3 karakter";
          isValid = false;
        } else {
          titleError.textContent = "";
        }

        if (bodyInput.value.trim().length < 5) {
          bodyError.textContent = "Isi catatan minimal 5 karakter";
          isValid = false;
        } else {
          bodyError.textContent = "";
        }

        submitButton.disabled = !isValid;
      }

      titleInput.addEventListener("input", validateForm);
      bodyInput.addEventListener("input", validateForm);

      form.addEventListener("submit", (e) => {
        if (!titleInput.value.trim() || !bodyInput.value.trim()) {
          e.preventDefault();
        }
      });
    } else {
      setTimeout(attachFormListener, 100);
    }
  }

  attachFormListener();
});

function closeModal() {
  const noteForm = document.querySelector("note-form");

  if (!noteForm || !noteForm.shadowRoot) {
    console.error("Elemen note-form atau shadowRoot tidak ditemukan!");
    return;
  }

  const modal = noteForm.shadowRoot.querySelector("#formModal");
  console.log(modal);

  if (modal) {
    modal.classList.remove("show");
    resetForm();
  } else {
    console.error("Modal tidak ditemukan!");
  }
}
