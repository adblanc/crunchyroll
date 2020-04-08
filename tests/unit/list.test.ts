import * as crunchyroll from "../../src/index";
import * as requestCrunchyroll from "../../src/request";

jest.setTimeout(30000);

describe("anime list", () => {
  it("should return a non empty array", async () => {
    const list = await crunchyroll.getAnimeList();
    expect(list.length).toBeGreaterThan(0);
  });
  it("should return valid a valid anime list", async () => {
    const list = await crunchyroll.getAnimeList();
    list.forEach((anime) => {
      expect(anime).toHaveProperty("name");
      expect(anime).toHaveProperty("link");
      expect(anime).toHaveProperty("ref");
    });
  });
  it("should return an empty array if error", async () => {
    const spy = jest
      .spyOn(requestCrunchyroll, "default")
      .mockImplementation(() => {
        throw new Error("error");
      });
    const res = await crunchyroll.getAnimeList();
    expect(res.length).toBe(0);
    spy.mockRestore();
  });
});
