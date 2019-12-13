const cheerio = require("cheerio");
const requestCrunchyroll = require("./request");

async function getAnimeInfos(link) {
  const html = await requestCrunchyroll(link);
  const $ = cheerio.load(html);
  let simulcast = $("#sidebar_elements > li > p.strong").text();
  let synopsis = $("#sidebar_elements > li > p > span.more")
    .text()
    .trim();
  if (!synopsis)
    synopsis = $("#sidebar_elements > li > p > span.trunc-desc")
      .text()
      .trim();
  const result = {
    rating: parseFloat($("#showview_about_rate_widget").attr("content")),
    synopsis,
    img: $("#sidebar_elements > li > img").attr("src")
  };
  if (simulcast) result.simulcast = simulcast;
  return result;
}

module.exports = getAnimeInfos;
