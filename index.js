const {
  getByGenresAnime,
  getBySeasonAnime,
  getMostRecentsAnime,
  getPopularAnime,
  getSimulcastsAnime
} = require("./src/anime.js");

const { getEpisodes } = require("./src/episodes.js");

const { getAnimeList } = require("./src/list");

const getCalendar = require("./src/calendar");

module.exports = {
  getByGenresAnime,
  getBySeasonAnime,
  getMostRecentsAnime,
  getPopularAnime,
  getSimulcastsAnime,
  getEpisodes,
  getAnimeList,
  getCalendar
};
