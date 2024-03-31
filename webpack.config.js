const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/"
  },

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.s?[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: "index.html"
    })
  ],

  devServer: {
    static: {
      publicPath: path.join(__dirname + "build")
    },
    proxy: {
      "/build": "http://localhost:3000",
      "/books": "http://localhost:3000",
      "/book": "http://localhost:3000",
      "/books/nyt/*": "http://localhost:3000",
      "/books/nyt/hardcover-fiction": "http://localhost:3000",
      "/auth": "http://localhost:3000"
    },
    historyApiFallback: true
  }
};
