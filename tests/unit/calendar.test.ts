import * as crunchyroll from "../../src/index";
import * as requestCrunchyroll from "../../src/request";

describe("calendar", () => {
  it("should return a calendar even without parameters", async () => {
    const calendar = await crunchyroll.getCalendar();
    expect(calendar.length).toBe(7);
  });
  it("should return a calendar array with 7 items", async () => {
    const calendar = await crunchyroll.getCalendar({
      date: "2020-04-08",
      free: true,
    });
    expect(calendar.length).toBe(7);
  });
  it("should return a calendar with valid days", async () => {
    const calendar = await crunchyroll.getCalendar({
      date: "2020-04-08",
      free: true,
    });
    calendar.forEach((day) => {
      expect(day).toHaveProperty("episodes");
      expect(day).toHaveProperty("date");
      day.episodes.forEach((ep) => {
        expect(Object.keys(ep)).toEqual(
          expect.arrayContaining([
            "number",
            "hour",
            "name",
            "link",
            "epLink",
            "image",
            "ref",
          ])
        );
      });
    });
  });
  it("should return an empty array if error", async () => {
    const spy = jest
      .spyOn(requestCrunchyroll, "default")
      .mockImplementation(() => {
        throw new Error("error");
      });
    const res = await crunchyroll.getCalendar({
      date: "2020-04-08",
      free: true,
    });
    expect(res.length).toBe(0);
    spy.mockRestore();
  });
});
