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

import { screen } from "@testing-library/dom";
import axios, { AxiosRequestConfig } from "axios";

import "../dev/bootstrap";
import "./index";

import { weather, city } from "./api/mockData";

const mockAxios = jest.spyOn(axios, "get");

describe("Widget test", () => {
  it("should render the widget", async () => {
    mockAxios.mockImplementation(
      (url: string, _config?: AxiosRequestConfig): Promise<unknown> => {
        if (url.match("//api.openweathermap.org/geo/1.0/direct")) {
          return Promise.resolve({ data: city });
        } else {
          return Promise.resolve({ data: weather });
        }
      }
    );

    const widget = document.createElement("weather-forecast");

    widget.setAttribute("apikey", "123");
    widget.setAttribute("date", "2001-01-01");
    widget.setAttribute("time", "11:00");
    widget.setAttribute("location", "Chemnitz");
    document.body.appendChild(widget);

    expect(await screen.findByText(/Chemnitz/)).toBeInTheDocument();
  });
});
