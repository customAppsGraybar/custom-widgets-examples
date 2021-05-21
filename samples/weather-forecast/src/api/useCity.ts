import axios from "axios";
import { useQuery } from "react-query";
import { cityReport } from "./openGeoApi";

type Coordinates = { lat: number; lon: number };

type Options = {
  key: string;
  location: string;
};

const getCoordinates = async (options: Options) => {
  const endpoint = "//api.openweathermap.org/geo/1.0/direct";
  const { key: appid, location: q } = options;
  const { data } = await axios.get<[cityReport]>(endpoint, {
    params: { appid, q },
  });
  const [{ lat, lon }] = data;

  return { lat, lon };
};

export default function useCity(options: Options) {
  const { location } = options;
  return useQuery<Coordinates, Error>(["coordinates", location], () =>
    getCoordinates(options)
  );
}
