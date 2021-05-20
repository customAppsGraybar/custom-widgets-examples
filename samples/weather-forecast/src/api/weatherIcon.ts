export type WeatherIcon =
  | "snow"
  | "sunny"
  | "clear-cloudy"
  | "partly-cloudy"
  | "cloudy"
  | "fog"
  | "showers"
  | "rain"
  | "thunderstorms";

const iconsMap: { [key: string]: WeatherIcon } = {
  "01d": "sunny",
  "02d": "clear-cloudy",
  "03d": "partly-cloudy",
  "04d": "cloudy",
  "09d": "showers",
  "10d": "rain",
  "11d": "thunderstorms",
  "13d": "snow",
  "50d": "fog",
  "01n": "sunny",
  "02n": "clear-cloudy",
  "03n": "partly-cloudy",
  "04n": "cloudy",
  "09n": "showers",
  "10n": "rain",
  "11n": "thunderstorms",
  "13n": "snow",
  "50n": "fog",
} as const;

export type iconCodes = keyof typeof iconsMap;

export const getIcon = (name: iconCodes): WeatherIcon => {
  if (iconsMap[name]) {
    return iconsMap[name];
  }
  return "sunny";
};
