const parseResponse = items => {
  return items.map(item => {
    return {
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      date: item.volumeInfo.publishedDate,
      description: item.volumeInfo.description,
      image: item.volumeInfo.imageLinks.thumbnail
    };
  });
};

module.exports = parseResponse;
