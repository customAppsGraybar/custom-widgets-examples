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
  size?: number;
  icon?: WeatherIcon;
  marginLeft?: string;
  alignSelf?: string;
}

export const WeatherGraphic: React.FC<WeatherGraphicProperties> = (props) => {
  const weatherIconStyle: CSS.Properties = {
    ...(props.marginLeft && { marginLeft: props.marginLeft }),
    ...(props.alignSelf && { alignSelf: props.alignSelf }),
    height: "6rem",
    filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.2))",
  };

  let icon: JSX.Element;
  const size = `${props.size ? props.size : 48}px`;

  const iconProps = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
  };

  switch (props.icon) {
    case "rain":
      icon = <Rain {...iconProps} />;
      break;

    case "fog":
      icon = <Fog {...iconProps} />;
      break;

    case "thunderstorms":
      icon = <Thunderstorms {...iconProps} />;
      break;

    case "partly-cloudy":
      icon = <PartlyCloudy {...iconProps} />;
      break;

    case "clear-cloudy":
      icon = <ClearCloudy {...iconProps} />;
      break;

    case "snow":
      icon = <Snow {...iconProps} />;
      break;

    case "cloudy":
      icon = <Cloudy {...iconProps} />;
      break;

    case "showers":
      icon = <Showers {...iconProps} />;
      break;

    default:
      icon = <Sunny {...iconProps} />;
      break;
  }

  return <div style={weatherIconStyle}>{icon}</div>;
};
