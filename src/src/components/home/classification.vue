<script setup>
import { ref } from 'vue';

    const radio = ref("全部")

    // const chooseradio = () =>{
    //         console.log(radio)
    //     }

        const emit = defineEmits(['changechoose'])
//触发事件的函数，需要给绑定了该事件的函数传的值
        const chooseradio = () => {
             emit('changechoose', radio.value)
        }
</script>

<template>

<div class="container">
    <el-radio-group v-model="radio" size="large" fill="#000000" @change="chooseradio" >
      <el-radio-button class="radio" label="全部" />
      <el-radio-button class="radio" label="风景" />
      <el-radio-button class="radio" label="动物" />
      <el-radio-button class="radio" label="人物" />
      <el-radio-button class="radio" label="二次元" />
      
    </el-radio-group>
  </div>
</template>

<style scoped>

.container{
    width: 100vw;
    margin-top: 10px;
    margin-bottom: 30px;
}
.radio{
    margin: 15px;
    border: 3px solid rgba(158, 138, 138, 0.06);
    /* box-shadow: 2px 2px 1px 1px; */
}
</style>