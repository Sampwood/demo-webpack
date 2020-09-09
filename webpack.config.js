'use strict'
const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
  return path.join(__dirname, '', dir)
}

module.exports = {
  entry: './app/main.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      '@': resolve('app')
    }
  },
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    contentBase: './public',
    // publicPath: '/public',
    historyApiFallback: true, //不跳转
    inline: true, // 刷新浏览器页面
    hot: true // 重新加载改变的部分，不会刷新页面（优先级高，HRM失败则刷新页面）
  },

  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          }
        ],
        include: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     esModule: true,
          //   },
          // },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          },
          {
            loader: "postcss-loader",
            // options: {
            //   sourceMap: true,
            //   config: {
            //     path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
            //   }
            // }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template:resolve('/app/index.tmpl.html') //new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new MiniCssExtractPlugin()
  ],
}