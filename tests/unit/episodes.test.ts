import * as crunchyroll from "../../src/index";
import * as requestCrunchyroll from "../../src/request";

describe("anime episodes", () => {
  it("should return an episode list", async () => {
    jest.setTimeout(30000);
    const list = await crunchyroll.getAnimeList();
    list.length = 10;
    for (let anime of list) {
      const seasons = await crunchyroll.getEpisodes(anime.link);
      expect(seasons).toBeDefined();
      seasons.forEach((season) => {
        expect(Object.keys(season)).toEqual(
          expect.arrayContaining(["name", "nbr", "episodes"])
        );
        season.episodes.forEach((ep) => {
          expect(Object.keys(ep)).toEqual(
            expect.arrayContaining(["name", "link", "img", "nbr"])
          );
        });
      });
    }
    expect(list.length).toBeGreaterThan(0);
  });
  it("should return an empty array if error", async () => {
    const list = await crunchyroll.getAnimeList();
    list.length = 2;

    const spy = jest
      .spyOn(requestCrunchyroll, "default")
      .mockImplementation(() => {
        throw new Error("error");
      });

    for (let anime of list) {
      const seasons = await crunchyroll.getEpisodes(anime.link);
      expect(seasons.length).toBe(0);
    }

    spy.mockRestore();
  });
});
