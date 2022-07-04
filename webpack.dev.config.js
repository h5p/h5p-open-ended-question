var autoprefixer = require('autoprefixer');
var path = require('path');
const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  mode: nodeEnv,
  context: path.resolve(__dirname, 'src'),
  entry: "./entries/dev.js",
  output: {
    path: path.join(__dirname, '/build'),
    filename: "dev.js"
  },
  module: {
    loaders: [
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
  devServer: {
    port: 8052,
    contentBase: "./build",
    quiet: true,
  }
};
