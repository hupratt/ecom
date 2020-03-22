const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  watch: true,
  entry: "./ecom/frontend/src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "ecom/frontend/static/frontend")
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
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: ["*", ".js", ".scss"]
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dev"),
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new Dotenv({ path: "./.env.development" }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        "ecom/frontend/templates/frontend/index.html"
      ),
      favicon: path.join(
        __dirname,
        "ecom/frontend/static/icons/logopetiteportugaise300.png"
      )
    })
  ]
};
