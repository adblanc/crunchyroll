const crunchyroll = require("../../index");

describe("anime list", () => {
  it("should return a non empty array", async () => {
    const list = await crunchyroll.getAnimeList();
    expect(list.length).toBeGreaterThan(0);
  });
  it("should return valid a valid anime list", async () => {
    const list = await crunchyroll.getAnimeList();
    list.forEach(anime => {
      expect(anime).toHaveProperty("name");
      expect(anime).toHaveProperty("link");
      expect(anime).toHaveProperty("ref");
    });
  });
});
