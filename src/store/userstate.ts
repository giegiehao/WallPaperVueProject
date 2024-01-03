import { defineStore } from 'pinia'
import { watch, ref } from 'vue'
import { toRaw } from "@vue/reactivity";
import { userLoginService } from '@/api/user.ts'

export const useUserStore = defineStore('userstate', () => {
    const userinfo = ref([])

    // const login = async (name, password) => {
    //     const { data } = await userLoginService(name,password)
    //     userinfo.value = data
    //     console.log(userinfo.value)
    // }

    async function login(name, password){
        const {data} = await userLoginService(name,password)
        console.log(data)
        if (data.status == "true"){
            userinfo.value = data
        }else{
            userinfo.value.status = "false";
        }
        
        console.log(userinfo.value)
    }

    return {
        userinfo,
        login
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