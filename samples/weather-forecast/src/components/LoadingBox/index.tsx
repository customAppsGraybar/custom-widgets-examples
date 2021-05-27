import React from "react";
import CSS from "csstype";

export interface LoadingCardProperties {
  color: string;
}

export const LoadingBox: React.FC<LoadingCardProperties> = (props) => {
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
    <div style={cardStyle}>
      <div style={cardLoadingStyle}>
        <div style={cardLoadingContentStyle}>Loading...</div>
      </div>
    </div>
  );
};
