import React from "react";
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
  time?: string;
  location?: string;
}

export const ContentBox: React.FC<ContentBoxProperties> = (props) => {
  const contentStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    height: "100%",
  };

  const temperatureValueStyle: CSS.Properties = {
    fontSize: "2.6rem",
    fontWeight: "bold",
    marginRight: "1rem",
  };

  const alternateDateValueStyle: CSS.Properties = {
    fontSize: "1.5rem",
    fontWeight: "lighter",
  };

  const bottomInfoStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",
  };

  const infoLineValueStyle: CSS.Properties = {
    fontSize: "1.125rem",
    fontWeight: "normal",
    lineHeight: "1.7rem",
  };

  const infoLineValueBoldStyle: CSS.Properties = {
    fontWeight: "bold",
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

  return (
    <>
      <div style={infoButtonStyle} onClick={props.onInfoButtonClick}>
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
          <WeatherGraphic icon={props.icon} />
        </div>
        <div style={bottomInfoStyle}>
          <div>
            <p style={infoLineValueStyle}>
              {props.time} · {props.location}
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
