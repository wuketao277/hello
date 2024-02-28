// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Web from './Web.vue'
import router from './router-web'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    Web
  },
  mounted: {
    window: addEventListener('hashchange', () => {
      var currentPath = window.location.hash.slice(1) // 获取输入的路由
      if (this.$router.path !== currentPath) {
        this.$router.push(currentPath) // 动态跳转
      }
    }, false)
  },
  template: '<Web/>'
})
