import { dateFormat, timeFormat } from "./date";

const deLocale = "de";
const frLocale = "fr";
const date = new Date(2021, 3, 22, 0, 0);

describe("dateFormat()", () => {
  it("should format the date for DE", () => {
    expect(dateFormat(date, deLocale)).toBe("22.04.2021");
  });

  it("should format the date for fallback as US", () => {
    expect(dateFormat(date)).toBe("04/22/2021");
  });

  it("should format the date for US when the lang is not supported", () => {
    expect(dateFormat(date, frLocale)).toBe("04/22/2021");
  });
});

describe("timeFormat()", () => {
  it("should format the time for DE", () => {
    expect(timeFormat("00:00", deLocale)).toBe("00:00");
  });

  it("should format the time for US when the lang is not supported", () => {
    expect(timeFormat("00:00", frLocale)).toBe("12:00 AM");
  });

  it("should format the time for fallback as US", () => {
    expect(timeFormat("00:00")).toBe("12:00 AM");
  });
});
