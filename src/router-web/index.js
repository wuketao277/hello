import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/web/index/index.vue'
import Home from '@/components/web/home/home.vue'
import Us from '@/components/web/us/us.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: Index,
    children: [{
      // 首页
      path: '/',
      name: 'home',
      component: Home
    }, {
      // 关于我们
      path: '/us',
      name: 'us',
      component: Us
    }]
  }]
})
export default router
