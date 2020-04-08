import cheerio from "cheerio";
import requestCrunchyroll from "./request";

interface Anime {
  link: string;
  name: string;
  ref: "crunchyroll";
}

export const getAnimeList = async (): Promise<Anime[]> => {
  try {
    const url = `https://www.crunchyroll.com/fr/videos/anime/alpha?group=all`;
    const html = await requestCrunchyroll(url);
    const $ = cheerio.load(html);
    const result = $("#main_content > div.videos-column-container.cf")
      .find(".text-link.ellipsis")
      .map((i, elem) => {
        return {
          link: `https://www.crunchyroll.com${$(elem).attr("href")}`,
          name: $(elem).text().trim(),
          ref: "crunchyroll",
        };
      })
      .get();
    return result;
  } catch (err) {
    console.error("Error while getting anime list: ", err);
    return [];
  }
};
