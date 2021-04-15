'use strict'
const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // This plugin extracts CSS into separate files. 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '', dir)
}

module.exports = {
  // 配置多入口
  entry: {
    index: resolve('app/main.js'),
    home: resolve('app/pages/home/index.js'),
    product: resolve('/app/pages/product/index.js'),
    about: resolve('/app/pages/about/index.js')
  },
  output: {
    path: resolve('build'),
    filename: '[name]/index.[hash].js', //这个主要作用是将打包后的js已hash值的编码方式来生成出来
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
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]'),
          esModule: false
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
          // { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            // options: {
            //   modules: { // 指定css模块化，似乎不使用与静态页面
            //     mode: 'local',
            //     exportGlobals: true,
            //     localIdentName: '[path][name]__[local]--[hash:base64:5]'
            //   }
            // }
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
    //在每一次编译前都清除output输出的路径  CleanWebpackPlugin的主要作用
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin('版权所有，翻版必究'),
    //HtmlWebpackPlugin配置
    new HtmlWebpackPlugin({
      template: resolve('app/index.tmpl.html') //new 一个这个插件的实例，并传入相关的参数
    }),
    new HtmlWebpackPlugin({
      title: '首页',
      template: resolve('app/pages/home/index.html'),
      filename: 'home.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      title: '产品',
      template: resolve('app/pages/product/index.html'),
      filename: 'product.html',
      chunks: ['product']
    }),
    new HtmlWebpackPlugin({
      title: '关于我们',
      template: resolve('app/pages/about/index.html'),
      filename: 'about.html',
      chunks: ['about']
    }),
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new MiniCssExtractPlugin()
  ],
}