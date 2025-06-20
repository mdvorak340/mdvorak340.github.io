const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, './target'),
  },
  mode: 'production',
};
