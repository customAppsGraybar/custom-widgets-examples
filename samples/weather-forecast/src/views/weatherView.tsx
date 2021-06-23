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
import React, { FunctionComponent, useState } from "react";
import { BlockAttributes } from "widget-sdk";
import useCity from "../api/useCity";
import useWeather from "../api/useWeather";
import { ErrorBox } from "../components/ErrorBox";
import { LoadingBox } from "../components/LoadingBox";
import { WeatherCard } from "../components/WeatherCard";
import { dateFormat } from "../date";
import useDimensions from "react-cool-dimensions";

/**
 * React Component
 */
export interface WeatherForecastProps extends BlockAttributes {
  apikey: string;
  date: string;
  text: string;
  location: string;
  fahrenheit: boolean;
}

export const WeatherView: FunctionComponent<WeatherForecastProps> = ({
  apikey: key,
  date: eventDate,
  text,
  location,
  fahrenheit,
  contentLanguage,
}: WeatherForecastProps) => {
  const lang =
    contentLanguage.length >= 2 ? contentLanguage.substr(0, 2) : "en";

  const smallWidthBreakpoint = 616;
  const [smallWidth, setSmallWidth] = useState(true);

  const { observe } = useDimensions<HTMLDivElement>({
    shouldUpdate: ({ width }) => {
      const sizeChanged =
        (smallWidth && width >= smallWidthBreakpoint) ||
        (!smallWidth && width < smallWidthBreakpoint);

      if (sizeChanged) {
        setSmallWidth(!smallWidth);
      }

      return sizeChanged;
    },
  });

  let apiKey = undefined;
  if (key && key !== "undefined" && key.trim() !== "") {
    apiKey = key;
  }

  const {
    data: coordinates,
    isLoading: useCityLoading,
    error: useCityError,
  } = useCity({
    key: apiKey,
    location,
    lang: lang,
  });

  const {
    data: weather,
    isLoading: useWeatherLoading,
    error: useWeatherError,
  } = useWeather({
    key: apiKey,
    lang,
    ...coordinates,
  });

  const errorColor = "#E14124";
  const bgColor = "#24B5E1";

  let displayElement: JSX.Element | undefined = undefined;

  if (useCityLoading || useWeatherLoading) {
    displayElement = <LoadingBox color={bgColor} smallWidth={smallWidth} />;
  } else {
    if (useCityError || useWeatherError || !weather) {
      const error = useCityError
        ? useCityError
        : useWeatherError ?? new Error("API key missing");
      displayElement = (
        <ErrorBox color={errorColor} error={error} smallWidth={smallWidth} />
      );
    }
  }

  if (!displayElement) {
    // Try to find a forecast if event date was specified
    const forecast = weather?.forecast.find((weather) =>
      isSameDay(new Date(weather.date * 1000), new Date(eventDate))
    );

    const today = new Date().getTime() / 1000;
    const date = new Date(
      (forecast?.date ?? weather?.current?.date ?? today) * 1000
    );
    const icon = forecast?.icon ?? weather?.current?.icon;
    const temperature =
      forecast?.temperature?.max ?? weather?.current?.temperature?.current;

    displayElement = (
      <WeatherCard
        temperature={temperature || 0}
        location={coordinates?.name ?? location}
        color={bgColor}
        date={dateFormat(date, lang)}
        text={text !== "undefined" ? text : undefined}
        icon={icon}
        smallWidth={smallWidth}
        fahrenheit={fahrenheit}
      ></WeatherCard>
    );
  }

  return <div ref={observe}>{displayElement}</div>;
};
