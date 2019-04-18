import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Layout,
        // redirect: '/index',
        name: 'mainindex',
        // children: [{

        // }]
    }]

})