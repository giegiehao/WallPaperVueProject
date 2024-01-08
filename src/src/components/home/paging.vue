<template>
    <div v-if="showimg" class="demo-image__lazy" >

        <WallpaperInfoVue ref="wallpaperinfodate"></WallpaperInfoVue>
          <el-image v-for="(url,index) in photourls.data" :key="url" :src="url" lazy fit="cover" @click="WallpaperInfo(url)"/>
      <!-- <el-image v-for="(url,index) in urls" :key="url" :src="url" lazy fit="cover" :preview-src-list="urls" :initial-index="index"/> -->

    </div>
  </template>
  
  <script setup>
import axios from 'axios'
import { ref, watch } from 'vue';
import WallpaperInfoVue from '../wallpaperinfopage/index.vue'
import { wallPaper } from '../../api/photo';
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
    choose:Object
})

// 初次打开页面渲染“全部”图片
async function first(){
  photourls.value = await wallPaper("全部")
  showimg.value = true
}
first()


//监听choose的变化，当choose变化时更新图片内容，重新打请求
watch(props.choose,async (newchoose, oldchoose)=>{
    showimg.value = false
    console.log("更新图片内容："+ newchoose.date)
    photourls.value = await wallPaper(newchoose.date)
    showimg.value = true
    console.log(photourls.value)
})



  </script>
  
  <style scoped>
  .demo-image__lazy {
    height: 700px;
    display: flex;
    justify-content: center;
    margin: auto;
    flex-wrap: wrap;
    overflow-y: auto;
}
    
  .el-image {
    display: block;
    /* width: 400px; */
    height: 280px;
    margin: 20px 17px;
    margin-top: 20px ;
    /* min-height: 200px; */

    margin-bottom: 10px;
  }
  /* .demo-image__lazy .el-image:last-child {
    margin-bottom: 0;
  } */
  </style>
  