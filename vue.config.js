const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === 'production' ? '/views/' : '/'
module.exports = {
  lintOnSave: false,
  baseUrl: BASE_URL,
  // 配置路径替代符号
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成map文件
  productionSourceMap: false,
  // 跨域
  devServer: {
    // proxy: 'http://localhost:10000'
  }
}
