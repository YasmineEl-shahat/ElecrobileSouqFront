const webpack = require("webpack");

const path = require("path");
// minify our CSS and extract it to a separate file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // reactStrictMode: true,

  webpack(config, options) {
    const { dev } = options;

    if (dev) {
      config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({
          "process.env.API_URL": JSON.stringify(
            "https://electrobile-souq.onrender.com/api/v1"
          ),
        }),
      ];
    }
    if (!dev) {
      config.devtool = "source-map";
      config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({
          "process.env.API_URL": JSON.stringify(
            "https://electrobile-souq.onrender.com/api/v1"
          ),
        }),
        //Webpack will pick the name for us and add a hash to it.
        //the file name will only change when our CSS changes.
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
      ];
    }
    config.module.rules.push({
      test: /\.(svg|png|jpg|gif)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "imgs",
        },
      },
    });
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["babel-loader"],
    });
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "http://localhost:3000",
      "localhost",
      "http://localhost:3000undefined",
      "electrobile-souq.onrender.com",
    ],
  },
};
