const request = require(`request`);

const books = (search, callback) => {
  const searchTerm = encodeURIComponent(search);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback(`No results found. Try a different search term!`);
    } else {
      callback(body);
    }
  });
};

books(``, console.log);
