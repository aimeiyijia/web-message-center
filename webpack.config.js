const webpack = require("webpack")
const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const nodeEnv = process.env.NODE_ENV || "development"
const isProd = nodeEnv === "production"

const plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
  new HtmlWebpackPlugin({
    title: "message-center",
    template: "!!ejs-loader!public/index.html"
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      tslint: {
        emitErrors: true,
        failOnHint: true
      }
    }
  })
]

var commonConfig = {
  devtool: isProd ? "hidden-source-map" : "source-map",
  context: path.resolve("./src"),
  entry: {
    "message-center": "./index.ts"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        exclude: [/\/node_modules\//],
        use: ["awesome-typescript-loader", "source-map-loader"]
      },
      !isProd
        ? {
            test: /\.(js|ts)$/,
            loader: "istanbul-instrumenter-loader",
            exclude: [/\/node_modules\//],
            query: {
              esModules: true
            }
          }
        : null,
      { test: /\.html$/, loader: "html-loader" },
      { test: /\.css$/, loaders: ["style-loader", "css-loader"] }
    ].filter(Boolean)
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    compress: true,
    port: 3000,
    hot: true
  }
}
var umdConfig = {
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
    library: {
      root: "MessageCenter",
      amd: "message-center"
    },
    libraryTarget: "umd",
    libraryExport: "default"
  },
  optimization: {
    minimize: false
  },
  ...commonConfig
}
var miniUmdConfig = {
  output: {
    path: path.resolve("./dist"),
    filename: "[name].mini.js",
    library: {
      root: "MessageCenter",
      amd: "message-center"
    },
    libraryTarget: "umd",
    libraryExport: "default"
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  ...commonConfig
}

module.exports = [miniUmdConfig, umdConfig]
