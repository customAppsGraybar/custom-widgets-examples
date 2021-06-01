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

import React, { FunctionComponent } from "react";
import CSS from "csstype";
import Info from "../Icons/info.svg";


import { useMediaQuery } from "../../hooks/MediaQueryHook";
import { WeatherIcon } from "api/weatherIcon";
import { WeatherGraphic } from "../Icons/weather-icons/WeatherGraphic";

export interface ContentBoxProperties {
  onInfoButtonClick: (e: React.SyntheticEvent) => void;
  icon?: WeatherIcon;
  temperature: string;
  alternateTemperature: string;
  date?: string;
  time?: string;
  location?: string;
}

export const ContentBox: FunctionComponent<ContentBoxProperties> = (props) => {

  const limitedDeviceSize = useMediaQuery('(max-width: 25rem)');

  const contentStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    height: "100%",
  };

  const temperatureValueStyle: CSS.Properties = {
    margin: "0",
    padding: "0",    
    fontSize: "2.6rem",
    fontWeight: "bold",
    marginRight: "1rem",
  };

  const alternateDateValueStyle: CSS.Properties = {
    margin: "0",
    padding: "0",    
    fontSize: "1.25rem",
    fontWeight: "lighter",
  };

  const bottomInfoStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",
  };

  const infoLineValueStyle: CSS.Properties = {
    margin: "0",
    padding: "0",    

    fontSize: "1.125rem",
    fontWeight: "normal",
    lineHeight: "1.7rem",
  };

  const infoLineValueBoldStyle: CSS.Properties = {
    margin: "0",
    padding: "0",    

    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
  };

  const topLineStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  };

  const temperatureStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const infoButtonStyle: CSS.Properties = {
    position: "absolute",
    right: "0",
    bottom: "0",
    marginRight: "0.8rem",
    marginBottom: "0.8rem",
    height: "1rem",
    cursor: "pointer",
  };

  const iconSize = limitedDeviceSize ? 64 : 88;

  return (
    <>
      <div
        role="button"
        style={infoButtonStyle}
        onClick={props.onInfoButtonClick}
      >
        <Info />
      </div>
      <div style={contentStyle}>
        <div style={topLineStyle}>
          <div style={temperatureStyle}>
            <h1 style={temperatureValueStyle}>{props.temperature}</h1>
            <h2 style={alternateDateValueStyle}>
              {props.alternateTemperature}
            </h2>
          </div>
          <WeatherGraphic icon={props.icon} size={iconSize} />
        </div>
        <div style={bottomInfoStyle}>
          <div>
            <p style={infoLineValueStyle}>
              {props.time && props.time + " · "}
              {props.location}
            </p>
          </div>
          <div>
            <p style={infoLineValueBoldStyle}>{props.date}</p>
          </div>
        </div>
      </div>
    </>
  );
};
