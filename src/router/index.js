import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Index from '@/components/main/index/index.vue'
import ClientList from '@/components/main/client/clientlist/clientlist.vue'
import Client from '@/components/main/client/client/client.vue'
import CandidateList from '@/components/main/candidate/candidatelist/candidatelist.vue'
import Candidate from '@/components/main/candidate/candidate/candidate.vue'
import Summary from '@/components/main/summary/summary.vue'
import MyNewsList from '@/components/main/mynews/mynewslist/mynewslist.vue'
import MyNews from '@/components/main/mynews/mynews/mynews.vue'
import MyTask from '@/components/main/mytask/mytask/mytask.vue'
import MyTaskList from '@/components/main/mytask/mytasklist/mytasklist.vue'
import MyPlan from '@/components/main/my/myplan/myplan.vue'
import Role from '@/components/main/role/role/role.vue'
import RoleList from '@/components/main/role/rolelist/rolelist.vue'
import ClientLinkMan from '@/components/main/client/clientlinkman/clientlinkman.vue'
import Case from '@/components/main/case/case/case.vue'
import CaseList from '@/components/main/case/caselist/caselist.vue'
import SecurityApi from '@/api/security'

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
          path: '/client/client',
          name: 'client',
          component: Client
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
          path: '/mynews/mynewslist',
          name: 'newslist',
          component: MyNewsList
        },
        {
          // 我的新闻
          path: '/mynews/mynews',
          name: 'news',
          component: MyNews
        },
        {
          // 我的任务
          path: '/mytask/mytask',
          name: 'mytask',
          component: MyTask
        },
        {
          // 我的任务列表
          path: '/mytask/mytasklist',
          name: 'mytasklist',
          component: MyTaskList
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
        },
        {
          // 客户联系人
          path: '/client/clientlinkman',
          name: 'clientlinkman',
          component: ClientLinkMan
        },
        {
          // 职位列表
          path: '/case/caselist',
          name: 'caselist',
          component: CaseList
        },
        {
          // 职位
          path: '/case/case',
          name: 'case',
          component: Case
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
    // 如果访问的不是登录页面，就通过接口检查服务器登录状态
    SecurityApi.checkLogin().then(res => {
      if (res.status === 200 && res.data) {
        // 如果服务器登录状态为true，就检查本地数据
        const loginInfo = window.localStorage['loginInfo']
        // 未登录状态；当路由到 nextRoute 指定页时，跳转至 UserLogIn
        if (loginInfo === 'null') { // 检测是否登录的页面
          next('/login')
        }
      } else {
        // 如果服务器登录状态为false，就跳转到登录业务
        next('/login')
      }
    })
  }
  next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})
export default router
