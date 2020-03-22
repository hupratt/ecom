const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  watch: true,
  entry: "./ecom/frontend/src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "ecom/frontend/static/frontend/main.js")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff2?|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 25000 }
          }
        ]
      }
    ]
  },
  plugins: [new Dotenv({ path: "./.env.development" })]
};
