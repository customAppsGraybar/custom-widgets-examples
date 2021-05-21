import { iconCodes } from "./weatherIcon";

type minuteReport = { dt: number; precipitation: number };
type hourReport = Omit<currentWeather, "sunrise" | "sunset"> & {
  pop: number;
};
type temperatureDetailSet = temperatureMinimalSet & {
  min: number;
  max: number;
};

type temperatureMinimalSet = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

export type dayReport = Omit<
  currentWeather,
  "visibility" | "rain" | "snow" | "temp" | "feels_like"
> & {
  pop: number;
  temp: temperatureDetailSet;
  feels_like: temperatureMinimalSet;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  rain?: number;
  snow?: number;
};

type weatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: iconCodes;
};

export type currentWeather = {
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
  weather: [weatherDescription];
};

type location = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
};

export type weatherReport = location & {
  current: currentWeather;
  minutely: minuteReport[];
  hourly: hourReport[];
  daily: dayReport[];
};
