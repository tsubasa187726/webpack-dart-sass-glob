const path = require("path");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const filePath = {
  sass: "./sass/",
  scss: "./scss/"
}

//SASS and SCSS files
const entries = WebpackWatchedGlobEntries.getEntries([
  path.resolve(__dirname, `${filePath.sass}**/*.sass`),
  path.resolve(__dirname, `${filePath.scss}**/*.scss`)
], {
  ignore: [
    path.resolve(__dirname, `${filePath.sass}**/_*.sass`),
    path.resolve(__dirname, `${filePath.scss}**/_*.scss`)
  ]
})();

module.exports = {
  mode: "development",
  entry: entries,
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "expanded",
              },
            },
          },
          path.resolve(__dirname, "../index.js")
        ]
      },
    ]
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
	]
}
