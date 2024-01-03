<template>
    <div style="background-color: rgb(255, 255, 255);border: 1px solid black; border-radius: 20px;opacity: 0.96;" class="fromdiv">
        <!-- <el-button @click="loginfrom"></el-button> -->
    
    <div style="margin: auto;" v-if="loginshow">
        <h1>登录 login</h1>
    <el-form
    ref="loginFormRef"
      label-position="top"
      label-width="100px"
      :model="logininfo"
      style="max-width: 460px"
      class="form"
      :rules="loginRules"
    >
      <el-form-item label="Name" label-width="110px" prop="name">
        <el-input placeholder="请输入用户名" v-model="logininfo.name" />
      </el-form-item>
      <el-form-item label="Password" label-width="110px" prop="password">
        <el-input type="password" show-password placeholder="请输入密码" v-model="logininfo.password" />
      </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitLoginForm(loginFormRef)" style="margin-left: 160px;">登录</el-button>
    </el-form-item>
    </el-form>
    <a @click="changefrom">还没有账号？点击注册</a>
</div>

<div style="margin: auto;" v-if="!loginshow">
        <h1>注册 register</h1>
    <el-form
    ref="registerFormRef"
      label-position="top"
      label-width="100px"
      :model="registerinfo"
      style="max-width: 460px"
      class="form"
      :rules="registerRules"
    >
      <el-form-item label="Name" label-width="110px" prop="name">
        <el-input placeholder="请输入用户名..." v-model="registerinfo.name" />
      </el-form-item>
      <el-form-item label="Email" label-width="110px" prop="email">
        <el-input placeholder="请提供邮箱..." v-model="registerinfo.email" />
      </el-form-item>
      <el-form-item label="Password" label-width="110px" prop="password">
        <el-input placeholder="请输入密码..." type="password" show-password v-model="registerinfo.password" />
      </el-form-item>
      <el-form-item label="Confirm Password" label-width="110px" prop="passwordAgain">
        <el-input placeholder="请确认密码..." type="password" show-password v-model="registerinfo.passwordAgain" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitRegisterForm(registerFormRef)" style="margin-left: 160px;">注册</el-button>
    </el-form-item>
    </el-form>
    <a @click="changefrom">返回登录</a>
</div>
</div>
  </template>

  <style scoped>

  .fromdiv{
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 420px;
    height: 520px;
  }
  .fromradio{
    /* width: 50px;
    height: 50px; */
    margin: auto;
    /* margin-bottom: 0px     ; */
  }
  .radio1{
    float: left;
    border-radius: 30px;
  }
  .radio2{
    float: left;
    /* margin-left: 60px; */
    border-radius: 20px;
    /* margin-top: -50px; */
  }
 

</style>
  
  <script lang="ts" setup>
 import { reactive, ref } from 'vue'
 import type { FormInstance, FormRules } from 'element-plus'
 import { userLoginService, userRegisterService } from "../../api/user"
 import { useUserStore } from '@/store/userstate'
 import router from '@/components/router/index.js'
 import { toRaw } from "@vue/reactivity";

 const loginFormRef = ref<FormInstance>()
 const registerFormRef = ref<FormInstance>()

 const index = () => {
        router.push('/')
      }
 defineOptions({
    methods:{
      
    }
  })

  
  const logininfo = ref({
    name: '',
    password: ''
  })

  const registerinfo = ref({
    name: '',
    email:'',
    password: '',
    passwordAgain: ''
  })


  const loginshow = ref(true)
  
  const changefrom = () => {
    loginshow.value = !loginshow.value
    
  }

  // const submitForm = (formRef) =>{

  // }

  const submitLoginForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    console.log(valid)
    if (valid) {
      const userstore = useUserStore()
      await userstore.login(logininfo.value.name, logininfo.value.password)
      const userinfo = useUserStore().userinfo;
      console.log(userinfo)
      // console.log('submit!')
      // const res = await userLoginService(logininfo.value.name, logininfo.value.password)
      // console.log(res.data)

      //如果登录成功则跳转到主页
      if(userinfo.status == "true") {
        ElMessage.success('登录成功')
        index()

      }else {
        ElMessage.error('账号或密码有误，请重新输入')
      }

      
    } else {
      ElMessage.error('请正确输入信息')
      return false
    }
  }
  )
}

const submitRegisterForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if(valid){
    const res = await userRegisterService(registerinfo.value.name, registerinfo.value.password, registerinfo.value.email)
    console.log(res.data)

    if (res.data == true){//注册成功 跳到登录界面保存这个name
      logininfo.value.name = registerinfo.value.name;
      changefrom()
      ElMessage.success('注册成功')
    }else if (res.data == "The account already exists"){//该用户名已存在
      ElMessage.error('该用户名已存在')
    }else {//注册失败
      ElMessage.error('注册失败')
    }
  }
  else {
    ElMessage.error('请正确输入信息')
    return false
  }
  })
}

const validatePass = (rule: any, value: any, callback: any) => {
  // console.log('value:'+value)
  if (value === '') {
    callback('Please input the password again')
    // callback(new Error('Please input the password again'))
  } else if (value !== registerinfo.value.password) {
    callback("Please enter the same password")
    // callback(new Error("Please enter the same password"))
  } else {
    callback()
  }
}

const registerRules = reactive<FormRules<typeof registerinfo>>({
  name: [{ required:true, message:'please input username', trigger: 'blur'}],
  email: [{ required:true, message:'please input email', trigger: 'blur'}],
  password: [{ required:true, message:'please input password', trigger: 'blur'},
            {min: 8,  message: 'Password must be no less than 8 digits', trigger: 'change'}],
  passwordAgain: [{ required:true, validator: validatePass, trigger: 'change'}]
})

  const loginRules = reactive<FormRules<typeof logininfo>>({
  name: [{ required:true, message:'please input username', trigger: 'blur'}],
  password: [{ required:true,message: 'Please input password', trigger: 'blur' }],
  // checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  // age: [{ validator: checkAge, trigger: 'blur' }],
})
  
  </script>

  
  