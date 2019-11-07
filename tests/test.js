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

saveAllAnimes();

// crunchyroll.getPopularAnime(0, 20);
// crunchyroll.getSimulcastsAnime(0, 70);
// crunchyroll.getByGenresAnime(0, 40, ["drama", "slice_of_life"]);
// crunchyroll.getBySeasonAnime(0, 40, "fall_2019");
// crunchyroll.getMostRecentsAnime(0, 40);
