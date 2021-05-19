import React from "react"
import {screen, render} from "@testing-library/react"

import {WeatherForecast} from "./weather-forecast";

describe("WeatherForecast", () => {
    it("should render the component", () => {
        render(<WeatherForecast contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
