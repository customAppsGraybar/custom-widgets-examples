/*!
 * Copyright 2021, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { dateFormat, timeFormat } from "./date";

const deLocale = "de";
const frLocale = "fr";
const date = new Date(2021, 3, 22, 0, 0);

describe("dateFormat()", () => {
  it("should format the date for DE", () => {
    expect(dateFormat(date, deLocale)).toBe("Donnerstag, 22.04.2021");
  });

  it("should format the date for fallback as US", () => {
    expect(dateFormat(date)).toBe("Thursday, 04/22/2021");
  });

  it("should format the date for US when the lang is not supported", () => {
    expect(dateFormat(date, frLocale)).toBe("Thursday, 04/22/2021");
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
