const fetch = require("node-fetch");

module.exports = function requestCrunchyroll(url) {
  url = encodeURI(url);
  return fetch(url)
    .then(response => response.text())
    .catch(error =>
      console.error(`Error while fetching crunchyroll page : ${error}`)
    );
};
