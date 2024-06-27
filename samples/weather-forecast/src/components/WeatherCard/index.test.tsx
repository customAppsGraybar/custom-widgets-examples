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
import { render, screen } from "@testing-library/react";
import { WeatherCard } from ".";

describe("WeatherCard", () => {
  it("Should convert the given temperature from Kelvin to Celsius and Fahrenheit", () => {
    const givenTemperature = 282.58;

    render(
      <WeatherCard
        color="#FF"
        temperature={givenTemperature}
        smallWidth={true}
        fahrenheit={false}
      />
    );

    expect(screen.getByText("9° C")).toBeInTheDocument();
    expect(screen.getByText("49° F")).toBeInTheDocument();
  });

  it("Should display the given information", () => {
    render(
      <WeatherCard
        color="#FF"
        date="Blue Monday"
        text="After Dinner"
        location="Chemnitz"
        smallWidth={true}
        fahrenheit={false}
      />
    );

    expect(screen.getByText("After Dinner · Chemnitz")).toBeInTheDocument();
    expect(screen.getByText("Blue Monday")).toBeInTheDocument();
  });
});
