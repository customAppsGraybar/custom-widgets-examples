
import React from "react"
import CSS from "csstype"

import { WeatherIcon } from "api/weatherIcon";


export interface ContentBoxProperties {
    onInfoButtonClick: (e: React.SyntheticEvent) => void
    icon?: WeatherIcon
    temperature: string,
    alternateTemperature: string,
    date?: string,
    time?: string,
    location?: string,
}
  
export const ContentBox: React.FC<ContentBoxProperties> = (props) => {

    const contentStyle: CSS.Properties = {
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
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

    const weatherIconStyle: CSS.Properties = {
        marginLeft: "auto",
        height: "6rem",
        filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.2))",
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

    const weatherIcon = "./weather-icons/" + props.icon + ".svg";

    return 	(		
    <>
        <div style={infoButtonStyle} onClick={props.onInfoButtonClick}>
            <img src="./info.svg" />
        </div>
        <div style={contentStyle}>
            <div style={topLineStyle}>
                <div style={temperatureStyle}>
                    <h1 style={temperatureValueStyle}>{props.temperature}</h1>
                    <h2 style={alternateDateValueStyle}>
                    {props.alternateTemperature}
                    </h2>
                </div>
                <img style={weatherIconStyle} src={weatherIcon} />
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

    )

}