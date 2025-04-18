const notesData = [
  {
    id: "notes-jT-jjsyz61J8XKiI",
    title: "Welcome to Notes, Dimas!",
    body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
    createdAt: "2022-07-28T10:03:12.594Z",
    archived: false,
  },
  {
    id: "notes-aB-cdefg12345",
    title: "Meeting Agenda",
    body: "Discuss project updates and assign tasks for the upcoming week.",
    createdAt: "2022-08-05T15:30:00.000Z",
    archived: false,
  },
  {
    id: "notes-XyZ-789012345",
    title: "Shopping List",
    body: "Milk, eggs, bread, fruits, and vegetables.",
    createdAt: "2022-08-10T08:45:23.120Z",
    archived: false,
  },
  {
    id: "notes-1a-2b3c4d5e6f",
    title: "Personal Goals",
    body: "Read two books per month, exercise three times a week, learn a new language.",
    createdAt: "2022-08-15T18:12:55.789Z",
    archived: false,
  },
  {
    id: "notes-LMN-456789",
    title: "Recipe: Spaghetti Bolognese",
    body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
    createdAt: "2022-08-20T12:30:40.200Z",
    archived: false,
  },
  {
    id: "notes-QwErTyUiOp",
    title: "Workout Routine",
    body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
    createdAt: "2022-08-25T09:15:17.890Z",
    archived: false,
  },
  {
    id: "notes-abcdef-987654",
    title: "Book Recommendations",
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: "2022-09-01T14:20:05.321Z",
    archived: false,
  },
  {
    id: "notes-zyxwv-54321",
    title: "Daily Reflections",
    body: "Write down three positive things that happened today and one thing to improve tomorrow.",
    createdAt: "2022-09-07T20:40:30.150Z",
    archived: false,
  },
  {
    id: "notes-poiuyt-987654",
    title: "Travel Bucket List",
    body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
    createdAt: "2022-09-15T11:55:44.678Z",
    archived: false,
  },
  {
    id: "notes-asdfgh-123456",
    title: "Coding Projects",
    body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
    createdAt: "2022-09-20T17:10:12.987Z",
    archived: false,
  },
  {
    id: "notes-5678-abcd-efgh",
    title: "Project Deadline",
    body: "Complete project tasks by the deadline on October 1st.",
    createdAt: "2022-09-28T14:00:00.000Z",
    archived: false,
  },
  {
    id: "notes-9876-wxyz-1234",
    title: "Health Checkup",
    body: "Schedule a routine health checkup with the doctor.",
    createdAt: "2022-10-05T09:30:45.600Z",
    archived: false,
  },
  {
    id: "notes-qwerty-8765-4321",
    title: "Financial Goals",
    body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
    createdAt: "2022-10-12T12:15:30.890Z",
    archived: false,
  },
  {
    id: "notes-98765-54321-12345",
    title: "Holiday Plans",
    body: "Research and plan for the upcoming holiday destination.",
    createdAt: "2022-10-20T16:45:00.000Z",
    archived: false,
  },
  {
    id: "notes-1234-abcd-5678",
    title: "Language Learning",
    body: "Practice Spanish vocabulary for 30 minutes every day.",
    createdAt: "2022-10-28T08:00:20.120Z",
    archived: false,
  },
];

const notes = [];
const STORAGE_KEY = "NOTE_APPS";
const SAVED_EVENT = "saved-note";
const notesContainer = document.querySelector(".notes");
let editingNoteId = null;
const now = new Date();

document.addEventListener("DOMContentLoaded", function () {
  const storedNotes = localStorage.getItem(STORAGE_KEY);

  if (!storedNotes || JSON.parse(storedNotes).length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesData));
  }
});

function formatDateSimple(isoString) {
  const date = new Date(isoString);
  return (
    date.toLocaleDateString("id-ID") +
    " " +
    date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
  );
}

function generateNoteId() {
  function getRandomNumber() {
    return Math.floor(10000 + Math.random() * 90000);
  }

  return `notes-${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}`;
}

function generateNoteObject(id, title, body, createdAt, archived) {
  return {
    id,
    title,
    body,
    createdAt,
    archived,
  };
}

function getNotes() {
  const storedNotes = localStorage.getItem(STORAGE_KEY);
  return storedNotes ? JSON.parse(storedNotes) : [];
}

function findNoteIndex(noteId) {
  return notes.findIndex((note) => note.id === noteId);
}

