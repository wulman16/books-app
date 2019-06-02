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
      book.appendChild(image);
    }

    if (b.title) {
      const title = document.createElement(`h3`);
      title.className = `title`;
      title.textContent = b.title;
      book.appendChild(title);
    }

    if (b.authors) {
      const authors = document.createElement(`h5`);
      authors.className = `authors`;
      const authorsText = b.authors.join(`, `);
      authors.textContent = authorsText;
      book.appendChild(authors);
    }

    if (b.date) {
      const date = document.createElement(`h5`);
      date.className = `date`;
      date.textContent = b.date;
      book.appendChild(date);
    }

    if (b.description) {
      const description = document.createElement(`p`);
      description.className = `description`;
      description.textContent = b.description;
      book.appendChild(description);
    }

    results.appendChild(book);
  });
};

const searchForm = document.getElementById(`book-form`);
searchForm.addEventListener(`submit`, e => {
  e.preventDefault();
  const results = document.getElementById(`book-results`);
  results.textContent = `Loading...`;
  getBooks(e.target[0].value);
});
