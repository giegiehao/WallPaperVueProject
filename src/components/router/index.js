import  { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../home/index.vue'
import Login from '../login/index.vue'
import PersonalHome from '../PersonalHome/index.vue'
import Upload from '../uploadhome/index.vue'
import SearchPage from '../searchpage/index.vue'

// const routers = [{
//     path: '/',
//     component: Home
// }]

const router = createRouter({
    history:createWebHashHistory(),
    routes:[{
        path: '/',
        name:'home',
        component: Home
    },
{
    path:'/login',
    // name:'login',
    component: Login
},
{
    path:'/personal',
    component: PersonalHome
},
{
    path:'/upload',
    component: Upload
},{
    path:'/search',
    component: SearchPage
}
    
]
})

export default router