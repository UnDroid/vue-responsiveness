const path = require('path')

module.exports = {
  assetsDir: 'public',
  configureWebpack: {
    entry: {
      app: './src/main.js'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.scss', '.css'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'public': path.resolve(__dirname, './public'),
        'components': path.resolve(__dirname, './src/components'),
        'plugins': path.resolve(__dirname, './src/plugins'),
        'router': path.resolve(__dirname, './src/router'),
        'store': path.resolve(__dirname, './src/store'),
        'styles': path.resolve(__dirname, './src/styles'),
        'views': path.resolve(__dirname, './src/views'),
        '@': path.resolve(__dirname, './src')
      }
    }
  },

  publicPath: '/',
  outputDir: './dist',
  runtimeCompiler: false,
  productionSourceMap: false,
  parallel: true,

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~styles/global";'
      }
    },
    sourceMap: true
  },

  lintOnSave: undefined
}