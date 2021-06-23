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

import React, { useState, FunctionComponent } from "react";
import { WeatherIcon } from "api/weatherIcon";
import { InfoBox } from "../InfoBox";
import { ContentBox } from "../ContentBox";
import { Card } from "../Card";

/**
 * React Component
 */
export interface WeatherCardProperties {
  color: string;
  location?: string;
  date?: string;
  text?: string;
  temperature?: number;
  icon?: WeatherIcon;
  smallWidth: boolean;
  fahrenheit: boolean;
}

export const WeatherCard: FunctionComponent<WeatherCardProperties> = (
  props
) => {
  const [displayInfo, setDisplayInfo] = useState(false);

  const onInfoBtnClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDisplayInfo(!displayInfo);
  };

  const offsetToKelvin = 273.15;
  const temp = props.temperature ?? offsetToKelvin;
  let alternateTemperature =
    ((temp - offsetToKelvin) * (9 / 5) + 32).toFixed(0) + "° F";
  let temperature = (temp - offsetToKelvin).toFixed(0) + "° C";

  if (props.fahrenheit) {
    const value = temperature;
    temperature = alternateTemperature;
    alternateTemperature = value;
  }

  return (
    <Card color={props.color} smallWidth={props.smallWidth}>
      <ContentBox
        {...props}
        onInfoButtonClick={onInfoBtnClick}
        temperature={temperature}
        alternateTemperature={alternateTemperature}
      />
      {displayInfo && <InfoBox onCloseClick={onInfoBtnClick} />}
    </Card>
  );
};
