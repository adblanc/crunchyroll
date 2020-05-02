import cheerio from "cheerio";
import requestCrunchyroll from "./request";

const URL = "https://www.crunchyroll.com/fr/videos/anime/updated/ajax_page";

interface Release {
  image: string;
  title: string;
  link: string;
  episodeNbr: number;
  date: string;
}

const removeTextBeforeEpNbr = (episodeNbr: string) => episodeNbr.substring(3);

export const getLastReleases = async (): Promise<Release[]> => {
  const html = await requestCrunchyroll(URL);

  const $ = cheerio.load(html);

  return $("body > li")
    .map((_, e) => {
      const episodesInfos = $(e)
        .find("div:nth-child(1) > a:nth-child(1) > span:nth-child(3)")
        .text()
        .trim();

      const [episodeNbr, date] = episodesInfos.split("–");

      return {
        image: $(e)
          .find(
            "div:nth-child(1) > a:nth-child(1) > span:nth-child(1) > img:nth-child(1)"
          )
          .attr("src"),
        title: $(e)
          .find("div:nth-child(1) > a:nth-child(1) > span:nth-child(2)")
          .text(),
        link: `https://www.crunchyroll.com${$(e)
          .find("div:nth-child(1) > a:nth-child(1)")
          .attr("href")}`,
        episodeNbr: parseInt(removeTextBeforeEpNbr(episodeNbr), 10),
        date: date.trim(),
      };
    })
    .get();
};
