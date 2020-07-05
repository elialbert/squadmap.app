// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        "loose": true,
        "modules": 'commonjs'
      },
    ],
  ],
};