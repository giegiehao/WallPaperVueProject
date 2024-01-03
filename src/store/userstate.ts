import { defineStore } from 'pinia'
import { watch, ref } from 'vue'
import { toRaw } from "@vue/reactivity";

export const useUserStore = defineStore('userstate', () => {
    const userinfo = ref()
    const loginFlag = ref(false)

    return {
        userinfo,
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