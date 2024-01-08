<template >
    <router-View v-if="isRouterAlive"></router-View>
</template>

<script>
import { provide } from 'vue'
export default {
    name:'app',
    mounted(){
        this.$router.push('/')
    },

    data() {
        return {
            isRouterAlive: true
        }
    },

    // provide("aaa", ()=>{
    //     reload: this.reload
    // }),

    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(function(){
                this.isRouterAlive = true
            })
        }
    }
}
</script>

