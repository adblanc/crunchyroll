import cheerio from "cheerio";
import requestCrunchyroll from "./request";

interface Episode {
  link: string;
  name: string;
  img: string;
  nbr: string;
}

interface Season {
  name: string;
  nbr: number;
  episodes: Episode[];
}

type getEpisodesFn = (url: string) => Promise<Season[]>;

const getSeasons = ($: CheerioStatic) => {
  return $("#showview_content_videos > ul > li")
    .toArray()
    .filter(
      (season) =>
        !$(season).find("a").text().toLowerCase().includes("dub") &&
        !$(season).find("a").text().toLowerCase().includes("vf") &&
        !$(season).find("a").text().toLowerCase().includes("doublage") &&
        !$(season).find("a").text().toLowerCase().includes("Russian")
    );
};

export const getEpisodes: getEpisodesFn = async (url: string) => {
  try {
    const html = await requestCrunchyroll(url);
    const $ = cheerio.load(html);
    let seasons = getSeasons($);

    const seasonNbr = seasons.length;
    const result = $(seasons)
      .map((i, elem) => {
        return {
          name:
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
                name: $(elem).find("img").attr("alt"),
                img:
                  $(elem).find("img").attr("src") ||
                  $(elem).find("img").attr("data-thumbnailurl"),
                nbr:
                  parseInt(
                    $(elem)
                      .find(".series-title.block.ellipsis")
                      .text()
                      .replace(/[^0-9]/g, ""),
                    10
                  ) || 1,
              };
            })
            .get(),
        };
      })
      .get();
    return result;
  } catch (err) {
    console.error("Error while getting crunchyroll episodes", err);
    return [];
  }
};
