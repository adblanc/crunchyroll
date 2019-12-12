const cheerio = require("cheerio");
const requestCrunchyroll = require("./request");

async function getAnimeList() {
  const url = `https://www.crunchyroll.com/fr/videos/anime/alpha?group=all`;
  const html = await requestCrunchyroll(url);
  const $ = cheerio.load(html);
  const result = $("#main_content > div.videos-column-container.cf")
    .find(".text-link.ellipsis")
    .map((i, elem) => {
      return {
        link: `https://www.crunchyroll.com${$(elem).attr("href")}`,
        title: $(elem)
          .text()
          .trim(),
        ref: "crunchyroll"
      };
    })
    .get();
  return result;
}

module.exports = {
  getAnimeList
};
