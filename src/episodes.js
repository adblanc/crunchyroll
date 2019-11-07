const cheerio = require("cheerio");
const requestCrunchyroll = require("./request");

async function getEpisodes(url) {
  const html = await requestCrunchyroll(url);
  const $ = cheerio.load(html);
  let seasons = $("#showview_content_videos > ul > li").toArray();
  seasons = seasons.filter(
    season =>
      !$(season)
        .find("a")
        .text()
        .toLowerCase()
        .includes("dub") &&
      !$(season)
        .find("a")
        .text()
        .toLowerCase()
        .includes("vf") &&
      !$(season)
        .find("a")
        .text()
        .toLowerCase()
        .includes("doublage")
  );
  const seasonNbr = seasons.length;
  const result = $(seasons)
    .map((i, elem) => {
      return {
        title:
          $(elem)
            .find(
              "a.season-dropdown.content-menu.block.text-link.strong.small-margin-bottom.open"
            )
            .first()
            .text() || "Saison 1",
        nbr: seasonNbr - i,
        episodes: $(elem)
          .find(".hover-bubble.group-item > div > a")
          .map((i, elem) => {
            return {
              link: `https://www.crunchyroll.com${$(elem).attr("href")}`,
              title: $(elem)
                .find("img")
                .attr("alt"),
              img:
                $(elem)
                  .find("img")
                  .attr("src") ||
                $(elem)
                  .find("img")
                  .attr("data-thumbnailurl"),
              nbr:
                parseInt(
                  $(elem)
                    .find(".series-title.block.ellipsis")
                    .text()
                    .replace(/[^0-9]/g, ""),
                  10
                ) || 1
            };
          })
          .get()
      };
    })
    .get();
  return result;
}

module.exports = {
  getEpisodes
};
