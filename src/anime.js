const cheerio = require("cheerio");
const requestCrunchyroll = require("./request");

function scrapeCrunchyrollAjax(html, length) {
  const $ = cheerio.load(html);
  const result = $("li > div")
    .map((i, elem) => {
      const a = $(elem).find("a");
      return {
        link: `https://www.crunchyroll.com${a.attr("href")}`,
        img: $(a)
          .find("span > img")
          .attr("src"),
        title: $(a)
          .find("span.series-title.block.ellipsis")
          .text(),
        episodes: parseInt(
          $(a)
            .find("span.series-data.block.ellipsis")
            .text()
            .trim()
        ),
        ref: "crunchyroll"
      };
    })
    .get();
  if (length && length > 0 && length < result.length) result.length = length;
  return result;
}

async function getPopularAnime(page = 0, length = undefined) {
  const url = `https://www.crunchyroll.com/fr/videos/anime/popular/ajax_page?pg=${page}`;
  const html = await requestCrunchyroll(url);
  const result = scrapeCrunchyrollAjax(html, length);
  return result;
}

async function getSimulcastsAnime(page = 0, length = undefined) {
  const url = `https://www.crunchyroll.com/fr/videos/anime/simulcasts/ajax_page?pg=${page}`;
  const html = await requestCrunchyroll(url);
  const result = scrapeCrunchyrollAjax(html, length);
  return result;
}

async function getByGenresAnime(page = 0, length = undefined, tags = [""]) {
  if (Array.isArray(tags)) tags = tags.join(",");
  const url = `https://www.crunchyroll.com/fr/videos/anime/genres/ajax_page?pg=${page}&tagged=${tags}`;
  const html = await requestCrunchyroll(url);
  const result = scrapeCrunchyrollAjax(html, length);
  return result;
}

//fall, summer, spring, winter _2019-2009
async function getBySeasonAnime(page = 0, length = undefined, season = "") {
  const url = `https://www.crunchyroll.com/fr/videos/anime/seasons/ajax_page?pg=${page}&tagged[]=season:${season}`;
  const html = await requestCrunchyroll(url);
  const result = scrapeCrunchyrollAjax(html, length);
  return result;
}

async function getMostRecentsAnime(page = 0, length = undefined) {
  const url = `https://www.crunchyroll.com/fr/videos/anime/updated/ajax_page?pg=${page}`;
  const html = await requestCrunchyroll(url);
  const result = scrapeCrunchyrollAjax(html, length);
  return result;
}

async function getByAlphaNum(letter) {
  const url = `https://www.crunchyroll.com/fr/videos/anime/alpha?group=${letter}`;
  const html = await requestCrunchyroll(url);
  const $ = cheerio.load(html);
  const result = $("#main_content > ul > li")
    .map((i, elem) => {
      return {
        title: $(elem)
          .find("div > a > div > span.series-title.block.ellipsis")
          .text(),
        episodes: parseInt(
          $(elem)
            .find("div > a > div > span.series-data.block")
            .text()
        ),
        link: `https://www.crunchyroll.com${$(elem)
          .find("div > a")
          .attr("href")}`,
        ref: "crunchyroll"
      };
    })
    .get();
  return result;
}

module.exports = {
  getPopularAnime,
  getSimulcastsAnime,
  getMostRecentsAnime,
  getByGenresAnime,
  getBySeasonAnime,
  getByAlphaNum
};
