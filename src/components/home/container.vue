<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import navimage from './navimage.vue'
import paging from './paging.vue'
import classification from './classification.vue'
import navVue from './nav.vue'
import { sortWallPaper } from '@/api/photo.ts'
import router from '../router';

const input = ref('')
const date = new Date();

const choose = ref({date:"全部"})

// const login = () => {
//   this.$router.push('/login')

const changechoose = (value) => {
  choose.value.date = value
}

// const search = async () => {
//   console.log(input.value)
//   if (input.value != "") {
//     const sortinfo =await sortWallPaper(input.value)
//     console.log(sortinfo)
//     router.push({
//       path: '/search' ,
//       query: {params: JSON.stringify({id: 1, name: 'xiaoming'})}
//     })
//   }
// }

defineOptions({
  methods:{
    async search(tags) {
      console.log(tags)
      if (tags != "") {
      this.$router.push({
        path: '/search' ,
        query: {params: tags}
      })

  }
    }
  }
})
  
</script>

<template>
  <el-backtop :right="100" :bottom="100" />
  <div class="common-layout" >
    <el-container>
      <el-header class="header">
        <navVue></navVue>
        <div class="center">
          <p class="font">创作者分享的最佳免费素材照片。</p>
          <el-input size="large" v-model="input" placeholder="搜索免费图片..." class="Search" :prefix-icon="Search" @keyup.enter="search(input)" />
          <p class="font1">今日-{{ date.getFullYear() }}-{{ date.getUTCMonth()+1 }}-{{ date.getDate() }}</p>
        </div>
      </el-header>
      <el-main style="overflow: hidden; text-align: center;" >
        <classification @changechoose="changechoose"></classification>
        <paging :choose="choose"></paging>
      </el-main>
      <el-footer>
        <el-divider />
        <navimage style="margin-left: 70px;"></navimage>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>

.header{
  background: url("@/assets/photo/wallhaven-jxlwpm_2560x1440.png");
  background-size: cover;
  background-repeat: no-repeat;
  /* background-position: center; */
  /* background-attachment:fixed; */
  height: 450px;
  width: 100vw;
  padding: 0;
}

.font{
  color: aliceblue;
  font-size: 33px;
  width: 500px;
  margin-bottom: 30px;
}
.font1{
  color: aliceblue;
  font-size: 18px;
  margin-top: 20px;
  width: 500px;
  margin-bottom: 40px;
}
.font2{
  font-size: 16px;
}
.center{
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Search{
  width: 500px;
}


</style>
