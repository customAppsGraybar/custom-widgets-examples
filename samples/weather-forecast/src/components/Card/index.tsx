import React, { FunctionComponent } from "react";
import CSS from "csstype";

export interface CardProperties {
    color: string;
}

export const Card: FunctionComponent<CardProperties> = (props) => {

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

    return (
        <div style={cardStyle}>
            {props.children}
        </div>
    );
}