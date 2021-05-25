import React from "react";
import CSS from "csstype";
import Cross from "../Icons/cross.svg";

export interface InfoBoxProperties {
  onCloseClick: (e: React.SyntheticEvent) => void;
}

export const InfoBox: React.FC<InfoBoxProperties> = (props) => {
  const infoBoxStyle: CSS.Properties = {
    display: "block",
    position: "absolute",
    left: "0",
    top: "0",
    bottom: "0",
    right: "0",
    borderRadius: "0.5rem",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
  };

  const infoBoxContent: CSS.Properties = {
    color: "black",
    position: "relative",
    padding: "2rem",
    fontSize: "1rem",
    lineHeight: "1.2rem",
  };

  const infoBoxContentLink: CSS.Properties = {
    color: "black",
    cursor: "pointer",
    textDecoration: "underline",
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
    <div style={infoBoxStyle}>
      <div style={infoBoxContent}>
        <a
          href="https://www.figma.com/community/file/823259031807888076/Component-Based-Weather-Icon-Sets"
          style={infoBoxContentLink}
        >
          Weather Icon Set
        </a>{" "}
        by Osman Talha (Licensed under CC BY 4.0) and adapted by Staffbase.
        <br />
        <br />
        Contains information from openweathermap.org, which is made available
        here under the Open Database License (ODbL).
      </div>
      <div style={infoButtonStyle} onClick={props.onCloseClick}>
        <Cross />
      </div>
    </div>
  );
};
