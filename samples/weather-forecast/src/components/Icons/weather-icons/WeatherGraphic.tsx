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

import React from "react";
import CSS from "csstype";

import ClearCloudy from "./icons/clear-cloudy.svg";
import PartlyCloudy from "./icons/partly-cloudy.svg";
import Cloudy from "./icons/cloudy.svg";
import Fog from "./icons/fog.svg";
import Rain from "./icons/rain.svg";
import Showers from "./icons/showers.svg";
import Snow from "./icons/snow.svg";
import Sunny from "./icons/sunny.svg";
import Thunderstorms from "./icons/thunderstorms.svg";

import { WeatherIcon } from "api/weatherIcon";

export interface WeatherGraphicProperties {
  icon?: WeatherIcon;
}

export const WeatherGraphic: React.FC<WeatherGraphicProperties> = (props) => {
  const weatherIconStyle: CSS.Properties = {
    marginLeft: "auto",
    height: "6rem",
    filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.2))",
  };

  let icon: JSX.Element;
  switch (props.icon) {
    case "rain":
      icon = <Rain />;
      break;

    case "fog":
      icon = <Fog />;
      break;

    case "thunderstorms":
      icon = <Thunderstorms />;
      break;

    case "partly-cloudy":
      icon = <PartlyCloudy />;
      break;

    case "clear-cloudy":
      icon = <ClearCloudy />;
      break;

    case "snow":
      icon = <Snow />;
      break;

    case "cloudy":
      icon = <Cloudy />;
      break;

    case "showers":
      icon = <Showers />;
      break;

    default:
      icon = <Sunny />;
      break;
  }

  return <div style={weatherIconStyle}>{icon}</div>;
};
