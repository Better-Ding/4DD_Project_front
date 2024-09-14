import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '',
        redirect: 'index',

    },

    {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
    },

    
]

export default new Router({
    mode: 'hash', // 去掉url中的#
    routes: constantRoutes
  })
  