/**
 * @author 侯欣榆
 * @date 2019-10-30 22:44
 * @Description:
 */

module.exports = {
  publicPath: './',
  devServer: {
    port: 8888, // 端口

    proxy: {
      '/cgi': {
        target: 'http://192.168.3.242:30421', // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/cgi': '/cgi',
        },
      },
    },
  },
};
