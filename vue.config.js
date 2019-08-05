/**
 * Vue-CLI
 * Github Source-Code
 *  1. 加载入口
 *    https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/Service.js#L72
 *  2. 加载规则
 *    https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/Service.js#L274
 *  3. 配置规则
 *    https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/options.js#L3
 *  4. 默认配置
 *    https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/options.js#L62
 *
 * `vue.config.js` Configuration Document:
 *    https://cli.vuejs.org/zh/guide/webpack.html
 *
 * Configuration Options List:
 *    https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
 */

/**
 * 1. vue-cli 3 搭建的项目中路径相关问题
 *    https://segmentfault.com/a/1190000016120011
 * 2. vue-cli 3.0 特性速读
 *    https://juejin.im/post/5ad862c95188252eb3237752
 * 3. vue-loader 整合注意事项
 *    https://github.com/vuejs/vue-loader/blob/master/docs/zh/migrating.md
 */

const path = require('path')
const isProd = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.resolve(__dirname, dir)
}


module.exports = {
  lintOnSave: 'error',
  publicPath: isProd ? './' : '/', // 开发环境不需要 '/dist/' 前缀
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    extract: isProd, // 使用css分离插件 ExtractTextPlugin
    sourceMap: false,
    // loaderOptions: {},
    modules: false
  },
  // vue-cli 的 pwa 插件 @vue/cli-plugin-pwa => google => workbox
  //  https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  //  https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_generatesw_config
  // 使用 pwa 需要提供 SOCKET API 支持动态更新本地静态资源
  // pwa: {
  //   workboxPluginMode: 'GenerateSW',
  // },

  // vue-cli 配置源码
  //  https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/serve.js#L138
  devServer: {
    open: true, // process.platform === 'darwin',
    port: 8000,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  // webpack-chain https://github.com/neutrinojs/webpack-chain
  // vue-cli https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7
  chainWebpack: config => {
  config.module
    .rule('cur|ani')
    .test(/\.(cur|ani)$/)
    .use('file')
    .loader('file-loader')
    .options({
      name: 'cursors/[name].[ext]?[hash]',
      publicPath: './'
    })
},
  configureWebpack: {
  /* Configuration Error: Avoid modifying webpack output.publicPath directly. Use the "baseUrl" option instead. */
  /* output: {
    publicPath: '',
  }, */
  externals: {
    echarts: "echarts"
  },
  // https://webpack.docschina.org/configuration/resolve/#resolve
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('./src'),
      'components': resolve('./src/components'),
      'common': resolve('./src/common'),
      'store': resolve('./src/store'),
      'mixin': resolve('./src/mixin'),
      'directive': resolve('./src/directive'),
      'router': resolve('./src/router'),
      'assets': resolve('./src/assets'),
      'service': resolve('./src/service'),
      'views': resolve('./src/views'),
    }
  },
}
}
