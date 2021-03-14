/**
 * @author 侯欣榆
 * @date 2019-10-30 22:44
 * @Description:
 */
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

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
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
      // 将每个依赖包打包成单独的js文件
      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`;
              },
            },
          },
        },
        minimizer: [
          new UglifyPlugin({
            uglifyOptions: {
              warnings: false,
              drop_console: true, // console
              drop_debugger: true,
              pure_funcs: ['console.log'], // 移除console
            },
          }),
        ],

      };
      Object.assign(config, {
        optimization,
      });
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.css/,
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        }),
      );
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }
  }
  ,

};
