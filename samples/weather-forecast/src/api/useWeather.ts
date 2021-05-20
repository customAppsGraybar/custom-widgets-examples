import { useQuery } from "react-query";

import dayjs from "dayjs";
import axios from "axios";
import { getIcon } from "./iconsMap";
import { currentWeather, dayReport, weatherReport } from "./openWeatherMapApi";

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
    date: string,
    description:string | null,
    icon: string,
    wind: string,
    humidity: number
}

type currentReport = commonData & {
    temperature:{
        current: string,
    }
}

type foreCastReport = commonData & {
    temperature:{
        min: string,
        max:string
    }
}

const mapCurrent = ({ weather: [w], ...day }: currentWeather, lang: string): currentReport => {
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

const mapForecast = (lang: string) => ({ weather: [w], ...forecast }: dayReport): foreCastReport => ( {
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
    current: currentReport,
    forecast: foreCastReport[]
}

const mapData = (
  daysData: dayReport[],
  todayData: currentWeather,
  lang: string
): mappedWeatherReport => ( {
    current : mapCurrent(todayData, lang),
    forecast : daysData.map(mapForecast(lang))
  }
 );

type Options = {
  unit?: "standard" | "metric" | "imperial";
  key: string;
  lang?: string;
  lon: number;
  lat: number;
};

const getWeather = async (options: Options) => {
  const endpoint = "//api.openweathermap.org/data/2.5/onecall";
  const { unit = "standard", lang = "en", key, lon, lat } = options;
  const params = {
    appid: key,
    lang,
    units: unit,
    lat,
    lon,
  };

        const { data } = await axios.get<weatherReport>(endpoint, { params })
        return mapData(data.daily, data.current, lang);

};

export default function useWeather(options: Options) {
  const { lat, lon, lang } = options;
  return useQuery<mappedWeatherReport, Error>(["post", { lat, lon, lang }], () => getWeather(options));
}
