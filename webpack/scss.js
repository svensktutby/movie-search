module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader?sourceMap',
            'sass-loader?sourceMap',
            'import-glob-loader',
          ],
        },
      ],
    },
  };
};
