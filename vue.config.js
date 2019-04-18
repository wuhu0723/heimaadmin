'use strict'
const path = require('path');

module.exports = {
  // publicPath: '/',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          // '@c': path.resolve(__dirname, './src/components')
        }
      },
    });
  },
  devServer: {//跨域
    port: 8081,// 端口号
    open: true, //配置自动启动浏览器
  },
  productionSourceMap: true

}