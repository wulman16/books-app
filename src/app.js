/* eslint-disable no-undef */
const path = require(`path`);
const express = require(`express`);
const hbs = require(`hbs`);
const books = require(`./utils/books`);

const app = express();

const publicDirectoryPath = path.join(__dirname, `../public`);
const viewsPath = path.join(__dirname, `../templates/views`);
const partialsPath = path.join(__dirname, `../templates/partials`);

app.set(`view engine`, `hbs`);
app.set(`views`, viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get(``, (req, res) => {
  res.render(`index`, {
    title: `Books`,
    name: `Will Ulman`
  });
});

app.get(`/about`, (req, res) => {
  res.render(`about`, {
    title: `About`,
    name: `Will Ulman`
  });
});

app.get(`/books`, (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: `Search term must be provided!`
    });
  }

  books(req.query.search, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    res.send(data);
  });
});

app.get(`*`, (req, res) => {
  res.render(`404`, {
    title: 404,
    name: `Will Ulman`,
    message: `Page not found :(`
  });
});

app.listen(3003, () => {
  console.log(`Server is up on port 3003!`);
});
