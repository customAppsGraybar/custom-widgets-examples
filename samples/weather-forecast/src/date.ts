/*!
 * Copyright 2024, Staffbase GmbH and contributors.
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

import { format, parse } from "date-fns";
import { enUS, de } from "date-fns/locale";

const supportedLocales = [enUS, de];

const findLocale = (code?: string) => (locale: Locale) => code === locale.code;
const getLocale = (code?: string): Locale =>
  supportedLocales.find(findLocale(code)) || enUS;

/**
 * Formatting the time to a localized format.
 *
 * @param {number|Date} dateInput
 * @param {Locale} userLocale
 */
export function dateFormat(
  dateInput: number | Date,
  userLocale?: string
): string {
  return format(dateInput, "cccc, P", { locale: getLocale(userLocale) });
}

/**
 * Formatting the time to a localized format.
 *
 * @param {number} dateInput
 * @param {Locale} userLocale
 */
export function timeFormat(dateInput: string, userLocale?: string): string {
  return format(parse(dateInput, "HH:mm", 0), "p", {
    locale: getLocale(userLocale),
  });
}
