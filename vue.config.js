const { defineConfig } = require('@vue/cli-service')
// const THREE = require('three'); // 添加这一行
// const GLTFLoader = require('three-gltf-loader');
// const OBJLoader = require('three-obj-loader');

module.exports = defineConfig({
  transpileDependencies: [
    'three',
    'vue-echarts',
    'resize-detector'
  ],
  // chainWebpack: config => {
  //   config.module
  //     .rule('gltf')
  //     .test(/\.(glb|gltf)$/)
  //     .use('three-gltf-loader')
  //     .loader('three-gltf-loader')
  //     .end()
  //     .rule('obj')
  //     .test(/\.(obj)$/)
  //     .use('OBJLoader')
  //     .loader('OBJLoader')
  //     .end()
  //   return config;
  // }
})
