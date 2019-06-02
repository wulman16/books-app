const getBooks = searchTerm => {
  fetch(`http://localhost:3003/books/?search=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      const results = document.getElementById(`book-results`);
      if (data.error) {
        results.textContent = data.error;
      } else {
        results.textContent = data;
      }
    });
};

const searchForm = document.getElementById(`book-form`);
searchForm.addEventListener(`submit`, e => {
  e.preventDefault();
  const results = document.getElementById(`book-results`);
  results.textContent = `Loading...`;
  getBooks(e.target[0].value);
});
