<script setup>
import {ref, watch, provide} from 'vue'
import WallpaperInfoVue from '../wallpaperinfopage/index.vue'
import { paginatedQueries, paginatedQueriesUpload } from '../../api/photo';
import { useUserStore,usePhotoStore } from '../../store/userstate';

const wallpaperinfodate = ref()
const showimg = ref(false)
const response = ref()
const userstroe = useUserStore()
const currentpage = ref(1)


const WallpaperInfo = (url) => {
     console.log(url)
     wallpaperinfodate.value.centerDialogVisible = true
     wallpaperinfodate.value.url = url
     usePhotoStore().currenUrl = url
}

const props = defineProps({
    page:Object
})

// 监听choose的变化，当choose变化时更新图片内容，重新打请求
// watch(props.page,async (newvalue, oldvalue) => {
//   console.log(newvalue.choose)
    // let photourls;
    // showimg.value = false
    // console.log("更新图片内容："+ newvalue.data + newvalue.choose)
    // if (newvalue.choose == "收藏品") {
    //   photourls = await paginatedQueries({page:newvalue.data, pageSize:10, userId:userstroe.userinfo.id})
    // }else if(newvalue.choose == "上传") {
    //   photourls = await paginatedQueriesUpload({page:newvalue.data, pageSize:10, userId:userstroe.userinfo.id})
    // }
    // showimg.value = true
    // console.log(photourls)
// },{
//   deep:true,
//   immediate:true
// })

const pageChange = async () => {
    showimg.value = false
    console.log("更新图片内容："+ currentpage.value + props.page.choose)
    if (props.page.choose == "收藏") {
      const { data } = await paginatedQueries({page:currentpage.value, pageSize:9, userId:userstroe.userinfo.id})
      console.log(data)
      response.value = data
    }else if(props.page.choose == "作品") {
      const { data } = await paginatedQueriesUpload({page:currentpage.value, pageSize:9, userId:userstroe.userinfo.id})
      console.log(data)
      response.value = data
    }
    showimg.value = true
    
}

pageChange()

provide('wallpaperinfopageclose', () => {
  //下架图片后关闭当前弹窗
  wallpaperinfodate.value.centerDialogVisible = false
  //让该urls置空/或者
})

</script>

<template>
    <div v-if="showimg" class="demo-image__lazy container">
        
      <WallpaperInfoVue ref="wallpaperinfodate"></WallpaperInfoVue>
      <el-image v-for="(url,index) in response.urls" :key="url" :src="url"  fit="cover" @click="WallpaperInfo(url)"/>
      <div style="display: flex;justify-content: center;align-items: center;width:100vw">
      <el-pagination v-if="response.urls.length > 0" style="margin: auto;" background  layout="prev, pager, next" :total="response.totalCount" :page-size="9" @current-change="pageChange()" v-model:current-page="currentpage"/>
      </div>
    </div>
</template>

<style scoped>
    .container{
        /* background-color: rgb(114, 58, 58); */
        width: 86vw;
        height: auto;
    }

  .demo-image__lazy {
    height: auto;
    display: flex;
    margin: auto;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;
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