import cheerio from "cheerio";
import requestCrunchyroll from "./request";
import { getAnimeInfos } from "./infos";

interface CalendarEpisode {
  number: number;
  hour: string;
  name: string;
  link: string;
  image: string;
  ref: "crunchyroll";
}

interface Day {
  date: string | undefined;
  episodes: CalendarEpisode[];
}

interface CalendarArgs {
  date?: string;
  free?: boolean;
}

type getCalendarFn = (data?: CalendarArgs) => Promise<Day[]>;

const getCalendarUrl = (data?: CalendarArgs) => {
  return `https://www.crunchyroll.com/simulcastcalendar?filter=${
    data?.free ? "free" : "premium"
  }${data?.date ? data.date : ""}`;
};

export const getCalendar: getCalendarFn = async (data) => {
  try {
    const html = await requestCrunchyroll(getCalendarUrl(data));
    const $ = cheerio.load(html);
    const result = await Promise.all(
      $("li.day")
        .map(async (i, elem) => {
          return {
            date: $(elem).find("a header div time").attr("datetime"),
            episodes: await Promise.all(
              $(elem)
                .find("section > div > ol > li > article")
                .map(async (i, ep) => {
                  const epNbr = $(ep).attr("data-episode-num");
                  const link = $(ep).find("div h1 a").attr("href");

                  return {
                    number: epNbr ? parseInt(epNbr) : 0,
                    hour: $(ep).find("time").attr("datetime"),
                    name: $(ep).find("div h1 a cite").text(),
                    link,
                    image: (await getAnimeInfos(link as string)).img,
                    epLink: $(ep)
                      .find("article > div.availability > a")
                      .attr("href"),
                    ref: "crunchyroll",
                  };
                })
                .get()
            ),
          };
        })
        .get()
    );

    return result;
  } catch (ex) {
    console.error("Error while fetching crunchyroll calendar...", ex);
    return [];
  }
};
