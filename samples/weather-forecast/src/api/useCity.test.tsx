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

import useCity from "./useCity";
import { city } from "./mockData";

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

describe("useCity", () => {
  const endpoint = "//api.openweathermap.org/geo/1.0/direct";

  afterEach(() => {
    queryClient.clear();
  });

  it("should return the coordinatse", async () => {
    mockAxios.mockResolvedValueOnce({ data: city });
    const { result, waitFor } = renderHook(
      () => useCity({ key: "foo", location: "Berlin", lang: "de" }),
      { wrapper }
    );

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(mockAxios).toHaveBeenCalledWith(endpoint, {
      params: {
        appid: "foo",
        q: "Berlin",
      },
    });
    expect(result.current.data).toMatchObject({
      lat: 50.6667,
      lon: 12.75,
    });
  });
});
