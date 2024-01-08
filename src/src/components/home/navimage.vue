<template>
    <div class="demo-image">
        <!-- <el-image style="width: 100px; height: 60px; border-radius: 0 0 12px 12px;" :src="url" fit="fill" /> -->
        <h1 @click="toindex" style="cursor:pointer;">WallPaper</h1>
      </div>
  </template>
  
  <script setup>
import { ref } from 'vue';

  const url = ref('/src/assets/photo/navimage.jpg')

  defineOptions({
    methods:{
      toindex(){
      this.$router.push('/')
    }
    }
    
  })


//   const url = ref('/src/assets/photo/1694.jpg')
  </script>
  
  <style scoped>
h1{
  font-size: 39px;
  color: rgb(184, 199, 212);
}

  .demo-image .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
  }
  .demo-image .block:last-child {
    border-right: none;
  }
  .demo-image .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  </style>
  