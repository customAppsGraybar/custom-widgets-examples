import { isSameDay } from "date-fns";
import React, { FunctionComponent } from "react";
import { BlockAttributes } from "widget-sdk";
import useCity from "../api/useCity";
import useWeather from "../api/useWeather";
import { LoadingBox } from "../components/LoadingBox";
import { WeatherCard } from "../components/WeatherCard";
import { dateFormat, timeFormat } from "../date";

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
  const apiKey = key ?? "d23e3a76aafeab7260e4e16cd91c73ad";

  const { data: coordinates } = useCity({
    key: apiKey,
    location,
    lang: lang,
  });

  const { data: weather, isLoading } = useWeather({
    key: apiKey,
    lang,
    ...coordinates,
  });

  // Try to find a forecast if event date was specified
  const forecast = weather?.forecast.find((weather) =>
    isSameDay(weather.date, new Date(eventDate))
  );

  const date = forecast?.date ?? weather?.current?.date;
  const icon = forecast?.icon ?? weather?.current?.icon;
  const temperature =
    forecast?.temperature?.max ?? weather?.current?.temperature?.current;

  const bgColor = "#24B5E1";

  return !weather || isLoading ? (
    <LoadingBox color={bgColor} />
  ) : (
    <WeatherCard
      temperature={temperature || 0}
      location={coordinates?.name ?? location}
      color={bgColor}
      date={dateFormat(date!, lang)}
      time={timeFormat(time, lang)}
      icon={icon}
    ></WeatherCard>
  );
};
