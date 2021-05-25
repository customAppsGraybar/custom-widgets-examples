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
