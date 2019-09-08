var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.0.48.88:8000/anti-bulling/bulling/api/bulling/',
        timeout:1800000,
        proxyTimeout:1800000
      }
    
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.less$/,
      loader: 'less-loader', // compiles Less to CSS
      options: {
        javascriptEnabled: true
    }
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
  ]
  }
};
