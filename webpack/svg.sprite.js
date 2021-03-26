const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /assets\/icons\/.*\.svg$/i,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'assets/img/sprite.svg',
                symbolId: 'sprite-[name]',
                runtimeCompat: true,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                svgo: {
                  enabled: isProd,
                  plugins: [
                    { removeViewBox: false },
                    { cleanupIDs: true },
                    { removeAttrs: { attrs: ['version'] } },
                    { removeUselessStrokeAndFill: false },
                    { convertPathData: false },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
    ],
  };
};
