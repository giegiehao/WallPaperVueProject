<script setup>
import upload from './upload.vue';
import navVue from '../home/nav.vue';
import asideVue from './aside.vue';

</script>

<template>
  <div class="common-layout">
    <el-container style="background-color: rgb(81, 155, 122);height: 100vh;">
      <el-header class="header"><navVue></navVue></el-header>
      <el-main class="main">
  <div class="common-layout">
    <el-container style="overflow: hidden; position:fixed; top:0; bottom:0; left:0; right:0; margin-top: 120px;">
      <div style="height: 600px;overflow:hidden;align-items: center;"><el-aside width="20vw"><asideVue></asideVue></el-aside></div>
      <el-main style="overflow:auto;width: 60vw;"><upload></upload></el-main>
    </el-container>
  </div>
</el-main>
    </el-container>
  </div>
</template>

    
    


<style scoped>
.header{
    width: 100vw;
    padding: 0px
}

.main{
    margin-top: 60px;
}

</style>