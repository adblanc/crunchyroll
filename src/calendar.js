const cheerio = require("cheerio");
const requestCrunchyroll = require("./request");

module.exports = async function getCalendar(date, free) {
  try {
    const html = await requestCrunchyroll(
      `https://www.crunchyroll.com/simulcastcalendar?filter=${
        free ? "free" : "premium"
      }&date=${date}`
    );
    const $ = cheerio.load(html);
    const result = $("li.day")
      .map((i, elem) => {
        return {
          date: $(elem)
            .find("a header div time")
            .attr("datetime"),
          episodes: $(elem)
            .find("section > div > ol > li > article")
            .map((i, ep) => {
              return {
                number: parseInt($(ep).attr("data-episode-num")),
                hour: $(ep)
                  .find("time")
                  .attr("datetime"),
                title: $(ep)
                  .find("div h1 a cite")
                  .text(),
                link: $(ep)
                  .find("div h1 a")
                  .attr("href"),
                img: $(ep)
                  .find("a.js-poster-image-link img")
                  .attr("src"),
                ref: "crunchyroll"
              };
            })
            .get()
        };
      })
      .get();
    return result;
  } catch (ex) {
    console.error("Error while fetching crunchyroll calendar..", ex);
  }
};
