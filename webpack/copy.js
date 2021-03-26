const CopyPlugin = require('copy-webpack-plugin');

module.exports = function () {
  return {
    plugins: [
      new CopyPlugin([
        {
          from: 'assets/css/preloader.css',
          to: './css/[name].[ext]',
        },
        // {
        //   from: 'assets/audio/*',
        //   to: './',
        //   // to: '[1]-[2].[hash].[ext]',
        //   test: /([^/]+)\/(.+)\.mp3$/,
        // },
      ]),
    ],
  };
};
