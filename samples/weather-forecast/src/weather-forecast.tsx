/*!
 * Copyright 2024, Staffbase GmbH and contributors.
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
import { WeatherView } from "./views/weatherView";
import { BlockAttributes } from "widget-sdk";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

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

export const WeatherForecast = ({
  apikey,
  date,
  text,
  location,
  fahrenheit,
  contentLanguage,
}: WeatherForecastProps): ReactElement => {
  const preferFahrenheit =
    typeof fahrenheit == "string" ? fahrenheit === "true" : !!fahrenheit;

  return (
    <QueryClientProvider client={queryClient}>
      <WeatherView
        {...{
          apikey,
          date,
          text,
          location,
          contentLanguage,
          fahrenheit: preferFahrenheit,
        }}
      />
    </QueryClientProvider>
  );
};
