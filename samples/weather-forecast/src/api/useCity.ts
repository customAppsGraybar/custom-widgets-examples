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
import { useQuery, UseQueryResult } from "react-query";
import { CityReport } from "./openGeoApi";
import { city } from "./mockData";

type Coordinates = { lat: number; lon: number; name: string };

type Options = {
  key: string | undefined;
  location: string;
  lang: string;
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
    ? local_names[options.lang.substring(0, 2)] ?? name
    : name;

  return { lat, lon, name: cityName };
};

export default function useCity(
  options: Options
): UseQueryResult<Coordinates, Error> {
  // Fallback if no location was specified
  options.location = options.location ?? city[0].name;
  const { location } = options;

  return useQuery<Coordinates, Error>(
    ["coordinates", location],
    () => getCoordinates(options),
    { enabled: !!location && !!options.key }
  );
}
