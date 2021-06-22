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

import { WeatherIcon } from "api/weatherIcon";
import { WeatherGraphic } from "../Icons/weather-icons/WeatherGraphic";

export interface ContentBoxProperties {
  onInfoButtonClick: (e: React.SyntheticEvent) => void;
  icon?: WeatherIcon;
  temperature: string;
  alternateTemperature: string;
  date?: string;
  text?: string;
  location?: string;
  smallWidth: boolean;
}

export const ContentBox: FunctionComponent<ContentBoxProperties> = (props) => {
  const contentStyle: CSS.Properties = {
    display: "flex",
    flexDirection: props.smallWidth ? "column" : "row",
    ...(props.smallWidth && { padding: "2rem" }),
    height: "100%",
    ...(!props.smallWidth && {
      paddingLeft: "4rem",
      paddingRight: "4rem",
      justifyContent: "space-between",
    }),
  };

  const temperatureValueStyle: CSS.Properties = {
    margin: "0",
    padding: "0",
    fontSize: "2.6rem",
    fontWeight: "bold",
    marginRight: "1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const alternateDateValueStyle: CSS.Properties = {
    margin: "0",
    padding: "0",
    fontSize: "1.25rem",
    fontWeight: "lighter",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const bottomInfoStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    ...(!props.smallWidth && {
      justifyContent: "center",
      alignItems: "center",
    }),
    ...(props.smallWidth && { marginTop: "auto" }),
  };

  const infoLineValueStyle: CSS.Properties = {
    margin: "0",
    padding: "0",

    fontSize: "1.125rem",
    fontWeight: "normal",
    lineHeight: "1.7rem",

    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "18rem",
  };

  const infoLineValueBoldStyle: CSS.Properties = {
    margin: "0",
    padding: "0",

    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "18rem",
  };

  const topLineStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    alignItems: !props.smallWidth ? "center" : "flex-start",
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

  const iconSize = props.smallWidth ? 64 : 88;

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
          {props.smallWidth && (
            <WeatherGraphic
              icon={props.icon}
              size={iconSize}
              marginLeft="auto"
            />
          )}
        </div>
        <div style={bottomInfoStyle}>
          <div>
            <p style={infoLineValueStyle}>
              {props.text && props.text + " · "}
              {props.location}
            </p>
          </div>
          <div>
            <p style={infoLineValueBoldStyle}>{props.date}</p>
          </div>
        </div>
        {!props.smallWidth && (
          <WeatherGraphic
            icon={props.icon}
            size={iconSize}
            alignSelf="center"
          />
        )}
      </div>
    </>
  );
};
