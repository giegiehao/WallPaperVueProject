<script setup>
import { ref, watch } from 'vue'
import headerVue from './header.vue'

const centerDialogVisible = ref(false)
const url = ref('')

// const props = defineProps({
//     url:String
// })

defineExpose({
    centerDialogVisible,
    url
})

//监听链接变化，给子组件传值
// watch(url, () => {
//   downUrl.value = url.value
//   console.log(url.value)
// })


// console.log(downUrl)

</script>

<template>

    <el-dialog
      v-model="centerDialogVisible"
      width="70%"
      style="height: auto;"
      align-center
      :show-close="false"
      :lock-scroll="false"
    >

    <template #header="{}">
      <div class="my-header">
        <headerVue></headerVue>
        
      </div>
    </template>
      
      <span>
        <el-image :src="url" class="image" fit="cover"></el-image>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <!-- <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button> -->
        </span>
      </template>
    </el-dialog>
  </template>

  <style scoped>
  </style>