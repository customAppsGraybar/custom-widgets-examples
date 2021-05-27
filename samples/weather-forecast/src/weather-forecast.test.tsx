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

import React from "react";
import axios from "axios";
import { screen, render } from "@testing-library/react";

import { WeatherForecast } from "./weather-forecast";

import { weather, city } from "./api/mockData";

const mockAxios = jest.spyOn(axios, "get");

describe("WeatherForecast", () => {
  it("should render the component", () => {
    mockAxios
      .mockResolvedValueOnce({ data: city })
      .mockResolvedValueOnce({ data: weather });

    const date = new Date(2020, 1, 1).toTimeString();
    const time = "01:00";

    render(
      <WeatherForecast
        contentLanguage="en_US"
        message="World"
        apikey="000"
        date={date}
        time={time}
        location={"Chemnitz"}
      />
    );

    expect(screen.getByText(/Chemnitz/)).toBeInTheDocument();
  });
});
