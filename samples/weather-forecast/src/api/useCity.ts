import axios from "axios";
import { useQuery } from "react-query";
import { CityReport } from "./openGeoApi";

type Coordinates = { lat: number; lon: number, name: string };

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

  const [{ lat, lon, name, local_names }] = data;

  return { lat, lon, name: local_names[options.contentLanguage] ?? name };
};

export default function useCity(options: Options) {
  const { location } = options;
  return useQuery<Coordinates, Error>(["coordinates", location], () =>
    getCoordinates(options)
  );
}
