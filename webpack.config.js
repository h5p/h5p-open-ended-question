const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const libraryName = process.env.npm_package_name;
const autoprefixer = require('autoprefixer');
const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  mode: nodeEnv,
  context: path.resolve(__dirname, 'src'),
  entry: "./entries/dist.js",
  output: {
    path: path.join(__dirname, '/dist'),
    filename: `${libraryName}.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src/scripts"),
          path.resolve(__dirname, "src/entries")
        ],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src/scripts"),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ],
              },
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${libraryName}.css`
    })
  ]
};
