const crunchyroll = require("../../index");

describe("anime", () => {
  describe("popular animes", () => {
    it("should return anime list", async () => {
      const res = await crunchyroll.getPopularAnime(0, 20);
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach(anime => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "ref", "episodes"])
        );
      });
    });
  });

  describe("popular animes", () => {
    it("should return anime list", async () => {
      const res = await crunchyroll.getSimulcastsAnime(0, 20);
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach(anime => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
  });

  describe("by genre animes", () => {
    it("should return anime list", async () => {
      const res = await crunchyroll.getByGenresAnime(0, 20, ["drama"]);
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach(anime => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
  });

  describe("by season animes", () => {
    it("should return anime list", async () => {
      const res = await crunchyroll.getBySeasonAnime(0, 20, "fall_2019");
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach(anime => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
  });

  describe("most recents animes", () => {
    it("should return anime list", async () => {
      const res = await crunchyroll.getMostRecentsAnime(0, 20);
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach(anime => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
  });

  describe("by alpha num animes", () => {
    it("should return anime list only starting with a", async () => {
      const res = await crunchyroll.getByAlphaNum("a");
      res.forEach(anime => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "episodes", "ref"])
        );
        expect(anime.name[0].toLowerCase()).toMatch("a");
      });
    });
  });
});
