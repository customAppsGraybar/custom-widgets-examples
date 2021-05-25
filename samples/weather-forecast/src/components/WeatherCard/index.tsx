import React, { useState } from "react";
import CSS from "csstype";
import { WeatherIcon } from "api/weatherIcon";
import { InfoBox } from "../InfoBox";
import { ContentBox } from "../ContentBox";

/**
 * React Component
 */
export interface WeatherCardProperties {
  color: string;
  location?: string;
  date?: string;
  time?: string;
  temperature?: number;
  icon?: WeatherIcon;
}

export const WeatherCard: React.FC<WeatherCardProperties> = (props) => {
  const cardStyle: CSS.Properties = {
    display: "block",
    color: "white",
    boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
    borderRadius: "0.5rem",
    height: "14rem",
    minWidth: "25rem",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    position: "relative",
    backgroundColor: props.color,
  };

  const [displayInfo, setDisplayInfo] = useState(false);

  const onInfoBtnClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDisplayInfo(!displayInfo);
  };

  const kelvin = 273.15;
  const temp = props.temperature ?? kelvin;
  const alternateTemperature =
    ((temp - kelvin) * (9 / 5) + 32).toFixed(0) + "° F";
  const temperature = (temp - kelvin).toFixed(0) + "° C";

  return (
    <div style={cardStyle}>
      <ContentBox
        {...props}
        onInfoButtonClick={onInfoBtnClick}
        temperature={temperature}
        alternateTemperature={alternateTemperature}
      />
      {displayInfo && <InfoBox onCloseClick={onInfoBtnClick} />}
    </div>
  );
};
