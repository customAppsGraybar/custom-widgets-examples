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

import axios from "axios";

import React, { FunctionComponent } from "react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { renderHook } from "@testing-library/react-hooks";

import useWeather from "./useWeather";
import { weather } from "./mockData";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper: FunctionComponent = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockAxios = jest.spyOn(axios, "get");
const log = jest.fn();

setLogger({
  log: log,
  warn: log,
  error: log,
});

describe("useWeather", () => {
  const endpoint = "//api.openweathermap.org/data/2.5/onecall";
  afterEach(() => {
    queryClient.clear();
  });

  it("should return weather data", async () => {
    mockAxios.mockResolvedValueOnce({ data: weather });
    const { result, waitFor } = renderHook(
      () => useWeather({ key: "foo", lat: 44, lon: 42 }),
      { wrapper }
    );

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(mockAxios).toHaveBeenCalledWith(endpoint, {
      params: {
        appid: "foo",
        lat: 44,
        lon: 42,
        lang: "en",
        units: "standard",
      },
    });
    expect(result.current.data?.current).toMatchObject({
      date: 1621490142,
      description: "scattered clouds",
      humidity: 90,
      temperature: {
        current: 282.14,
      },
      wind: 0.89,
    });

    expect(result.current.data?.forecast).toHaveLength(8);
  });

  it("should return an error, when the request fails", async () => {
    mockAxios.mockRejectedValue(new Error("XMLHTTPError"));
    const { result, waitFor } = renderHook(
      () => useWeather({ key: "foo", lat: 44, lon: 42 }),
      { wrapper }
    );

    await waitFor(() => {
      return result.current.isError;
    });

    expect(result.current.error).toEqual(new Error("XMLHTTPError"));
    expect(log).toHaveBeenCalledTimes(1);
  });

  it("should return an error, when the data processing goes wrong", async () => {
    const { daily, ...rest } = weather; // eslint-disable-line  @typescript-eslint/no-unused-vars
    mockAxios.mockResolvedValueOnce({ data: rest });
    const { result, waitFor } = renderHook(
      () => useWeather({ key: "foo", lat: 44, lon: 42 }),
      { wrapper }
    );

    await waitFor(() => {
      return result.current.isError;
    });

    expect(result.current.error).toEqual(
      new TypeError("Cannot read property 'map' of undefined")
    );
    expect(log).toHaveBeenCalledTimes(1);
  });
});
