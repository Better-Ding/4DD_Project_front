const { defineConfig } = require('@vue/cli-service')
// const port = process.env.port || process.env.npm_config_port || 80 // 端口
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  devServer:{
    host: '0.0.0.0',
    port: 2423,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/' // 把/api 换成 /
        }
      }
    },
  },
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // lintOnSave: process.env.NODE_ENV === 'development',
  // webpack-dev-server 相关配置
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 9000,
  //   open: true,
  //   // 代理
  //   // proxy: {
  //   //   target: `http://114.55.87.45:5000`,
  //   //   changeOrigin: true,
  //   // },
  // },
  chainWebpack: config => {
    config
      .module
      .rule('csv')
      .test(/\.csv$/)
      .use('csv-loader')
      .loader('csv-loader')
      .options({
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      })
      .end()
  }
})
