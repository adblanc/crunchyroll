const {
  getByGenresAnime,
  getBySeasonAnime,
  getMostRecentsAnime,
  getPopularAnime,
  getSimulcastsAnime,
  getByAlphaNum
} = require("./src/anime.js");

const { getEpisodes } = require("./src/episodes.js");

const { getAnimeList } = require("./src/list");

const getCalendar = require("./src/calendar");

const getAnimeInfos = require("./src/infos");

module.exports = {
  getByGenresAnime,
  getBySeasonAnime,
  getMostRecentsAnime,
  getPopularAnime,
  getSimulcastsAnime,
  getEpisodes,
  getAnimeList,
  getCalendar,
  getAnimeInfos,
  getByAlphaNum
};
