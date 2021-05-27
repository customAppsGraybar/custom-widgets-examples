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
