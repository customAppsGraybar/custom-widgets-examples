import React, { useState } from "react";
import CSS from "csstype";
import { WeatherIcon } from "api/weatherIcon";
import { InfoBox } from "../InfoBox";
import { ContentBox } from "../ContentBox";
import { Card } from '../Card'

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

  const [displayInfo, setDisplayInfo] = useState(false);

  const onInfoBtnClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDisplayInfo(!displayInfo);
  };

  const offsetToKelvin = 273.15
  const temp = props.temperature ?? offsetToKelvin
  const alternateTemperature = ((temp - offsetToKelvin) * (9 / 5) + 32).toFixed(0) + '° F'
  const temperature = (temp - offsetToKelvin).toFixed(0) + '° C'

console.log(props)

  return (
    <Card color={props.color}>
      <ContentBox {...props} onInfoButtonClick={onInfoBtnClick} temperature={temperature} alternateTemperature={alternateTemperature}/> 
      {displayInfo && <InfoBox onCloseClick={onInfoBtnClick}/>}
    </Card>
  );
};
