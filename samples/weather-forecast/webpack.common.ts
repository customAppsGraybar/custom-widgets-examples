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

import * as webpack from "webpack";
// eslint-disable-next-line
const CopyPlugin = require("copy-webpack-plugin");

const config: webpack.Configuration = {
  entry: {
    "staffbase.weather-forecast": "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader"],
        exclude: /.*\/node_modules/,
      },
      {
        test: /\.svg$/i,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
      {
        test: /weather-forecast\.svg$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "manifest.json" }],
    }),
  ],
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
};

export default config;
