import React, { FunctionComponent } from "react";
import { BlockAttributes } from "widget-sdk";
import useCity from "../api/useCity";
import useWeather, { MappedWeatherReport } from "../api/useWeather";
import { WeatherCard } from "../components/WeatherCard";
import { weather as mockedWeather } from "../api/mockData"

/**
 * React Component
 */
export interface WeatherForecastProps extends BlockAttributes {
  apiKey: string;
  date: string;
  location: string;
}

export const WeatherView: FunctionComponent<WeatherForecastProps> = ({
  apiKey: key,
  date: eventDate,
  location,
  contentLanguage: lang,
}: WeatherForecastProps) => {
  // geo api => lat,lon
  // weather api

  // Fallback if location in configuration form was not filled out
  const locationQuery = location ?? "Chemnitz,DE"

  const { data: coordinates } = useCity({ key, location: locationQuery, contentLanguage: lang });
  const { data: weather, isLoading } = useWeather({ key, lang, ...coordinates });

  const {
    current: { date = "", temperature = { current: 273.15 }, icon = undefined } = {}
  } = {...weather}

  return (
    <WeatherCard
      loading={isLoading}
      temperature={temperature.current}
      location={coordinates?.name ?? location}
      color="#24B5E1"
      date={date}
      time="11:00 UTC"
      icon={icon}
    ></WeatherCard>
  );

};
