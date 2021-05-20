import { useQuery } from "react-query";

import dayjs from "dayjs";
import axios from "axios";
import { getIcon } from "./iconsMap";
import { currentWeather, dayReport, weatherReport } from "./data";

export const formatDate = (dte: number, lang: string) => {
  if (lang && lang !== "en") {
    dayjs.locale(lang.replace("_", "-"));
  }
  if (dte && dayjs().isValid()) {
    return dayjs.unix(dte).format("ddd D MMMM");
  }
  return "";
};

export const mapCurrent = (day: currentWeather, lang: string) => {
  return {
    date: formatDate(day.dt, lang),
    description: day.weather[0] ? day.weather[0].description : null,
    icon: day.weather[0] && getIcon(day.weather[0].icon),
    temperature: {
      current: day.temp.toFixed(0),
      min: undefined, // openweather doesnt provide min/max on current weather
      max: undefined,
    },
    wind: day.wind_speed.toFixed(0),
    humidity: day.humidity,
  };
};

export const mapForecast = (forecast: dayReport[], lang: string) => {
  const mappedForecast = [];
  for (let i = 0; i < 5; i += 1) {
    mappedForecast.push({
      date: formatDate(forecast[i].dt, lang),
      description: forecast[i].weather[0]
        ? forecast[i].weather[0].description
        : null,
      icon: forecast[i].weather[0] && getIcon(forecast[i].weather[0].icon),
      temperature: {
        min: forecast[i].temp.min.toFixed(0),
        max: forecast[i].temp.max.toFixed(0),
      },
      wind: forecast[i].wind_speed.toFixed(0),
      humidity: forecast[i].humidity,
    });
  }
  return mappedForecast;
};

export const mapData = (
  forecastData: dayReport[],
  todayData: currentWeather,
  lang: string
) => {
  const mapped = {};
  if (forecastData && todayData) {
    const daysData = forecastData;
    mapped.current = mapCurrent(todayData, lang);
    mapped.forecast = mapForecast(daysData, lang);
  }
  return mapped;
};

type Options = {
  unit: "standard" | "metric" | "imperial";
  key: string;
  lang: string;
  lon: number;
  lat: number;
};

const getWeather = async (options: Options) => {
  const endpoint = "//api.openweathermap.org/data/2.5/onecall";
  const { unit, lang, key, lon, lat } = options;
  const params = {
    appid: key,
    lang,
    units: unit,
    lat,
    lon,
  };

  const { data } = await axios.get<weatherReport>(endpoint, { params });
  const payload = mapData(data.daily, data.current, lang);

  return payload;
};

export default function useWeather(options: Options) {
  const { lat, lon, lang } = options;
  return useQuery(["post", lat, lon, lang], () => getWeather(options));
}
