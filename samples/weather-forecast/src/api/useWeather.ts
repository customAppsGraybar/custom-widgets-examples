import axios from "axios";
import { QueryFunctionContext, useQuery, UseQueryResult } from "react-query";
import { CurrentWeather, DayReport, WeatherReport } from "./openWeatherMapApi";
import { getIcon, WeatherIcon } from "./weatherIcon";

type CommonData = {
  date: number;
  description: string | null;
  icon: WeatherIcon;
  wind: number;
  humidity: number;
};

type CurrentReport = CommonData & {
  temperature: {
    current: number;
  };
};

type ForeCastReport = CommonData & {
  temperature: {
    min: number;
    max: number;
  };
};

const mapCurrent = ({
  weather: [w],
  ...day
}: CurrentWeather): CurrentReport => {
  return {
    date: day.dt,
    description: w.description,
    icon: getIcon(w.icon),
    temperature: {
      current: day.temp,
    },
    wind: day.wind_speed,
    humidity: day.humidity,
  };
};

const mapForecast = ({
  weather: [w],
  ...forecast
}: DayReport): ForeCastReport => ({
  date: forecast.dt,
  description: w.description,
  icon: getIcon(w.icon),
  temperature: {
    min: forecast.temp.min,
    max: forecast.temp.max,
  },
  wind: forecast.wind_speed,
  humidity: forecast.humidity,
});

export type MappedWeatherReport = {
  current: CurrentReport;
  forecast: ForeCastReport[];
};

const mapData = ({ daily, current }: WeatherReport): MappedWeatherReport => ({
  current: mapCurrent(current),
  forecast: daily.map(mapForecast),
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
        .get<WeatherReport>(endpoint, { params })
        .then(({ data }) => data)
        .then(mapData);
};

export default function useWeather(
  options: ForecastOptions
): UseQueryResult<MappedWeatherReport, Error> {
  const { lang, lat, lon, key } = options;

  return useQuery(["weather", { key, lat, lon, lang }], getWeather, {
    enabled: !!(lat && lon),
  });
}
