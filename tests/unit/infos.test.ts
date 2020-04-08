import * as crunchyroll from "../../src/index";

jest.setTimeout(30000);

describe("anime  informations", () => {
  it("should return anime informations", async () => {
    const urls = [
      "https://www.crunchyroll.com/fr/a-certain-magical-index",
      "https://www.crunchyroll.com/fr/dr-stone",
      "https://www.crunchyroll.com/fr/free-iwatobi-swim-club",
    ];
    for (let url of urls) {
      const res = await crunchyroll.getAnimeInfos(url);
      expect(Object.keys(res)).toEqual(
        expect.arrayContaining(["rating", "synopsis", "img", "tags", "genres"])
      );
    }
  });
});
