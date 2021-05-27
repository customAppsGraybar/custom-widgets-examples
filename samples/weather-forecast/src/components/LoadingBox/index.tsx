import React from "react";
import CSS from "csstype";

import { Card } from '../Card'

export interface LoadingCardProperties {
  color: string;
}

export const LoadingBox: React.FC<LoadingCardProperties> = (props) => {

  const cardLoadingStyle: CSS.Properties = {
    display: "block",
    position: "absolute",
    left: "0",
    top: "0",
    bottom: "0",
    right: "0",
    textAlign: "center",
    verticalAlign: "middle",
    backdropFilter: "blur(10px)",
  };

  const cardLoadingContentStyle: CSS.Properties = {
    color: "white",
    position: "relative",
    padding: "2rem",
    fontSize: "1rem",
    lineHeight: "1.2rem",
    fontWeight: "bold",
  };

  return (
    <Card color={props.color}>
      <div style={cardLoadingStyle}>
        <div style={cardLoadingContentStyle}>Loading...</div>
      </div>
    </Card>
  );
};
