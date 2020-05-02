import * as crunchyroll from "../../src/index";

describe("last releases", () => {
  it("should return the list of last releases", async () => {
    const releases = await crunchyroll.getLastReleases();

    expect(releases.length).toBeGreaterThan(0);

    releases.forEach((release) => {
      expect(release.date.length).toBeGreaterThan(0);
      expect(release.image.length).toBeGreaterThan(0);
      expect(
        release.link.startsWith("https://www.crunchyroll.com/")
      ).toBeTruthy();
      expect(release.title.length).toBeGreaterThan(0);
      expect(release.episodeNbr).toBeDefined();
    });
  });
});
