'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  watch:process.env.NODE_ENV !== 'production',
  entry:{
    './main':'./app/main.js',
    './map':'./app/map.js',
    './repl':'./app/repl.js',
  },
  output:{
    path:'./public/',
    filename:'[name].js',
  },
  module:{
    loaders:[{
      test:/\.js$/,
      exclude:/node_modules/,
      loader:'babel-loader',
    },{
      test:/\.scss$/,
      loader:ExtractTextPlugin.extract('style-loader','css!sass'),
    }]
  },
  plugins:[
    new ExtractTextPlugin('main.css'),
    new webpack.DefinePlugin({'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development')}),
  ],
};
