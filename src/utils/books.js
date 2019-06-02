const request = require(`request`);
const parseResponse = require(`./parse-response`);

const books = (search, callback) => {
  const searchTerm = encodeURIComponent(search);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10`;
  request({ url: url, json: true }, (error, { body }) => {
    if (body.error) {
      callback(body.error.message);
    } else if (body.totalItems === 0) {
      callback(
        `No volumes found! Please change your search terms and try again.`
      );
    } else {
      callback(parseResponse(body.items));
    }
  });
};

books(`the basic eight`, console.log);

module.exports = books;
