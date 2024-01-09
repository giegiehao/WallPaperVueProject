<script setup>
import { ref } from 'vue'
import imagepageVue from './imagepage.vue'

    const chooseradio = ref({radio:"作品"})
    const flag = ref(true)

    const changeChoose = () =>{
        console.log("点击了单选框"+chooseradio.value.radio)
        flag.value = !flag.value 
    }
</script>

<template>
    <div style="margin-top: 20px;display: flex;justify-content: flex-end;margin-right: 70px;">
    <el-radio-group  v-model="chooseradio.radio" @change="changeChoose" fill="#00ab6b">
      <el-radio-button label="作品" />
      <el-radio-button label="收藏" />
    </el-radio-group>
  </div>
  <div v-show="flag"><imagepageVue radio="作品"></imagepageVue></div>
  <div v-show="!flag"><imagepageVue radio="收藏"></imagepageVue></div>
  
</template>