import cheerio from "cheerio";
import requestCrunchyroll from "./request";
import { seasonArg } from "./types/seasons";

interface AnimeInfos {
  link: string;
  img: string;
  name: string;
  episodes: number;
  ref: "crunchyroll";
}

interface AnimeArgs {
  page?: number;
  length?: number;
}

interface AnimeArgsWithTags extends AnimeArgs {
  tags: genreArg[] | genreArg;
}

interface AnimeArgsWithSeason extends AnimeArgs {
  season: seasonArg;
}

type getAnimeFn = ({ page, length }?: AnimeArgs) => Promise<AnimeInfos[]>;

type getByGenreFn = ({
  page,
  length,
  tags,
}?: AnimeArgsWithTags) => Promise<AnimeInfos[]>;

type getBySeasonFn = ({
  page,
  length,
  season,
}?: AnimeArgsWithSeason) => Promise<AnimeInfos[]>;

function scrapeCrunchyrollAjax(
  html: string,
  length: number | undefined
): AnimeInfos[] {
  const $ = cheerio.load(html);
  const result = $("li > div")
    .map((i, elem) => {
      const a = $(elem).find("a");
      return {
        link: `https://www.crunchyroll.com${a.attr("href")}`,
        img: $(a).find("span > img").attr("src"),
        name: $(a).find("span.series-title.block.ellipsis").text(),
        episodes: parseInt(
          $(a).find("span.series-data.block.ellipsis").text().trim()
        ),
        ref: "crunchyroll",
      };
    })
    .get();
  if (length && length > 0 && length < result.length) result.length = length;
  return result;
}

export const getPopularAnime: getAnimeFn = async (data = { page: 0 }) => {
  try {
    console.log(data);
    const url = `https://www.crunchyroll.com/fr/videos/anime/popular/ajax_page?pg=${data.page}`;
    const html = await requestCrunchyroll(url);
    const result = scrapeCrunchyrollAjax(html, data.length);
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getSimulcastsAnime: getAnimeFn = async (data = { page: 0 }) => {
  try {
    const url = `https://www.crunchyroll.com/fr/videos/anime/simulcasts/ajax_page?pg=${data.page}`;
    const html = await requestCrunchyroll(url);
    const result = scrapeCrunchyrollAjax(html, length);
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getByGenresAnime: getByGenreFn = async (
  data = { page: 0, tags: [""] }
) => {
  try {
    const { tags, page, length } = data;
    const url = `https://www.crunchyroll.com/fr/videos/anime/genres/ajax_page?pg=${page}&tagged=${
      Array.isArray(tags) ? tags.join(",") : tags
    }`;
    const html = await requestCrunchyroll(url);
    const result = scrapeCrunchyrollAjax(html, length);
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};

//fall, summer, spring, winter _2019-2009
export const getBySeasonAnime: getBySeasonFn = async (
  data = { page: 0, season: "fall_2019" }
) => {
  try {
    const url = `https://www.crunchyroll.com/fr/videos/anime/seasons/ajax_page?pg=${data.page}&tagged[]=season:${data.season}`;
    const html = await requestCrunchyroll(url);
    const result = scrapeCrunchyrollAjax(html, data.length);
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getMostRecentsAnime: getAnimeFn = async (data = { page: 0 }) => {
  try {
    const url = `https://www.crunchyroll.com/fr/videos/anime/updated/ajax_page?pg=${data.page}`;
    const html = await requestCrunchyroll(url);
    const result = scrapeCrunchyrollAjax(html, length);
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getByAlphaNum = async (letter: string): Promise<AnimeInfos[]> => {
  try {
    const url = `https://www.crunchyroll.com/fr/videos/anime/alpha?group=${letter}`;
    const html = await requestCrunchyroll(url);
    const $ = cheerio.load(html);
    const result = $("#main_content > ul > li")
      .map((i, elem) => {
        return {
          name: $(elem)
            .find("div > a > div > span.series-title.block.ellipsis")
            .text(),
          episodes: parseInt(
            $(elem).find("div > a > div > span.series-data.block").text()
          ),
          link: `https://www.crunchyroll.com${$(elem)
            .find("div > a")
            .attr("href")}`,
          ref: "crunchyroll",
        };
      })
      .get();
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};
