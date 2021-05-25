import React, { FunctionComponent } from "react";
import { BlockAttributes } from "widget-sdk";
import useCity from "../api/useCity";
import useWeather, { MappedWeatherReport } from "../api/useWeather";
import { WeatherCard } from "../components/WeatherCard";
import { weather as mockedWeather } from "../api/mockData"
import dayjs from "dayjs";

const formatDate = (dte: number, lang: string) => {
  if (lang && lang !== "en") {
    dayjs.locale(lang.replace("_", "-"))
  }
  if (dte && dayjs().isValid()) {
    return dayjs.unix(dte).format("ddd D MMMM")
  }
  return ""
}

/**
 * React Component
 */
export interface WeatherForecastProps extends BlockAttributes {
  apikey: string;
  date: string;
  time: string;
  location: string;
}

export const WeatherView: FunctionComponent<WeatherForecastProps> = ({
  apikey: key,
  date: eventDate,
  time,
  location,
  contentLanguage: lang,
}: WeatherForecastProps) => {
  // geo api => lat,lon
  // weather api

  // Fallback if apikey or location in configuration form was not filled out
  const locationQuery = location ?? "Chemnitz,DE"
  const apiKey = key ?? "d23e3a76aafeab7260e4e16cd91c73ad"

  const { data: coordinates } = useCity({ key: apiKey, location: locationQuery, contentLanguage: lang });
  const { data: weather, isLoading } = useWeather({ key: apiKey, lang, ...coordinates });

  var {
    current: { date = 0, temperature = { current: 273.15 }, icon = undefined } = {}
  } = {...weather}

  // Try to find a forecast if event date was specified
  if (eventDate) {
    const forecast = weather?.forecast.find(weather => dayjs.unix(weather.date).startOf("day").isSame(eventDate))
    if (forecast) {
      temperature.current = forecast.temperature.max
      icon = forecast.icon
      date = forecast.date
    }
  }

  return (
    <WeatherCard
      loading={isLoading}
      temperature={temperature.current}
      location={coordinates?.name ?? location}
      color="#24B5E1"
      date={formatDate(date, lang)}
      time={time}
      icon={icon}
    ></WeatherCard>
  );

};
