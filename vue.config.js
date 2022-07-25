var path = require('path')
const { defineConfig } = require('@vue/cli-service')
const vueSrc = './src'
module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, vueSrc),
      },
    },
  },
  transpileDependencies: true,
})
