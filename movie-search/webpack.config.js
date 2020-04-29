const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const scss = require('./webpack/scss');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const copy = require('./webpack/copy');
const images = require('./webpack/images');
const spriteSVG = require('./webpack/svg.sprite');
const favicon = require('./webpack/favicon');
const fonts = require('./webpack/fonts');
const lintJS = require('./webpack/js.lint');
const lintCSS = require('./webpack/scss.lint');
const babel = require('./webpack/babel');
const clean = require('./webpack/clean');

const NODE_ENV = process.env.NODE_ENV || 'development';

const PATH = {
  src: path.resolve(__dirname, './src/'),
  dist: path.resolve(__dirname, './dist/'),
};

const webpackConfig = merge(
  {
    mode: NODE_ENV,
    devtool: NODE_ENV === 'development' ? 'eval-sourcemap' : false,
    context: PATH.src,
    entry: {
      app: './app/index.js',
    },
    output: {
      path: PATH.dist,
      filename: './js/[name].[hash:8].js',
    },
    performance: {
      hints: NODE_ENV === 'production' ? 'warning' : false,
    },
    plugins: [
      new webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
      }),
    ],
    optimization: {
      // runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
  },
  babel(),
  pug(),
  images(),
  // spriteSVG(),
  fonts(),
  copy(),
  lintJS(),
  lintCSS(),
);

['index'].forEach((file) => {
  // webpackConfig.entry[file] = `./pages/${file}/${file}.js`;

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      favicon: './favicon.ico',
      filename: `${file}.html`,
      template: `./pages/${file}/${file}.pug`,
      // chunks: [file.replace(/-(\w)/g, (match, c) => c.toUpperCase()), 'common'],
      inject: true,
    }),
  );
});

module.exports = () => {
  if (NODE_ENV === 'production') {
    return merge([
      webpackConfig,
      clean(),
      extractCSS(),
      uglifyJS(),
      // favicon(),
    ]);
  }

  return merge([
    webpackConfig,
    devserver(),
    scss(),
    css(),
  ]);
};
