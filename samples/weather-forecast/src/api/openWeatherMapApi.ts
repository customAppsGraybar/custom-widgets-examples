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

import { IconCodes } from "./weatherIcon";

type MinuteReport = { dt: number; precipitation: number };
type HourReport = Omit<CurrentWeather, "sunrise" | "sunset"> & {
  pop: number;
};
type TemperatureDetailSet = TemperatureMinimalSet & {
  min: number;
  max: number;
};

type TemperatureMinimalSet = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

export type DayReport = Omit<
  CurrentWeather,
  "visibility" | "rain" | "snow" | "temp" | "feels_like"
> & {
  pop: number;
  temp: TemperatureDetailSet;
  feels_like: TemperatureMinimalSet;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  rain?: number;
  snow?: number;
};

type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: IconCodes;
};

export type CurrentWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
  weather: [WeatherDescription];
};

type Location = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
};

export type WeatherReport = Location & {
  current: CurrentWeather;
  minutely: MinuteReport[];
  hourly: HourReport[];
  daily: DayReport[];
};
