import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Index from '@/components/main/index/index.vue'
import ClientList from '@/components/main/client/clientlist/clientlist.vue'
import AddClient from '@/components/main/client/addclient/addclient.vue'
import CandidateList from '@/components/main/candidate/candidatelist/candidatelist.vue'
import Candidate from '@/components/main/candidate/candidate/candidate.vue'
import Summary from '@/components/main/summary/summary.vue'
import NewsList from '@/components/main/my/mynews/newslist/newslist.vue'
import News from '@/components/main/my/mynews/news/news.vue'
import MyTask from '@/components/main/my/mytask/mytask.vue'
import MyPlan from '@/components/main/my/myplan/myplan.vue'
import Role from '@/components/main/role/role/role.vue'
import RoleList from '@/components/main/role/rolelist/rolelist.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          // 摘要信息
          path: '/',
          name: 'summary',
          component: Summary
        },
        {
          // 客户列表页
          path: '/client/clientlist',
          name: 'clientlist',
          component: ClientList
        },
        {
          // 新增客户
          path: '/client/addclient',
          name: 'addclient',
          component: AddClient
        },
        {
          // 候选人列表页
          path: '/candidate/candidatelist',
          name: 'candidatelist',
          component: CandidateList
        },
        {
          // 新增候选人
          path: '/candidate/candidate',
          name: 'candidate',
          component: Candidate
        },
        {
          // 我的新闻列表
          path: '/my/mynews/newslist',
          name: 'newslist',
          component: NewsList
        },
        {
          // 我的新闻
          path: '/my/mynews/news',
          name: 'news',
          component: News
        },
        {
          // 我的任务
          path: '/my/mytask',
          name: 'mytask',
          component: MyTask
        },
        {
          // 我的计划
          path: '/my/myplan',
          name: 'myplan',
          component: MyPlan
        },
        {
          // 角色
          path: '/role/role',
          name: 'role',
          component: Role
        },
        {
          // 角色列表
          path: '/role/rolelist',
          name: 'rolelist',
          component: RoleList
        }
      ]
    },
    {
      // 登录页
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  debugger
  if (to.name !== 'login') {
    const loginInfo = window.localStorage['loginInfo']
    // 未登录状态；当路由到 nextRoute 指定页时，跳转至 UserLogIn
    if (typeof (loginInfo) === 'undefined') { // 检测是否登录的页面
      next('/login')
      return
    }
  }
  next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})
export default router
