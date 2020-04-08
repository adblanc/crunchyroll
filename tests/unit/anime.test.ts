import * as crunchyroll from "../../src/index";
import * as requestCrunchyroll from "../../src/request";

describe("anime", () => {
  jest.setTimeout(30000);
  describe("popular animes", () => {
    it("should return anime list with empty params", async () => {
      const res = await crunchyroll.getPopularAnime();
      expect(res.length).toBeLessThanOrEqual(40);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "ref", "episodes"])
        );
      });
    });
    it("should return anime list", async () => {
      const res = await crunchyroll.getPopularAnime({
        page: 0,
        length: 20,
      });
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "ref", "episodes"])
        );
      });
    });
    it("should return an empty array if error", async () => {
      const spy = jest
        .spyOn(requestCrunchyroll, "default")
        .mockImplementation(() => {
          throw new Error("error");
        });
      const res = await crunchyroll.getPopularAnime({
        page: 0,
        length: 20,
      });
      expect(res.length).toBe(0);
      spy.mockRestore();
    });
  });

  describe("popular animes", () => {
    it("should return anime list with empty params", async () => {
      const res = await crunchyroll.getSimulcastsAnime();
      expect(res.length).toBeLessThanOrEqual(40);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return anime list", async () => {
      const res = await crunchyroll.getSimulcastsAnime({
        page: 0,
        length: 20,
      });
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return an empty array if error", async () => {
      const spy = jest
        .spyOn(requestCrunchyroll, "default")
        .mockImplementation(() => {
          throw new Error("error");
        });
      const res = await crunchyroll.getSimulcastsAnime({
        page: 0,
        length: 20,
      });
      expect(res.length).toBe(0);
      spy.mockRestore();
    });
  });

  describe("by genre animes", () => {
    it("should return anime list with no parameters", async () => {
      const res = await crunchyroll.getByGenresAnime();
      expect(res.length).toBeLessThanOrEqual(40);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return anime list", async () => {
      const res = await crunchyroll.getByGenresAnime({
        page: 0,
        length: 20,
        tags: ["drama"],
      });
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return anime list even if tags passed as string", async () => {
      const res = await crunchyroll.getByGenresAnime({
        page: 0,
        length: 20,
        tags: "drama",
      });
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return an empty array if error", async () => {
      const spy = jest
        .spyOn(requestCrunchyroll, "default")
        .mockImplementation(() => {
          throw new Error("error");
        });
      const res = await crunchyroll.getByGenresAnime({
        page: 0,
        length: 20,
        tags: ["drama"],
      });
      expect(res.length).toBe(0);
      spy.mockRestore();
    });
  });

  describe("by season animes", () => {
    it("should return anime list with no parameter", async () => {
      const res = await crunchyroll.getBySeasonAnime();
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return anime list", async () => {
      const res = await crunchyroll.getBySeasonAnime({
        page: 0,
        length: 20,
        season: "fall_2019",
      });
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return an empty array if error", async () => {
      const spy = jest
        .spyOn(requestCrunchyroll, "default")
        .mockImplementation(() => {
          throw new Error("error");
        });
      const res = await crunchyroll.getBySeasonAnime({
        page: 0,
        length: 20,
        season: "fall_2019",
      });
      expect(res.length).toBe(0);
      spy.mockRestore();
    });
  });

  describe("simulcasts animes", () => {
    it("should return anime list with no parameters", async () => {
      const res = await crunchyroll.getSimulcastsAnime();
      expect(res.length).toBeLessThanOrEqual(40);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return anime list", async () => {
      const res = await crunchyroll.getSimulcastsAnime({
        page: 0,
        length: 20,
      });
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return an empty array if error", async () => {
      const spy = jest
        .spyOn(requestCrunchyroll, "default")
        .mockImplementation(() => {
          throw new Error("error");
        });
      const res = await crunchyroll.getSimulcastsAnime({
        page: 0,
        length: 20,
      });
      expect(res.length).toBe(0);
      spy.mockRestore();
    });
  });

  describe("most recents animes", () => {
    it("should return anime list with no parameters", async () => {
      const res = await crunchyroll.getMostRecentsAnime();
      expect(res.length).toBeLessThanOrEqual(40);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return anime list", async () => {
      const res = await crunchyroll.getMostRecentsAnime({
        page: 0,
        length: 20,
      });
      expect(res.length).toBeLessThanOrEqual(20);
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "img", "episodes", "ref"])
        );
      });
    });
    it("should return an empty array if error", async () => {
      const spy = jest
        .spyOn(requestCrunchyroll, "default")
        .mockImplementation(() => {
          throw new Error("error");
        });
      const res = await crunchyroll.getMostRecentsAnime({
        page: 0,
        length: 20,
      });
      expect(res.length).toBe(0);
      spy.mockRestore();
    });
  });

  describe("by alpha num animes", () => {
    it("should return anime list only starting with a", async () => {
      const res = await crunchyroll.getByAlphaNum("a");
      res.forEach((anime) => {
        expect(Object.keys(anime)).toEqual(
          expect.arrayContaining(["name", "link", "episodes", "ref"])
        );
        expect(anime.name[0].toLowerCase()).toMatch("a");
      });
    });
    it("should return an empty array if error", async () => {
      const spy = jest
        .spyOn(requestCrunchyroll, "default")
        .mockImplementation(() => {
          throw new Error("error");
        });
      const res = await crunchyroll.getByAlphaNum("a");
      expect(res.length).toBe(0);
      spy.mockRestore();
    });
  });
});
