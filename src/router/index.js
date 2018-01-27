import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: resolve => require(['../views/Login.vue'], resolve)
        },
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['../views/Test.vue'], resolve)
        },
        {
            path: '/',
            name: 'home',
            component: resolve => require(['../views/Home.vue'], resolve)
        },
        {
            path: '/log',
            name: 'log',
            component: resolve => require(['../views/Log.vue'], resolve)
        }
    ]
})