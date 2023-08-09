# webpack-dart-sass-glob
Dart sass loader that enables the use of glob with webpack.

## Installation
```console
npm install -D webpack-dart-sass-glob
```

# Usage
**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader", "webpack-dart-sass-glob"],
      },
    ],
  },
};
```

**file.scss or file.sass**
```scss
@use "some/path/*";

// becomes
// @use "some/path/file1.scss";
// @use "some/path/file2.scss";
// ...

@use "some/path/*" as *;

// becomes
// @use "some/path/file1.scss" as *;
// @use "some/path/file2.scss" as *;
// ...

@forward "some/path/*";

// becomes
// @forward "some/path/file1.scss";
// @forward "some/path/file2.scss";
// ...
```
