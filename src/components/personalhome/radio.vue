<script setup>
import { ref } from 'vue'
import imagepageVue from './imagepage.vue'

    const chooseradio = ref("作品")

    const changeChoose = () =>{
        console.log("点击了单选框"+chooseradio.value)
    }
</script>

<template>
    <div style="margin-top: 20px;display: flex;justify-content: flex-end;margin-right: 70px;">
    <el-radio-group  v-model="chooseradio" @change="changeChoose" fill="#00ab6b">
      <el-radio-button label="作品" />
      <el-radio-button label="收藏品" />
    </el-radio-group>
  </div>
  <imagepageVue></imagepageVue>
</template>