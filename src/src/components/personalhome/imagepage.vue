<script setup>
import {ref} from 'vue'
import imageVue from './image.vue';

const currentpage = ref(1)
const props = defineProps({
  radio:String
})
const page = ref({data:currentpage.value,
                  choose:""})

  console.log(props.radio)

const pageChange = () => {
    //点击后发后端请求要page应该要展示的图片url，再通过图片渲染
    // console.log("页面改变了"+currentpage.value)
    // page.value.data = currentpage.value
    page.value.choose = props.radio
    // console.log(page.value.choose)
}

pageChange()


</script>

<template>
    
    <div class="example-pagination-block">
    <div class="example-demonstration">
        <imageVue :page="page"></imageVue>
    </div>
    <!-- <el-pagination background  layout="prev, pager, next" :total="100" :page-size="10" @current-change="pageChange()" v-model:current-page="currentpage"/> -->
  </div>
</template>

<style scoped>
.example-pagination-block{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>