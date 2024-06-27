/*!
 * Copyright 2024, Staffbase GmbH and contributors.
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
  };

  const infoBoxWithBackdropFilter = {
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    ...infoBoxStyle,
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
    <div style={infoBoxWithBackdropFilter}>
      <div style={infoBoxContent}>
        <a
          href="https://www.figma.com/community/file/823259031807888076/Component-Based-Weather-Icon-Sets"
          style={infoBoxContentLink}
          target="_blank"
          rel="noreferrer"
        >
          Weather Icon Set
        </a>{" "}
        by Osman Talha (Licensed under CC BY 4.0) and adapted by Staffbase.
        <br />
        <br />
        Contains information from openweathermap.org, which is made available
        here under the Open Database License (ODbL).
      </div>
      <div role="button" style={infoButtonStyle} onClick={props.onCloseClick}>
        <Cross />
      </div>
    </div>
  );
};
