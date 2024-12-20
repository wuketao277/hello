import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Index from '@/components/main/index/index.vue'
import ClientList from '@/components/main/client/clientlist/clientlist.vue'
import Client from '@/components/main/client/client/client.vue'
import UserList from '@/components/main/user/userlist/userlist.vue'
import User from '@/components/main/user/user/user.vue'
import CandidateList from '@/components/main/candidate/candidatelist/candidatelist.vue'
import Candidate from '@/components/main/candidate/candidate/candidate.vue'
import PRC from '@/components/main/prc/prc/prc.vue'
import PRCList from '@/components/main/prc/prclist/prclist.vue'
import Summary from '@/components/main/summary/summary.vue'
import MyNewsList from '@/components/main/mynews/mynewslist/mynewslist.vue'
import MyNews from '@/components/main/mynews/mynews/mynews.vue'
import MyTask from '@/components/main/mytask/mytask/mytask.vue'
import MyTaskList from '@/components/main/mytask/mytasklist/mytasklist.vue'
import MyPlan from '@/components/main/my/myplan/myplan.vue'
import HolidayList from '@/components/main/my/holiday/holidaylist/holidaylist.vue'
import Holiday from '@/components/main/my/holiday/holiday/holiday.vue'
import Role from '@/components/main/role/role/role.vue'
import RoleList from '@/components/main/role/rolelist/rolelist.vue'
import ClientLinkMan from '@/components/main/client/clientlinkman/clientlinkman.vue'
import ClientContract from '@/components/main/client/clientcontract/clientcontract.vue'
import Case from '@/components/main/case/case/case.vue'
import CaseList from '@/components/main/case/caselist/caselist.vue'
import FileList from '@/components/main/file/filelist.vue'
import SecurityApi from '@/api/security'
import PersonalInfo from '@/components/main/personalInfo/personalInfo.vue'
import SuccessfulPermList from '@/components/main/case/successfulPermList/successfulPermList.vue'
import SuccessfulPerm from '@/components/main/case/successfulPerm/successfulPerm.vue'
import SalarySpecialItem from '@/components/main/salary/salarySpecialItem/salarySpecialItem.vue'
import SalarySpecialItemList from '@/components/main/salary/salarySpecialItemList/salarySpecialItemList.vue'
import SalaryList from '@/components/main/salary/salaryList/salaryList.vue'
import Salary from '@/components/main/salary/salary/salary.vue'
import ReimbursementItem from '@/components/main/salary/reimbursementItem/reimbursementItem.vue'
import ReimbursementItemList from '@/components/main/salary/reimbursementItemList/reimbursementItemList.vue'
import ReimbursementSummaryList from '@/components/main/salary/reimbursementSummaryList/reimbursementSummaryList.vue'
import GeneralReport from '@/components/main/report/general/general.vue'
import LessonList from '@/components/main/training/lesson/lessonlist/lessonlist.vue'
import Lesson from '@/components/main/training/lesson/lesson/lesson.vue'
import StudyRecordList from '@/components/main/training/studyrecord/studyrecordlist/studyrecordlist.vue'
import StudyRecord from '@/components/main/training/studyrecord/studyrecord/studyrecord.vue'
import InvoiceList from '@/components/main/salary/invoiceList/invoiceList.vue'
import Invoice from '@/components/main/salary/invoice/invoice.vue'
import InterviewList from '@/components/main/interview/interviewList.vue'
import KPIWorkDaysAdjustList from '@/components/main/salary/kpiworkdaysadjustlist/kpiworkdaysadjustList.vue'
import KPIWorkDaysAdjust from '@/components/main/salary/kpiworkdaysadjust/kpiworkdaysadjust.vue'
import KPIList from '@/components/main/salary/kpiList/kpiList.vue'
import SearchCandidate from '@/components/main/candidate/searchcandidate/searchcandidate.vue'
import BigEventInfo from '@/components/main/bitEvent/bigEventInfo/bigEventInfo.vue'
import BigEventList from '@/components/main/bitEvent/bigEventList/bigEventList.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/background.html',
    name: 'index',
    component: Index,
    children: [{
      // 摘要信息
      path: '/background.html',
      name: 'summary',
      component: Summary
    },
    {
      // 面试列表
      path: '/background.html/interviewlist',
      name: 'InterviewList',
      component: InterviewList
    },
    {
      // 面试列表
      path: '/background.html/bigEvent/bigEventList',
      name: 'bigEventList',
      component: BigEventList
    },
    {
      // 面试列表
      path: '/background.html/bigEvent/bigEventInfo',
      name: 'bigEventInfo',
      component: BigEventInfo
    },
    {
      // 总报表
      path: '/background.html/report/general',
      name: 'GeneralReport',
      component: GeneralReport
    },
    {
      // 客户列表页
      path: '/background.html/client/clientlist',
      name: 'clientlist',
      component: ClientList
    },
    {
      // 新增客户
      path: '/background.html/client/client',
      name: 'client',
      component: Client
    },
    {
      // 用户列表页
      path: '/background.html/user/userlist',
      name: 'userlist',
      component: UserList
    },
    {
      // 新增用户
      path: '/background.html/user/user',
      name: 'user',
      component: User
    },
    {
      // 候选人列表页
      path: '/background.html/candidate/candidatelist',
      name: 'candidatelist',
      component: CandidateList
    },
    {
      // 新增候选人
      path: '/background.html/candidate/candidate',
      name: 'candidate',
      component: Candidate
    },
    {
      // 新增PRC
      path: '/background.html/prc/prc',
      name: 'prc',
      component: PRC
    },
    {
      // PRC列表页
      path: '/background.html/prc/prclist',
      name: 'prclist',
      component: PRCList
    },
    {
      // 我的新闻列表
      path: '/background.html/mynews/mynewslist',
      name: 'newslist',
      component: MyNewsList
    },
    {
      // 我的新闻
      path: '/background.html/mynews/mynews',
      name: 'news',
      component: MyNews
    },
    {
      // 我的任务
      path: '/background.html/mytask/mytask',
      name: 'mytask',
      component: MyTask
    },
    {
      // 我的任务列表
      path: '/background.html/mytask/mytasklist',
      name: 'mytasklist',
      component: MyTaskList
    },
    {
      // 我的计划
      path: '/background.html/my/myplan',
      name: 'myplan',
      component: MyPlan
    },
    {
      // 角色
      path: '/background.html/role/role',
      name: 'role',
      component: Role
    },
    {
      // 角色列表
      path: '/background.html/role/rolelist',
      name: 'rolelist',
      component: RoleList
    },
    {
      // 客户联系人
      path: '/background.html/client/clientlinkman',
      name: 'clientlinkman',
      component: ClientLinkMan
    },
    {
      // 客户合同
      path: '/background.html/client/clientcontract',
      name: 'clientcontract',
      component: ClientContract
    },
    {
      // 职位列表
      path: '/background.html/case/caselist',
      name: 'caselist',
      component: CaseList
    },
    {
      // 职位
      path: '/background.html/case/case',
      name: 'case',
      component: Case
    },
    {
      // 成功职位列表
      path: '/background.html/case/successfulPermList',
      name: 'successfulPermList',
      component: SuccessfulPermList
    },
    {
      // 成功职位
      path: '/background.html/case/successfulPerm',
      name: 'successfulPerm',
      component: SuccessfulPerm
    },
    {
      // 文件
      path: '/background.html/file/filelist',
      name: 'filelist',
      component: FileList
    },
    {
      // 个人信息
      path: '/background.html/personalInfo',
      name: 'personalInfo',
      component: PersonalInfo
    },
    {
      // 工资特殊项
      path: '/background.html/salary/salarySpecialItem',
      name: 'salarySpecialItem',
      component: SalarySpecialItem
    },
    {
      // 工资特殊项集合
      path: '/background.html/salary/salarySpecialItemList',
      name: 'salarySpecialItemList',
      component: SalarySpecialItemList
    },
    {
      // 工资集合
      path: '/background.html/salary/salaryList',
      name: 'salaryList',
      component: SalaryList
    },
    {
      // 工资
      path: '/background.html/salary/salary',
      name: 'salary',
      component: Salary
    },
    {
      // 报销项
      path: '/background.html/salary/reimbursementItem',
      name: 'reimbursementItem',
      component: ReimbursementItem
    },
    {
      // 报销列表
      path: '/background.html/salary/reimbursementItemList',
      name: 'reimbursementItemList',
      component: ReimbursementItemList
    },
    {
      // 报销汇总列表
      path: '/background.html/salary/reimbursementSummaryList',
      name: 'reimbursementSummaryList',
      component: ReimbursementSummaryList
    },
    {
      // 发票列表
      path: '/background.html/salary/invoiceList',
      name: 'invoiceList',
      component: InvoiceList
    },
    {
      // 发票
      path: '/background.html/salary/invoice',
      name: 'invoice',
      component: Invoice
    },
    {
      // 培训课程列表
      path: '/background.html/training/lessonlist',
      name: 'lessonlist',
      component: LessonList
    },
    {
      // 培训课程列表
      path: '/background.html/training/lesson',
      name: 'lesson',
      component: Lesson
    },
    {
      // 培训课程学习记录列表
      path: '/background.html/training/studyrecordlist',
      name: 'studyrecordlist',
      component: StudyRecordList
    },
    {
      // 培训课程学习记录
      path: '/background.html/training/studyrecord',
      name: 'studyrecord',
      component: StudyRecord
    }, {
      // kpi工作日调整
      path: '/background.html/salary/kpiworkdaysadjust',
      name: 'kpiworkdaysadjust',
      component: KPIWorkDaysAdjust
    },
    {
      // kpi工作日调整列表
      path: '/background.html/salary/kpiworkdaysadjustList',
      name: 'kpiworkdaysadjustList',
      component: KPIWorkDaysAdjustList
    },
    {
      // kpi历史记录列表
      path: '/background.html/salary/kpiList',
      name: 'kpiList',
      component: KPIList
    },
    {
      // 搜索候选人
      path: '/background.html/candidate/searchcandidate',
      name: 'searchcandidate',
      component: SearchCandidate
    },
    {
      // 假期记录
      path: '/background.html/holiday/holiday',
      name: 'holiday',
      component: Holiday
    },
    {
      // 假期记录列表
      path: '/background.html/holiday/holidaylist',
      name: 'holidaylist',
      component: HolidayList
    }
    ]
  },
  {
    // 登录页
    path: '/background.html/login',
    name: 'login',
    component: Login
  }
  ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    // 如果访问的不是登录页面，就通过接口检查服务器登录状态
    SecurityApi.checkLogin().then(res => {
      if (res.status === 200 && res.data) {
        // 如果服务器登录状态为true，就检查本地数据
        const loginInfo = window.localStorage['loginInfo']
        // 未登录状态；当路由到 nextRoute 指定页时，跳转至 UserLogIn
        if (loginInfo === 'null') { // 检测是否登录的页面
          next('/background.html/login')
        }
      } else {
        // 如果服务器登录状态为false，就跳转到登录业务
        next('/background.html/login')
      }
    })
  }
  next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})
export default router
