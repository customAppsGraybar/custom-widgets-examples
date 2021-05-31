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
import { useMediaQuery } from "../../hooks/MediaQueryHook";

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

    const limitedDeviceSize = useMediaQuery('(max-width: 25rem)');

    const cardStyle = (limitedDeviceSize: Boolean): CSS.Properties => {
        return {
            display: "block",
            color: "white",
            boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
            borderRadius: "0.5rem",
            height: "14rem",
            minWidth: limitedDeviceSize ? "0" : "25rem",
            maxWidth: "25rem",
            fontFamily: "Open Sans",
            fontStyle: "normal",
            position: "relative",
            backgroundColor: props.color,
        } as CSS.Properties;
    };

    return (
        <div style={cardStyle(limitedDeviceSize)}>
            {props.children}
        </div>
    );
}
}
