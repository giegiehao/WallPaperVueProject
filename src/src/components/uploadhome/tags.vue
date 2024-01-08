<script setup>
import { ref, render, h, nextTick,watch } from 'vue'
import { ElTag } from 'element-plus'

// const checked = ref(false)
const tags = ref([])
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()
const tagstostring = ref("")

//监听tags数组变化，有变化后拼接成新的字符串
watch(tags.value, () => {
  tagstostring.value = ''
  //遍历数组拼接
  for(let i= 0; i< tags.value.length; i++){
    tagstostring.value += tags.value[i]
    if (i != tags.value.length-1){
      tagstostring.value += ","
    }
    
  }
  console.log(tagstostring.value)
  
},{
  deep:true
})

defineExpose({
  tagstostring
})


const clickTag = (event) => {
    // console.log("点击了tag" + event.target.textContent)
    // let tagsbox = document.getElementsByClassName("tagsbox")[0];
    if(!tags.value.includes(event.target.textContent)){
        tags.value.push(event.target.textContent)
    }
    
    console.log(tags.value)
}

const closeTag = (event) => {
    tags.value.splice(tags.value.indexOf(event.currentTarget.previousElementSibling.textContent), 1)

    // console.log(event.currentTarget.previousElementSibling)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    // console.log(ref.value)
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value && !tags.value.includes(inputValue.value)) {
    if (inputValue.value.length > 10){
        ElNotification({
    title: '文字超出长度',
    message:'标签文字长度不能超过10个字符',
    type: 'error',
  })
    }else if(tags.value.length > 10){
        ElNotification({
    title: '标签超出个数',
    message:'标签个数不能超过10个',
    type: 'warning',
  })
    }
    else{
        tags.value.push(inputValue.value)
  }
}
  inputVisible.value = false
  inputValue.value = ''
}


</script>

<template>

    <div class="tagsdiv">
        <p>标签</p>
        <!-- <el-check-tag :checked="checked" @change="onChange" 
      class="radius" closable="true">风景</el-check-tag> -->

        <div class="tagsbox">
            <el-tag
    v-for="tag in tags"
    :key="tag"
    class="mx-1"
    closable
    @close="closeTag"
    style="margin: 10px 5px;"
  >
    {{ tag }}
  </el-tag>
  <el-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-1 w-20"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
    style="width: 80px; margin: 10px 5px; height: 25px;"
  />
  <el-button style="margin: 10px 5px;" v-else class="button-new-tag ml-1" size="small" @click="showInput">
    + New Tag
  </el-button>
        </div >
        <p style="margin-top: 10px;">可选</p>
        <div class="tagsbox1">
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">风景</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">动物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">植物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">二次元</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">动漫</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>
      <el-tag class="mx-1 tag"  effect="plain" @click="clickTag">人物</el-tag>


    </div>


    </div>
</template>

<style scoped>
.tagsdiv{
/* background-color: aliceblue; */
width: 100%;
margin-top: 20px;
}

.tagsbox{
    /* border: 1px solid ; */
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    margin: auto;
}

.tagsbox1{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
}

p{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
}

.tag{
    margin: 10px 3px;
}

</style>