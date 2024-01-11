import axios from 'axios'
import { useUserStore } from '../store/userstate.ts'
import router from '@/components/router/index.js'

const baseURL = 'http://192.168.137.38:8080/wallPaper1_war_exploded'

//基础请求地址
const instance = axios.create({
    baseURL,
    timeout: 60000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  // 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 加上token
    const userstore = useUserStore();
    if (userstore.token) {
      config.headers.Authorization = userstore.token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
instance.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response.data.state == false) {
      ElMessage('登录已过期，请重新登录')
      useUserStore().logout()
      router.push("/login")
    }
    return response;
  }, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default instance
  export {baseURL}