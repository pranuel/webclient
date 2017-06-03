var HtmlWebpackPlugin = require('html-webpack-plugin');
const Merge = require('webpack-merge');
var webpack = require('webpack');

const CommonConfig = require('./webpack.common.js');

module.exports = function(env) {
    return Merge(CommonConfig, {
        plugins: [
            new HtmlWebpackPlugin({
                baseUrl: '/',
                template: './index.ejs'
            })
        ]
  })
}