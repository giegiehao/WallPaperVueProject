<script setup>
// import router from '../router';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import paging from './searchWallPaper.vue';
    const router = useRouter();
    console.log('数据是：' ,router.currentRoute.value.query.params)

    const input = ref(router.currentRoute.value.query.params)
    const searchkey = ref({data:input.value})
    console.log( "searck:"+searchkey)
    const search = () => {
      searchkey.value.data = input.value;
    }


</script>

<template>
    

  <el-backtop :right="100" :bottom="100" />
    <div style="display: flex;flex-wrap: wrap;height: 100%;background-color:rgb(223, 220, 204);" >
    <el-input size="large" v-model="input" placeholder="搜索免费图片..." class="Search" :prefix-icon="Search" @keyup.enter="search(input)" />

    <paging :search="searchkey"></paging>
  </div>
</template>

<style scoped>
.Search{
  width: 500px;
  height: 40px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>