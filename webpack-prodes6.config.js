const path = require("path");
const webpack = require("webpack");

let date = new Date().toISOString();
var front = {
  entry: {
    main: ["./src/js/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "public/build/es6js"),
    filename: "[name].js?" + date,
    publicPath: "/src/build/es6js/"
  },
  mode: "production",
  plugins: [new webpack.HashedModuleIdsPlugin()],
  module: {
    rules: [{ test: /\.vue$/, loader: "vue-loader" }]
  },
  resolve: {
    alias: {
      "@Components": path.join(__dirname, "/src/js/components/"),
      "@Modules": path.join(__dirname, "/src/js/modules/"),
      "@Class": path.join(__dirname, "/src/js/class/")
    }
  }
};
var admin = {
  entry: {
    main: ["./src/admin/main.js"],
    login: ["./src/admin/login.js"]
  },
  output: {
    path: path.resolve(__dirname, "public/admin/build/es6js"),
    filename: "[name].js?" + date,
    publicPath: "/src/admin/build/es6js/"
  },
  mode: "production",
  plugins: [new webpack.HashedModuleIdsPlugin()],
  module: {
    rules: [{ test: /\.vue$/, loader: "vue-loader" }]
  },
  resolve: {
    alias: {
      "@Components": path.join(__dirname, "/src/admin/components/"),
      "@Modules": path.join(__dirname, "/src/admin/modules/"),
      "@Class": path.join(__dirname, "/src/admin/class/")
    }
  }
};

module.exports = [front, admin];
