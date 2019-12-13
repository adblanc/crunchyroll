const fs = require("fs").promises;

const crunchyroll = require("../index");

async function saveAllAnimes() {
  console.time("animes");
  const list = await crunchyroll.getAnimeList();
  const result = [];
  for await (let anime of list) {
    const eps = await crunchyroll.getEpisodes(anime.link);
    result.push({ ...anime, seasons: [...eps] });
    console.log("on push");
  }
  await fs.writeFile("./crunchyroll_animes.json", JSON.stringify(result));
  console.log(`Animes.json mis a jour avec ${result.length} animes!`);
  console.timeEnd("animes");
}

async function getCalendar() {
  const calendar = await crunchyroll.getCalendar("2019-11-11", true);
  const animes = await crunchyroll.getPopularAnime(0, 20);
  console.log(calendar[0].episodes);
}

async function getInfos(url) {
  console.log(await crunchyroll.getAnimeInfos(url));
}

async function getAlpha(letter) {
  console.log(await crunchyroll.getByAlphaNum(letter));
}

//getAlpha("m");

getInfos("https://www.crunchyroll.com/fr/a-certain-magical-index");
getInfos("https://www.crunchyroll.com/fr/dr-stone");
getInfos("https://www.crunchyroll.com/fr/free-iwatobi-swim-club");

//getCalendar();

//crunchyroll.getPopularAnime(0, 20);
// crunchyroll.getSimulcastsAnime(0, 70);
// crunchyroll.getByGenresAnime(0, 40, ["drama", "slice_of_life"]);
// crunchyroll.getBySeasonAnime(0, 40, "fall_2019");
// crunchyroll.getMostRecentsAnime(0, 40);
