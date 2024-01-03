<script setup>
import { ref,watch,computed,onMounted,onBeforeUpdate,toRaw } from 'vue'
import { usePhotoStore,useUserStore } from '../../store/userstate';
import { uploaderInformation } from '../../api/user';
import { collectionWallPaper } from '../../api/photo';

const photostore = usePhotoStore()
const userstore = useUserStore()
const downloadUrl = ref()
const id = ref()
const uploaderinfor = ref();
// const uploaderinformation = ref(null)

//拿到原始图片url链接
const currenUrl = computed(() => photostore.currenUrl);

const getDate = async () => {
    uploaderinfor.value = await uploaderInformation(id.value)
    uploaderinfor.value = toRaw(uploaderinfor.value.data)
    console.log(uploaderinfor.value)
    // uploaderinfor = toRaw(uploaderinfor.data)
    // console.log(uploaderinfor)
}

//还是要做个监听,当收到新url时做个字符串拼接下载url
//找这个图片的上传者
const watchUrl = () => {
    id.value = currenUrl.value.split("=")[1]
    // console.log(id)
    downloadUrl.value = "http://192.168.137.211:8080/wallPaper1_war_exploded/downloadPhoto?photoId=" + id.value
    getDate()
}

watch(currenUrl, () => {
    // console.log(currenUrl.value)
    watchUrl()
    console.log(downloadUrl.value)
},{
    deep:true,
    immediate:true //首次触发
})

//点击收藏
const collection = async () => {
    // console.log(userstore.userinfo.id)
    const staus = await collectionWallPaper({userId:userstore.userinfo.id, photoId:id.value});
    if(staus.data == "1") {
        ElNotification({
            title: '收藏成功',
            message: '宝贝添加到您的收藏夹中',
            type: 'success',
            position: 'bottom-right',
  })
    } else{
        console.log("收藏失败")
    }
    
}

// console.log(url.value)

</script>

<template>
    <div class="container">
        <div class="left">
        <el-avatar 
            v-if="uploaderinfor"
            class="mr-3"
            :size="65"
            :src="'data:image/jpeg;base64,' + uploaderinfor.profilePhoto"
          />
          <h3 v-if="uploaderinfor" style="margin-left: 20px;margin-top: 15px;">{{ uploaderinfor.username }}</h3>
        </div>
        <div class="right">
            
            <el-button type="danger" size="large" :onclick="collection">
                <el-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                    <path fill="currentColor" d="m512 747.84 228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72zM313.6 924.48a70.4 70.4 0 0 1-102.144-74.24l37.888-220.928L88.96 472.96A70.4 70.4 0 0 1 128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 0 1 126.208 0l99.2 200.96 221.824 32.256a70.4 70.4 0 0 1 39.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 0 1-102.144 74.24L512 820.096l-198.4 104.32z"></path></svg>
                </el-icon>收藏
            </el-button>
            <el-button type="danger" size="large">
                <el-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M511.552 128c-35.584 0-64.384 28.8-64.384 64.448v516.48L274.048 570.88a94.272 94.272 0 0 0-112.896-3.456 44.416 44.416 0 0 0-8.96 62.208L332.8 870.4A64 64 0 0 0 384 896h512V575.232a64 64 0 0 0-45.632-61.312l-205.952-61.76A96 96 0 0 1 576 360.192V192.448C576 156.8 547.2 128 511.552 128M359.04 556.8l24.128 19.2V192.448a128.448 128.448 0 1 1 256.832 0v167.744a32 32 0 0 0 22.784 30.656l206.016 61.76A128 128 0 0 1 960 575.232V896a64 64 0 0 1-64 64H384a128 128 0 0 1-102.4-51.2L101.056 668.032A108.416 108.416 0 0 1 128 512.512a158.272 158.272 0 0 1 185.984 8.32z"></path></svg>
                </el-icon>点赞
            </el-button>
          <el-button style="margin-left: 20px;padding: 0px;" type="success" size="large" @click="download">
            <el-link style="display: flex;height: 40px;width: 95px;" :href=downloadUrl>
                <p style="margin: auto;">下载原图</p>
            </el-link>
        </el-button>
    </div>
    </div>
    
</template>

<style scoped>
.container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* line-height: 50px; */
}
.left{
    display: flex;
    /* align-items: center; */
    margin-left: 30px;
}

.right{
    margin-right: 30px;
}
</style>