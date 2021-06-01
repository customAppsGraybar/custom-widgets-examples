/*!
 * Copyright 2021, Staffbase GmbH and contributors.
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

import { isSameDay } from "date-fns";
import React, { FunctionComponent } from "react";
import { BlockAttributes } from "widget-sdk";
import useCity from "../api/useCity";
import useWeather from "../api/useWeather";
import { LoadingBox } from "../components/LoadingBox";
import { WeatherCard } from "../components/WeatherCard";
import { dateFormat } from "../date";

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
  // Fallback if apikey or location in configuration form was not filled out

  var apiKey = "d23e3a76aafeab7260e4e16cd91c73ad";
  if (key && key !== 'undefined' && key.trim() !== '') {
    apiKey = key
  }

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
    isSameDay(new Date(weather.date * 1000), new Date(eventDate))
  );

  const date = new Date((forecast?.date ?? weather?.current?.date)! * 1000);
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
      date={dateFormat(date, lang)}
      time={time}
      icon={icon}
    ></WeatherCard>
  );
};
