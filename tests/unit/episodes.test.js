const crunchyroll = require("../../index");

describe("anime episodes", () => {
  it("should return an episode list", async () => {
    jest.setTimeout(30000);
    const list = await crunchyroll.getAnimeList();
    list.length = 10;
    for (let anime of list) {
      const seasons = await crunchyroll.getEpisodes(anime.link);
      expect(seasons).toBeDefined();
      seasons.forEach(season => {
        expect(Object.keys(season)).toEqual(
          expect.arrayContaining(["name", "nbr", "episodes"])
        );
        season.episodes.forEach(ep => {
          expect(Object.keys(ep)).toEqual(
            expect.arrayContaining(["name", "link", "img", "nbr"])
          );
        });
      });
    }
    expect(list.length).toBeGreaterThan(0);
  });
});
