/*!
 * Copyright 2020, Staffbase GmbH and contributors.
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

import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { WeatherView } from "./views/weatherView";
import { BlockAttributes } from "widget-sdk";

const queryClient = new QueryClient();

/**
 * React Component
 */
export interface WeatherForecastProps extends BlockAttributes {
  apiKey: string;
  date: number;
  city: string;
}

export const WeatherForecast = ({
  apiKey,
  date,
  city,
  contentLanguage,
}: WeatherForecastProps): ReactElement => {
  // geo api => lat,lon
  // weather api
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherView {...{ apiKey, date, city, contentLanguage }} />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};
