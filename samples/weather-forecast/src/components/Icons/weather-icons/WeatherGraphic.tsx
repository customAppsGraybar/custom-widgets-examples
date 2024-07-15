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

import React, { Suspense } from "react";
import CSS from "csstype";

import { WeatherIcon } from "api/weatherIcon";

export interface WeatherGraphicProperties {
  size?: number;
  icon?: WeatherIcon;
  marginLeft?: string;
  alignSelf?: string;
}

export const WeatherGraphic: React.FC<WeatherGraphicProperties> = (props) => {
  const weatherIconStyle: CSS.Properties = {
    ...(props.marginLeft && { marginLeft: props.marginLeft }),
    ...(props.alignSelf && { alignSelf: props.alignSelf }),
    height: "6rem",
    filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.2))",
  };

  /* let icon: JSX.Element; */
  const size = `${props.size ? props.size : 48}px`;

  const iconProps = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
  };

  const Icon = React.lazy(() => import(`./icons/${props.icon}.svg`));

  return (
    <Suspense fallback={<>{}</>}>
      <div style={weatherIconStyle}>
        <Icon {...iconProps} />
      </div>
    </Suspense>
  );
};
