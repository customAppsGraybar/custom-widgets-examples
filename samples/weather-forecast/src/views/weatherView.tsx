import React, { FunctionComponent } from "react";
import { BlockAttributes } from "widget-sdk";
import useCity from "../api/useCity";
import useWeather from "../api/useWeather";
import { WeatherCard } from "../components/WeatherCard";

/**
 * React Component
 */
export interface WeatherForecastProps extends BlockAttributes {
  apiKey: string;
  date: number;
  city: string;
}

export const WeatherView: FunctionComponent<WeatherForecastProps> = ({
  apiKey: key,
  date,
  city: location,
  contentLanguage: lang,
}: WeatherForecastProps) => {
  // geo api => lat,lon
  // weather api
  const { data: coordinates } = useCity({ key, location, contentLanguage: lang });
  const { data: weather } = useWeather({ key, lang, ...coordinates });

  console.log(weather);

  if (typeof weather !== "undefined") {
    const {
      current: { date, temperature, icon },
    } = weather;
    return (
      <WeatherCard
        temperature={temperature.current}
        location={coordinates?.name ?? location}
        color="#24B5E1"
        date={date}
        time="11:00 UTC"
        weather={icon}
      ></WeatherCard>
    );
  } else {
    return <div>Loading...</div>;
  }
};
