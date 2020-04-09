# Crunchyroll scrapper

![package](https://img.shields.io/npm/v/@ablanc/crunchyroll)
![build](https://img.shields.io/circleci/build/github/adblanc/crunchyroll)
![coverage](https://img.shields.io/coveralls/github/adblanc/crunchyroll)

<br/>

## Description

Node.js module to scrap content of crunchyroll.fr.

## Installation

`$ npm install @ablanc/crunchyroll --save`

## Examples

```javascript
const crunchyroll = require("@ablanc/crunchyroll");

const list = await crunchyroll.getAnimeList();
const episodes = await crunchyroll.getEpisodes(list[0].link);
const infos = await crunchyroll.getAnimeInfos(list[0].link);

const alphaAnimes = await crunchyroll.getByAlphaNum("a"); // "a-z" || numeric

const popularAnimes = await crunchyroll.getPopularAnime();
const simulcastsAnimes = await crunchyroll.getSimulcastsAnime(); // 40 is the limit tho so > 40 will still return at most 40 animes.
const dramaSliceOfLifeAnimes = await crunchyroll.getByGenresAnime({
  page: 0,
  length: 20,
  tags: ["drama"],
});
const fall2019Animes = await crunchyroll.getBySeasonAnime({
  season: "fall_2019",
});
const lastAnimes = await crunchyroll.getMostRecentsAnime();

const calendar = await crunchyroll.getCalendar();

const calendarTwo = await crunchyroll.getCalendar({
date: "2020-03-22",
free: true,
});
```

## Tests

Tests are run using Jest framework. <br/>
`$ npm test`
