import cheerio from "cheerio";
import requestCrunchyroll from "./request";

const getSynopsis = ($: CheerioStatic) => {
  return (
    $("#sidebar_elements > li > p > span.more").text().trim() ||
    $("#sidebar_elements > li > p > span.trunc-desc").text().trim()
  );
};

const getRating = ($: CheerioStatic) => {
  const rateString = $("#showview_about_rate_widget").attr("content");

  return parseFloat(rateString || "");
};

interface AnimeInfos {
  rating: number;
  synopsis: string;
  img: string | undefined;
  tags: string[];
  genres: string[];
  simulcast: string | false;
}

export const getAnimeInfos = async (link: string): Promise<AnimeInfos> => {
  try {
    const html = await requestCrunchyroll(link);
    const $ = cheerio.load(html);

    const simulcast = $("#sidebar_elements > li > p.strong").text();

    const synopsis = getSynopsis($);
    const rating = getRating($);

    const result = {
      rating,
      synopsis,
      img: $("#sidebar_elements > li > img").attr("src"),
      tags: $("#sidebar_elements > li > ul > li > a.text-link")
        .map((i, e) => $(e).text())
        .get(),
      genres: $("#sidebar_elements > li > ul > li > a.text-link")
        .map((i, e) => {
          const tag = $(e).attr("href");
          if (!tag) return;
          if (tag.includes("genres")) return $(e).text();
        })
        .get(),
      simulcast,
    };
    return result;
  } catch (err) {
    throw Error("Error while getting anime infos:" + err);
  }
};
