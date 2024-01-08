<script setup>
import navVue from '../home/nav.vue'
import radioVue from './radio.vue';
import { toRaw } from "@vue/reactivity";
import { useUserStore } from '../../store/userstate';
import {ref} from 'vue'
import { ElNotification } from 'element-plus'
import { h } from 'vue'

const uploadRef = ref()

const userinfo = useUserStore().userinfo
console.log(userinfo)

const editshow = ref(false)
const enter = () => {
  editshow.value = true
}
const leave = () => {
  editshow.value = false
}

const onSuccess = (response, file, fileList) => {
  console.log(response)
  //上传成功后重新加载头像
  userinfo.profilePhoto = response
  ElNotification({
    title: '成功',
    message: h('i', { style: 'color: teal' }, '头像更改成功'),
    offset: 45
  })
  uploadRef.value.clearFiles()
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 3) {
    ElNotification({
    title: '上传失败',
    message: h('i', { style: 'color: red' }, '头像大小不能超过3m'),
    offset: 45
  })
    return false
  }
  return true
}


</script>

<template>
  <div class="common-layout" >
    <el-container>
      <!-- <img :src="'data:image/*;base64,' + userinfo.profilePhoto"> -->
      <el-header class="header"><navVue></navVue></el-header>
      <el-main>
        <div class="avatar_border" @mouseenter="enter" @mouseleave="leave" >
          <div class="edit">
            <el-upload
              ref="uploadRef"
              accept=".jpg,.png,.svg"
              :data="{userId:userinfo.id}"
              class="upload-demo"
              style="margin-bottom: 500px;"
              action="http://192.168.137.153:8080/wallPaper1_war_exploded/user/avatar"
              :on-success="onSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <Edit style="position: relative;z-index: 1;width: 28px; height: 28px; margin-left: 95px; margin-top: 95px; cursor: pointer;" v-show="editshow"/>
            </el-upload>
          </div>
          <el-avatar 
            class="mr-3 avater"
            :size="120"
            :src="'data:image/jpeg;base64,' + userinfo.profilePhoto"
            alt="图片未上传"
          ><el-avatar> {{ userinfo.username }} </el-avatar></el-avatar>
          
        </div>
        <div class="main">
            <div style="margin-left: 85px;">
            <h1 style="font-size: 30px;  font-weight:bold;">{{userinfo.username}}</h1>
            <p style="margin-top: 20px;">加入December {{ userinfo.createTime }}</p>
            </div>
            <div class="radiomain">
                <radioVue></radioVue>
            </div>
        </div>
        </el-main>
    </el-container>
  </div>

</template>

<style scoped>
.radiomain{
    display: flex;
    flex-direction: column;
}
.avatar_border{
    background-color: rgb(255, 255, 255);
    width: 130px;
    height: 130px;
    border-radius: 130px;
    position: absolute;
    top: 160px;
    left: 100px;
  }
  .avater{
      position: absolute;
      margin: auto;
      top: 5px;
      left: 5px;
  }
.header{
  /* background: url("@/assets/photo/wallhaven-jxlwpm_2560x1440.png"); */
  background-color: rgb(63, 111, 78);
  background-size: cover;
  background-repeat: no-repeat;
  height: 240px;
  width: 100vw;
  padding: 0;
  /* z-index: 1; */
}


.main{
    margin-top: 60px;
}

</style>