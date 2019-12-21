const crunchyroll = require("../../index");

describe("calendar", () => {
  it("should return a calendar array with 7 items", async () => {
    const calendar = await crunchyroll.getCalendar("2019-11-11", true);
    expect(calendar.length).toBe(7);
  });
  it("should return a calendar with valid days", async () => {
    const calendar = await crunchyroll.getCalendar("2019-11-11", true);
    calendar.forEach(day => {
      expect(day).toHaveProperty("episodes");
      expect(day).toHaveProperty("date");
    });
  });
});
