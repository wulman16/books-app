const getBooks = searchTerm => {
  fetch(`http://localhost:3003/books/?search=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      const results = document.getElementById(`book-results`);
      if (data.error) {
        results.textContent = data.error;
      } else {
        displayBooks(data);
      }
    });
};

const displayBooks = data => {
  const results = document.getElementById(`book-results`);
  results.innerHTML = ``;

  data.forEach(b => {
    const book = document.createElement(`div`);
    book.className = `book`;

    if (b.image.length !== 0) {
      const image = document.createElement(`img`);
      image.className = `thumbnail`;
      image.src = b.image;
      const dialog = document.getElementById(`books-dialog`);
      image.addEventListener(`click`, () => {
        if (typeof dialog.showModal === "function") {
          handleDialog(b);
        } else {
          alert("The dialog API is not supported by this browser");
        }
      });
      book.appendChild(image);
    }

    results.appendChild(book);
  });
};

const handleDialog = book => {
  const dialog = document.getElementById(`books-dialog`);
  const title = document.getElementById(`title`);
  const authors = document.getElementById(`authors`);
  const date = document.getElementById(`date`);
  const description = document.getElementById(`description`);

  title.textContent = ``;
  authors.textContent = ``;
  date.textContent = ``;
  date.textContent = ``;

  if (book.title) {
    title.textContent = book.title;
  }

  if (book.authors) {
    const authorsText = book.authors.join(`, `);
    authors.textContent = authorsText;
  }

  if (book.date) {
    date.textContent = book.date;
  }

  if (book.description) {
    description.textContent = book.description;
  }

  dialog.showModal();
};

// Handle dialog close
document.getElementById(`close-dialog`).addEventListener(`click`, () => {
  document.getElementById(`books-dialog`).close();
});

const searchForm = document.getElementById(`book-form`);
searchForm.addEventListener(`submit`, e => {
  e.preventDefault();
  const results = document.getElementById(`book-results`);
  results.textContent = `Loading...`;
  getBooks(e.target[0].value);
});
