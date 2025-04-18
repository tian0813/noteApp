document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.querySelector("note-form"); // Ambil Web Component
  const form = noteForm.shadowRoot.querySelector("#noteForm");
  const titleInput = noteForm.shadowRoot.querySelector("#title");
  const bodyInput = noteForm.shadowRoot.querySelector("#body");
  const titleError = noteForm.shadowRoot.querySelector("#titleError");
  const bodyError = noteForm.shadowRoot.querySelector("#bodyError");
  const submitButton = noteForm.shadowRoot.querySelector("#submitButton");
  const closeModalButton =
    noteForm.shadowRoot.querySelector("#closeModalButton");

  // Fungsi validasi form
  function validateForm() {
    let isValid = true;

    // Validasi Title
    if (titleInput.value.trim().length < 3) {
      titleError.textContent = "Judul minimal 3 karakter";
      isValid = false;
    } else {
      titleError.textContent = "";
    }

    // Validasi Body
    if (bodyInput.value.trim().length < 5) {
      bodyError.textContent = "Isi catatan minimal 5 karakter";
      isValid = false;
    } else {
      bodyError.textContent = "";
    }

    // Aktifkan tombol submit jika valid
    submitButton.disabled = !isValid;
  }

  // Event Listener untuk validasi saat mengetik
  titleInput.addEventListener("input", validateForm);
  bodyInput.addEventListener("input", validateForm);

  // Fungsi untuk menutup modal
  function closeModal() {
    noteForm.shadowRoot.querySelector("#formModal").classList.remove("show");
    resetForm();
  }

  // Fungsi untuk mereset form
  function resetForm() {
    form.reset();
    submitButton.disabled = true;
  }

  // Menambahkan event listener untuk tombol close modal
  closeModalButton.addEventListener("click", closeModal);

  // Event listener untuk tombol submit form
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addNote();
  });

  function addNote() {
    const title = titleInput.value;
    const body = bodyInput.value;
    const archived = noteForm.shadowRoot.querySelector("#archived").checked;

    console.log("Note added:", { title, body, archived });

    // Simpan atau tampilkan catatan yang baru ditambahkan
    closeModal(); // Menutup modal setelah note ditambahkan
  }
});
