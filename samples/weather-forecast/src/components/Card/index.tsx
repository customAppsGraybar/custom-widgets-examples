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

import React, { FunctionComponent, useState } from "react";
import CSS from "csstype";
import useDimensions from "../../hooks";

export interface CardProperties {
  color: string;
}

export const Card: FunctionComponent<CardProperties> = (props) => {

    const smallWidthBreakpoint = 550;
    const [smallWidth, setSmallWidth] = useState(true);

    const { observe } = useDimensions<HTMLDivElement>({
        shouldUpdate: ({ width }) => {
            const sizeChanged = (smallWidth && (width >= smallWidthBreakpoint)) || (!smallWidth && (width < smallWidthBreakpoint))

            if (sizeChanged) {
                setSmallWidth(!smallWidth)
            }

            return sizeChanged
        }
    });

    window.addEventListener('error', function(e) { console.log(e); });

    const cardStyle: CSS.Properties = {
        display: "block",
        color: "white",
        boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
        borderRadius: "0.5rem",
        height: smallWidth ? "14rem" : "10rem",
        fontFamily: "Open Sans",
        fontStyle: "normal",
        position: "relative",
        backgroundColor: props.color,
    };

    return (
        <div style={cardStyle} ref={observe} >
            {props.children}
        </div>
    );
}
