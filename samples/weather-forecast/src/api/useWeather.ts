import axios from "axios";
import dayjs from "dayjs";
import { QueryFunctionContext, useQuery, UseQueryResult } from "react-query";
import { currentWeather, dayReport, weatherReport } from "./openWeatherMapApi";
import { getIcon } from "./weatherIcon";

const formatDate = (dte: number, lang: string) => {
  if (lang && lang !== "en") {
    dayjs.locale(lang.replace("_", "-"));
  }
  if (dte && dayjs().isValid()) {
    return dayjs.unix(dte).format("ddd D MMMM");
  }
  return "";
};

type commonData = {
  date: string;
  description: string | null;
  icon: string;
  wind: string;
  humidity: number;
};

type currentReport = commonData & {
  temperature: {
    current: string;
  };
};

type foreCastReport = commonData & {
  temperature: {
    min: string;
    max: string;
  };
};

const mapCurrent = (
  { weather: [w], ...day }: currentWeather,
  lang: string
): currentReport => {
  return {
    date: formatDate(day.dt, lang),
    description: w.description,
    icon: getIcon(w.icon),
    temperature: {
      current: day.temp.toFixed(0),
    },
    wind: day.wind_speed.toFixed(0),
    humidity: day.humidity,
  };
};

const mapForecast =
  (lang: string) =>
  ({ weather: [w], ...forecast }: dayReport): foreCastReport => ({
    date: formatDate(forecast.dt, lang),
    description: w.description,
    icon: getIcon(w.icon),
    temperature: {
      min: forecast.temp.min.toFixed(0),
      max: forecast.temp.max.toFixed(0),
    },
    wind: forecast.wind_speed.toFixed(0),
    humidity: forecast.humidity,
  });

type mappedWeatherReport = {
  current: currentReport;
  forecast: foreCastReport[];
};

const mapData =
  (lang: string) =>
  ({ daily, current }: weatherReport): mappedWeatherReport => ({
    current: mapCurrent(current, lang),
    forecast: daily.map(mapForecast(lang)),
  });

type ForecastOptions = {
  units?: "standard" | "metric" | "imperial";
  key: string;
  lang?: string;
  lon?: number;
  lat?: number;
};

const getWeather = async ({
  queryKey: [, options],
}: QueryFunctionContext<[string, ForecastOptions]>) => {
  const endpoint = "//api.openweathermap.org/data/2.5/onecall";
  const { units = "standard", lang = "en", key: appid, lon, lat } = options;
  const params = { appid, lang, units, lat, lon };

  return typeof lat === undefined || typeof lon === undefined
    ? Promise.reject(new Error("Missing coordinates."))
    : axios
        .get<weatherReport>(endpoint, { params })
        .then(({ data }) => data)
        .then(mapData(lang));
};

export default function useWeather(
  options: ForecastOptions
): UseQueryResult<mappedWeatherReport, Error> {
  const { lang, lat, lon, key } = options;

  return useQuery(["weather", { key, lat, lon, lang }], getWeather, {
    enabled: !!(lat && lon),
  });
}
