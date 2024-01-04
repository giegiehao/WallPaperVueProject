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

</script>

<template>

    <el-dialog
      v-model="centerDialogVisible"
      width="75%"
      style="height: auto;"
      align-center
      :show-close="false"
      :lock-scroll="false"
      :destroy-on-close="true"
      :open-delay="100"
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