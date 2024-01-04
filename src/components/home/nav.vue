<template>
        <nav style="display: flex;align-items: center;justify-content: space-between;">
          
  <navimage style="margin-left: 5vw;"></navimage>
  <div style="margin-right: 5vw; display: flex;">
    <el-button style="margin-right: 5px;" type="" text size="large" class="font2" @click="onUpload">上传</el-button>
    <el-button  v-if="!flag" type="success" round size="large" @click="login">登录/注册</el-button>
    <!-- <el-button type="success" round size="large" @click="personal">个人主页</el-button> -->
    

    <el-dropdown v-if="flag" size="large">
      <el-avatar style="margin-right: 8px;cursor:pointer;" :size="38" :src="'data:image/jpeg;base64,' + userinfo.profilePhoto" >
      <el-avatar> {{ userinfo.username }} </el-avatar>
    </el-avatar>
    
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :onclick="personal">个人主页</el-dropdown-item>
        <el-dropdown-item :onclick="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <h3 style="color: aliceblue;margin-top: 3px;" v-if="flag">{{ userinfo.username }}</h3>
  
  </div>
      </nav>
</template>

<script setup>
    import { useUserStore } from '../../store/userstate';
    import navimage from './navimage.vue';
    import { toRaw } from "@vue/reactivity";
    import { ref } from 'vue'

    const userinfo = useUserStore().userinfo 
    console.log(userinfo)

    const flag = ref(false)
    if(userinfo != undefined && userinfo.status == "true") {
      flag.value = true
    }

    defineOptions({
    methods:{
      login() {
        this.$router.push('/login')
      },
      personal() {
        this.$router.push('/personal')
      },
      onUpload() {
        const userstore = useUserStore()
        if(userstore.userinfo?.status != "true") {
          this.login()
        }else {
          this.$router.push('/upload')
      }
    },
      logOut() {
        const userstore = useUserStore()
        userstore.userinfo = undefined //置空登录信息
        this.$router.go(0)
      }
    }
  })

//   const onUpload = () => {
//     console.log("点击了上传按钮")
//   }
</script>