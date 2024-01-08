<template>
  <div style="min-height: 85vh;">
    <div v-if="showimg" class="demo-image__lazy" >

        <WallpaperInfoVue ref="wallpaperinfodate"></WallpaperInfoVue>
          <el-image v-for="(url) in photourls.data" :key="url" :src="url" lazy fit="cover" @click="WallpaperInfo(url)"/>
      <!-- <el-image v-for="(url,index) in urls" :key="url" :src="url" lazy fit="cover" :preview-src-list="urls" :initial-index="index"/> -->

    </div>
  </div>
  </template>
  
  <script setup>
import axios from 'axios'
import { ref, watch } from 'vue';
import WallpaperInfoVue from '../wallpaperinfopage/index.vue'
import { sortWallPaper } from '../../api/photo';
import { toRaw } from "@vue/reactivity";
import { usePhotoStore } from '../../store/userstate';

const photourls = ref({})
const showimg = ref(false)
const wallpaperinfodate = ref(null)

const WallpaperInfo = (url) => {
      console.log(url)
      wallpaperinfodate.value.centerDialogVisible = true
      wallpaperinfodate.value.url = url
      usePhotoStore().currenUrl = url
    }

  const props = defineProps({
      search:Object
  })

// 初次打开页面渲染搜索框中的标签的图片
// async function first(){
//   photourls.value = await wallPaper()
//   showimg.value = true
// }
// first()


//监听choose的变化，当choose变化时更新图片内容，重新打请求
watch(props.search,async (newvalue, oldvalue) => {
    showimg.value = false
    console.log("更新图片内容："+ newvalue.data)
    photourls.value = await sortWallPaper(newvalue.data)
    showimg.value = true
    console.log(photourls.value)
},{
  immediate:true
})

  </script>
  
  <style scoped>
  .demo-image__lazy {
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: center;
    margin: auto;
    flex-wrap: wrap;

}
    
  .el-image {
    display: block;
    height: 300px;
    margin: 20px 17px;
    margin-top: 20px ;
    /* min-height: 200px; */

    margin-bottom: 10px;
  }
  /* .demo-image__lazy .el-image:last-child {
    margin-bottom: 0;
  } */
  </style>