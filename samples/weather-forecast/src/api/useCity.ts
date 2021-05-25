import axios from "axios";
import { useQuery } from "react-query";
import { CityReport } from "./openGeoApi";
import { city } from "./mockData";

type Coordinates = { lat: number; lon: number; name: string };

type Options = {
  key: string;
  location: string;
  contentLanguage: string;
};

const getCoordinates = async (options: Options) => {
  const endpoint = "//api.openweathermap.org/geo/1.0/direct";
  const { key: appid, location: q } = options;
  const { data } = await axios.get<[CityReport]>(endpoint, {
    params: { appid, q },
  });

  // Fallback if geo service returns an empty array
  const result: CityReport[] = data.length >= 1 ? data : city;

  const [{ lat, lon, name, local_names }] = result;
  const cityName = local_names
    ? local_names[options.contentLanguage.substring(0, 2)] ?? name
    : name;

  return { lat, lon, name: cityName };
};

export default function useCity(options: Options) {
  const { location } = options;
  return useQuery<Coordinates, Error>(["coordinates", location], () =>
    getCoordinates(options)
  );
}
