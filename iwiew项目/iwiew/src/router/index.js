import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            meta: {
                title: '猪仔音乐'
            }, 
            name: 'shouye', component: () => import('@/views/shouye.vue')
        },
    ]
})



export default router 