function isStorageExist() {
  if (typeof Storage === "undefined") {
    alert("Browser kamu tidak mendukung web storage");
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(notes);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function addNote() {
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

  if (!titleInput || !bodyInput || !archivedInput) {
    console.error("Form input tidak ditemukan!");
    return;
  }

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  const archived = archivedInput.checked;
  const now = new Date(); // Pastikan now dideklarasikan

  if (!title || !body) {
    alert("Title dan Body tidak boleh kosong!");
    return;
  }

  if (editingNoteId !== null) {
    const noteIndex = findNoteIndex(editingNoteId);
    if (noteIndex !== -1) {
      notes[noteIndex] = generateNoteObject(
        editingNoteId,
        title,
        body,
        notes[noteIndex].createdAt,
        archived
      );
      alert("Note berhasil diperbarui");
    }
    editingNoteId = null;
  } else {
    const newNote = generateNoteObject(
      generateNoteId(),
      title,
      body,
      now.toISOString(),
      archived
    );
    notes.push(newNote);
    alert("Note baru berhasil ditambahkan");
  }

  saveData();
  renderNotes();
  resetForm();
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

function renderNotes(filteredNotes = notes) {
  const notesContainer = document.querySelector(".notes");
  const archivedContainer = document.querySelector(".notes-archived");

  notesContainer.innerHTML = "";
  archivedContainer.innerHTML = "";

  const activeNotes = filteredNotes.filter((note) => !note.archived);
  const archivedNotes = filteredNotes.filter((note) => note.archived);

  if (activeNotes.length === 0) {
    notesContainer.innerHTML = `<p class="empty-message">No notes available.</p>`;
  }

  if (archivedNotes.length === 0) {
    archivedContainer.innerHTML = `<p class="empty-message">No archived notes.</p>`;
  }

  filteredNotes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    if (note.archived) {
      noteElement.classList.add("archived-note");
    }

    noteElement.innerHTML = `
      <p class="note-title">${note.title} ${
      note.archived ? "(Archived)" : ""
    }</p>
  <div class="note-content">${note.body}</div>
  <div class="note-actions">
    <div class="note-date">${formatDateSimple(note.createdAt)}</div>
    <div class="note-combine">
      <div class="note-hapus">
        <button onclick="deleteNote('${note.id}')">Delete</button>
      </div>
      <div class="note-edit">
        <button onclick="editNote('${note.id}')">Edit</button>
      </div>
    </div>
  </div>
    `;

    if (note.archived) {
      archivedContainer.appendChild(noteElement);
    } else {
      notesContainer.appendChild(noteElement);
    }
  });
}

function deleteNote(noteId) {
  const noteIndex = findNoteIndex(noteId);
  if (noteIndex !== -1) {
    const confirmation = confirm("Apakah Anda yakin ingin menghapus note ini?");
    if (confirmation) {
      notes.splice(noteIndex, 1);
      saveData();
      renderNotes();
      alert("Note berhasil dihapus");
    }
  }
}

function editNote(noteId) {
  const noteIndex = findNoteIndex(noteId);
  if (noteIndex !== -1) {
    const note = notes[noteIndex];

    const noteForm = document.querySelector("note-form");
    if (noteForm) {
      const shadowRoot = noteForm.shadowRoot;

      const titleInput = shadowRoot.querySelector("#title");
      const bodyInput = shadowRoot.querySelector("#body");
      const archivedCheckbox = shadowRoot.querySelector("#archived");
      const submitButton = shadowRoot.querySelector("#submitButton");

      if (titleInput && bodyInput && submitButton) {
        titleInput.value = note.title;
        bodyInput.value = note.body;

        if (archivedCheckbox) {
          archivedCheckbox.checked = note.archived || false;
        }
        submitButton.textContent = "Update Note";
        submitButton.disabled = false;

        editingNoteId = noteId;

        titleInput.focus();

        openModal();
      }
    }
  }
}

function searchNote() {
  const searchTitle = document.getElementById("search").value.toLowerCase();
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTitle)
  );
  renderNotes(filteredNotes);
}

function loadNotesFromStorage() {
  const notesList = document.getElementById("notesList");
  const notesArchived = document.getElementById("notesArchived");

  if (!notesList || !notesArchived) {
    console.error(
      "Elemen notesList atau notesArchived tidak ditemukan di DOM."
    );
    return;
  }
  document.getElementById("notesList").notes = notes.filter(
    (note) => !note.archived
  );
  document.getElementById("notesArchived").notes = notes.filter(
    (note) => note.archived
  );
  if (isStorageExist()) {
    const storedNotes = getNotes();
    notes.push(...storedNotes);
    renderNotes();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const noteFormComponent = document.querySelector("note-form");

  if (noteFormComponent) {
    noteFormComponent.shadowRoot
      .querySelector("#noteForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        addNote();
      });
  }

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchNote();
    });
  }

  loadNotesFromStorage();
});

document.addEventListener(SAVED_EVENT, () => {
  console.log("Note buku berhasil disimpan ke localStorage.");
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

  if (modal) {
    modal.classList.remove("show");
    resetForm();
    editingNoteId = null;
  } else {
    console.error("Modal tidak ditemukan!");
  }
}
