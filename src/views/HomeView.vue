<template>
  <div class="three">
    <!-- <p @click="jumpfunc('/AboutView')">这是首页</p> -->
  </div>
</template>

<script>
import * as THREE from "three";
// import { GLTFLoader } from 'three-gltf-loader';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

export default {
  data() {
    return {
      vale: 1.6,
      vale2x: 0,
      vale2y: -1,
      vale2z: 3,
    };
  },
  methods: {
    jumpfunc(url) {
      console.log("jumpfunc", url);
      this.$router.push("/about");
      // this.three1destory();
    },
    // 主函数
    three1() {
      const scene = new THREE.Scene();
      //----------镜头----------
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      camera.position.z = 10;
      //----------场景----------
      const renderer = new THREE.WebGLRenderer(); //创建场景
      renderer.setSize(window.innerWidth, window.innerHeight); //场景大小
      renderer.setClearColor("#9CD2F3", 1.0); //场景背景颜色
      document.body.appendChild(renderer.domElement); //场景创建于哪个元素

      // 导入模型公用函数
      function importModel(type, url, name2, jumpurl) {
        if (type === "gltf" || type === "glb") {
          console.log("加载gltf模型");
          //----------加载模型----------
          // 创建GLTFLoader实例
          const aaaloader = new GLTFLoader();
          // 使用loader来加载模型
          aaaloader.load(
            url,
            (gltf) => {
              // 加载成功后的处理逻辑
              scene.add(gltf.scene);
              gltf.scene.url = jumpurl;
              console.log(name2, gltf.scene);
            },
            undefined,
            (error) => {
              console.error(error);
            }
          );
        } else if (type === "obj") {
          console.log("加载obj模型"); //----------加载模型----------
          // 创建GLTFLoader实例
          const OBJloader = new OBJLoader();
          // 使用loader来加载模型
          OBJloader.load(
            url,
            (object) => {
              console.log(name2, object);
              // 加载成功后的处理逻辑
              scene.add(object);
            },
            undefined,
            (error) => {
              console.error(error);
            }
          );
        } else {
          console.log("模型格式不支持");
        }
      }

      // *******************obj加载器配置问题 √
      // *******************加载贴图问题 x
      // *******************设置外部模型大小
      // *******************悬浮显示模型内容
      // importModel("glb", "/scifi_girl_v.01/scene.gltf", "女孩gltf", "/about");
      // importModel("obj", "/obj/obj.obj", "枪obj");
      // importModel("glb", "/aaa/aaa.glb", "女孩glb");

      // 创建两个方块并添加到场景中
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube1 = new THREE.Mesh(geometry, material);
      cube1.position.set(0, 0, 0);
      cube1.url = "/about";
      scene.add(cube1);

      const geometry2 = new THREE.BoxGeometry(1, 1, 1);
      const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const cube2 = new THREE.Mesh(geometry2, material2);
      cube2.position.set(2, 0, 0);
      cube2.url = "/about";
      scene.add(cube2);

      // 点击事件
      // 创建一个射线投射器对象
      const raycaster = new THREE.Raycaster();
      // 创建一个用于存储鼠标位置的二维向量
      const pointer = new THREE.Vector2();
      var that = this;
      // 当鼠标移动时更新鼠标位置的函数
      function onPointerMove(event) {
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        console.log(pointer.x, pointer.y);
        // 通过摄像机和鼠标位置更新射线
        raycaster.setFromCamera(pointer, camera);

        // 计算物体和射线的焦点
        const intersects = raycaster.intersectObjects(scene.children);
        console.log(intersects);
        // console.log(intersects[0].object.url);
        // 点击物体时跳转到对应页面
        if (
          intersects.length > 0 &&
          intersects[0].object &&
          intersects[0].object.url
        ) {
          console.log(intersects[0].object.url);
          that.jumpfunc(intersects[0].object.url);
          renderer.dispose();
          // 销毁three1
          that.three1destory(renderer, scene, camera, controls, GUIbtns);
        }
      }

      // 当鼠标移动时触发更新鼠标位置的函数
      renderer.domElement.addEventListener("click", onPointerMove);

      //----------光源----------
      // 在HomeView.vue文件中添加光源到一个光点上
      // 创建一个光点的几何体
      const geometry1 = new THREE.SphereGeometry(1);
      // 创建一个基础材质
      const material1 = new THREE.MeshBasicMaterial({ color: 0xe3e5e9 });
      // 用几何体和材质创建一个网格对象
      const SpotLight = new THREE.Mesh(geometry1, material1);
      // 设置点光源的位置
      SpotLight.position.set(3, 3, 3); // 点光源放在x轴上

      // 创建一个点光源并将它添加到光点上
      const light = new THREE.PointLight(0xffffff, 150, 1000);
      SpotLight.add(light);
      // 将光点添加到场景中
      scene.add(SpotLight);

      // ----------使用GUI控制----------
      const GUIbtns = new GUI({ width: 500, height: 500 });
      GUIbtns.add(document, "title");
      GUIbtns.add(SpotLight.position, "x")
        .min(-10)
        .max(10)
        .step(1)
        .name("光源x");
      GUIbtns.add(SpotLight.position, "y")
        .min(-10)
        .max(10)
        .step(1)
        .name("光源y");
      GUIbtns.add(SpotLight.position, "z")
        .min(-10)
        .max(10)
        .step(1)
        .name("光源z");

      // ----------启用鼠标控制器----------
      const controls = new OrbitControls(camera, renderer.domElement);
      // 使用控制器
      controls.update();
      // 画布随窗口大小改变
      window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });

      //----------开始渲染----------
      function animate() {
        requestAnimationFrame(animate);
        // 使方块运动
        // camera.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    },
    // 销毁函数
    three1destory(renderer, scene, camera, controls, GUIbtns) {
      renderer.dispose(); // 销毁渲染器
      // 清空场景
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
      scene.remove(scene);

      // 释放相机和控制器相关资源
      camera = null;
      controls = null;

      // 销毁GUIbtns - 假设其有一个destroy方法
      GUIbtns.destroy();

      // 删除canvas
      const canvas = renderer.domElement;
      canvas.parentNode.removeChild(canvas); // 移除canvas元素
      renderer = null;
    },
  },
  mounted() {
    this.three1();
  },
  beforeDestroy() {
    this.three1destory();
  },
};
</script>

<style scoped>
</style>