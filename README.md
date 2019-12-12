# Crunchyroll scrapper

![package](https://img.shields.io/npm/v/@ablanc/crunchyroll)<br/>

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

const popularAnimes = await crunchyroll.getPopularAnime(0, 20);
const simulcastsAnimes = await crunchyroll.getSimulcastsAnime(0, 70); // 40 is the limit tho so > 40 will still return at most 40 animes.
const dramaSliceOfLifeAnimes = await crunchyroll.getByGenresAnime(0, 40, [
  "drama",
  "slice_of_life"
]);
const fall2019Animes = await crunchyroll.getBySeasonAnime(0, 40, "fall_2019");
const lastAnimes = await crunchyroll.getMostRecentsAnime(0, 40);
```
