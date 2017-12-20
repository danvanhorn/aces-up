const path = require('path');

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, '..','..','java','assets','js'),
      publicPath: 'dist',
      filename: 'main.bundle.js'
    },
    
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [[
              'env', { modules: false }
            ]]
          }
        }]
      }]
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src')
      ]
    }
  };

  module.exports = config;