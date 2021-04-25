
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    ForumsComponent: path.resolve(__dirname, 'src/components/forums/')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.production ? `bundle-[chunkHash].js` : `bundle.js`,
    // filename: process.env.production ? `bundle-[chunkHash].js` : `bundle-[hash].js`
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // получает имя, то есть node_modules/packageName/not/this/part.js
            // или node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // имена npm-пакетов можно, не опасаясь проблем, использовать 
           // в URL, но некоторые серверы не любят символы наподобие @
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png|ico)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use:{
          loader: 'url-loader?limit=100000'
        },
      },
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/images/btc.png"
    }),
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(process.env.PRODUCTION) || false,
      WEATHER_API_HOST_DEV: JSON.stringify("http://127.0.0.1:8000"),
      WEATHER_API_HOST_PROD: JSON.stringify(process.env.API_HOST),
    })
  ]
};