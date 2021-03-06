const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: "none",
  entry: {
    server: "./server.ts"
  },
  target: "node",
  resolve: {
    // modules: [path.resolve(__dirname, "dist"), "node_modules"],
    extensions: [".ts", ".js"]
  },
  optimization: {
    minimize: false
  },
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", exclude: /^(?!.*\.spec\.ts$).*\.ts$/ },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true }
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      // path.join(__dirname, "src"), // location of your src
      path.resolve(__dirname, '../src'),
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      // path.join(__dirname, "src"),
      path.resolve(__dirname, '../src'),
      {}
    )
  ]
}
