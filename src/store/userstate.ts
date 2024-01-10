import { defineStore } from 'pinia'
import { watch, ref } from 'vue'
import { toRaw } from "@vue/reactivity";
import { userLoginService } from '@/api/user.ts'

export const useUserStore = defineStore('userstate', () => {
    const userinfo = ref()
    const token = ref("")

    const setToken = (tk) => {
        token.value = tk;
    }

    const removeToken = () => {
        token.value = "";
    }

    // const login = async (name, password) => {
    //     const { data } = await userLoginService(name,password)
    //     userinfo.value = data
    //     console.log(userinfo.value)
    // }

    async function login(name, password){
        const {data} = await userLoginService(name,password)
        console.log(data)
        // if (data.status == "true"){
        //     userinfo.value = data
        // }else{
        //     userinfo.value.status = "false";
        // }
            userinfo.value = data
            token.value = data.map.token
            // console.log(token.value)
        
        
        console.log(userinfo.value)
    }

    const logout = () => {
        userinfo.value = {}
        removeToken()
    }

    return {
        userinfo,
        login,
        logout,
        setToken,
        removeToken,
        token
    }
},{
    persist:true
})

export const usePhotoStore = defineStore('photoUrl', () => {
    const currenUrl = ref()

    return{
        currenUrl
    }
})