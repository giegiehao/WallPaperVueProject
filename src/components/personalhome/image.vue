<script setup>
import {ref, watch} from 'vue'
import WallpaperInfoVue from '../wallpaperinfopage/index.vue'
import { paginatedQueries } from '../../api/photo';
import { useUserStore } from '../../store/userstate';

const wallpaperinfodate = ref(null)
const showimg = ref(false)
const urls = ref()
const userstroe = useUserStore()


const WallpaperInfo = (url) => {
     console.log(url)
     wallpaperinfodate.value.centerDialogVisible = true
     wallpaperinfodate.value.url = url
}

const props = defineProps({
    page:Object
})

//监听choose的变化，当choose变化时更新图片内容，重新打请求
watch(props.page,async (newvalue, oldvalue) => {
    showimg.value = false
    console.log("更新图片内容："+ newvalue.data)
    const photourls = await paginatedQueries({page:newvalue.data, pageSize:10, userId:userstroe.userinfo.id})
    showimg.value = true
    console.log(photourls)
},{
  deep:true,
  immediate:true
})

</script>

<template>
        <div v-if="showimg" class="demo-image__lazy container">
        
        <WallpaperInfoVue ref="wallpaperinfodate"></WallpaperInfoVue>
      <el-image v-for="(url,index) in urls" :key="url" :src="url" lazy fit="cover" @click="WallpaperInfo(url)"/>

    </div>
</template>

<style scoped>
    .container{
        background-color: rgb(255, 255, 255);
        width: 85vw;
        height: auto;
    }

  .demo-image__lazy {
    display: flex;
    margin: auto;
    margin-top: 20px;
    flex-wrap: wrap;
}
    
  .el-image {
    display: block;
    width: 400px;
    height: 220px;
    margin: auto;
    margin-top: 20px ;
    /* min-height: 200px; */

    margin-bottom: 10px;
  }

</style>