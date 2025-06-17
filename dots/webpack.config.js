const path = require('path');

module.exports = {
  entry: './src/scripts.js',
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, '.'),
  },
  mode: 'production',
};
