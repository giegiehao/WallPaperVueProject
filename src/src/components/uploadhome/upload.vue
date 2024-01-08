<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ref, onMounted,computed } from 'vue'
import { type UploadProps, type UploadUserFile, type UploadInstance,  } from 'element-plus'
import tagsVue from './tags.vue'
import { useUserStore } from '../../store/userstate'

const uploadRef = ref<UploadInstance>()

const buttonShow = ref(false)

const userstore = useUserStore()

const orgtags = ref(null)

const tags = computed(() => orgtags.value?.tagstostring)


const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log("remove")
    if(uploadFiles.length == 0){
        buttonShow.value = false
    }else buttonShow.value = true
}

const handlePreview: UploadProps['onPreview'] = (file) => {
    // console.log(uploadRef.value)
  console.log(file)
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile)
    console.log(uploadFiles)

    if (uploadFile.size / 1024 / 1024 > 50) {
    // ElMessage.error('上传文件大小不能超过50M')
    message(uploadFile.name)
  }
    if(uploadFiles.length == 0){
        buttonShow.value = false
    }else buttonShow.value = true
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 50) {
    ElMessage.error('单个文件大小不能超过50M')
    return false
  }
  return true
}

const errorUpload: UploadProps['onError'] = (error, uploadFile, uploadFiles) => {
    console.log("上传出错")
}

const beforeRemove: UploadProps['beforeRemove'] = (UploadFile, UploadFiles) => {  

    return true
}

const message = (fileName) => {
  ElNotification({
    title: '文件超出大小',
    message:'文件' + fileName + ' 大小超过50M',
    type: 'error',
  })
}


const submitUpload = () => {
  uploadRef.value!.submit()
}


</script>



<template>

  <el-upload
    ref="uploadRef"
    drag
    class="upload-demo"
    action="http://192.168.137.153:8080/wallPaper1_war_exploded/wallpaper/create"
    :data="{userId:userstore.userinfo.id, tags:tags}"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-change="handleChange"
    :before-upload="beforeAvatarUpload"
    :on-error="errorUpload"
    :before-remove="beforeRemove"
    accept=".jpg,.png,.svg"
    list-type="picture"
    multiple
    :auto-upload="false"
    style="width: 100%;"
  >
  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
      
    </div>

  </el-upload>

  <div style="display: flex;flex-wrap: wrap;margin-top: 30px;margin-right: 50px;">
    <tagsVue ref="orgtags"></tagsVue>
    <div style="width: 100%;display: flex;justify-content: flex-end;margin-top: 30px;margin-right: 30px;">
  <el-button v-show="buttonShow" class="ml-3" type="success" size="large" @click="submitUpload">
      确认上传
    </el-button>
</div>
</div>
  <!-- <el-button @click="upload">上传</el-button> -->
</template>

<style scoped>
</style>