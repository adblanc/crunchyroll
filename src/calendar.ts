import cheerio from "cheerio";
import requestCrunchyroll from "./request";

interface CalendarEpisode {
  number: number;
  hour: string;
  name: string;
  link: string;
  img: string;
  ref: "crunchyroll";
}

interface Day {
  date: string | undefined;
  episodes: CalendarEpisode[];
}

type getCalendarFn = (date: string, free?: boolean) => Promise<Day[]>;

export const getCalendar: getCalendarFn = async (date, free) => {
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
          date: $(elem).find("a header div time").attr("datetime"),
          episodes: $(elem)
            .find("section > div > ol > li > article")
            .map((i, ep) => {
              const epNbr = $(ep).attr("data-episode-num");
              return {
                number: epNbr ? parseInt(epNbr) : 0,
                hour: $(ep).find("time").attr("datetime"),
                name: $(ep).find("div h1 a cite").text(),
                link: $(ep).find("div h1 a").attr("href"),
                epLink: $(ep)
                  .find("article > div.availability > a")
                  .attr("href"),
                img: $(ep).find("a.js-poster-image-link img").attr("src"),
                ref: "crunchyroll",
              };
            })
            .get(),
        };
      })
      .get();
    return result;
  } catch (ex) {
    console.error("Error while fetching crunchyroll calendar...", ex);
    return [];
  }
};
