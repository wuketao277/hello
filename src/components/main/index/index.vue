<template>
  <el-container style="height:100%;">
    <el-header style="background-color:#545c64;height:60px;padding:0px;text-align:left;font-size:25px;color:#fff;">
      <div style="float:left;height:100%;text-align:left;padding-left:10px;padding-top:5px;">
        <img src="/static/white-logo.png"
             style="width:100px;height:55px;">
      </div>
      <div style="float:left;height:100%;text-align:left;padding-left:65px;padding-top:20px;">
        <span>Hello Applicant</span>&nbsp;<span style="font-size:8px;">v{{version}}</span>
      </div>
      <div style="float:right;width:40px;margin-top:10px;">
        <el-button size="mini"
                   title="退出系统"
                   @click="logout"
                   icon="el-icon-switch-button"
                   circle></el-button>
      </div>
      <div style="float:right;width:400px;text-align:right;padding-top:8px;padding-right:10px;font-size:35px;">
        <span>Hi {{username}}</span>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width:180px;">
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 style="width:100%;height:100%;text-align:left;"
                 :router="true">
          <el-menu-item index="/background.html"
                        v-if="jobTypeControlShow('/')">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="/admin"
                      v-if="showControl('/admin')">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span slot="title">管理员</span>
            </template>
            <el-menu-item index="/background.html/report/general">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span slot="title">报表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/background.html/prc/prclist">
              <template slot="title">
                <i class="el-icon-magic-stick"></i>
                <span slot="title">PRC</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/background.html/interviewlist">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span slot="title">面试安排</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/background.html/client/clientlist"
                        v-if="jobTypeControlShow('/client/clientlist')">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">客户列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/background.html/case/caselist"
                        v-if="jobTypeControlShow('/case/caselist')">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span slot="title">职位列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/background.html/candidate/candidatelist"
                        v-if="jobTypeControlShow('/candidate/candidatelist')">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">候选人</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/background.html/candidate/searchcandidate"
                        v-if="jobTypeControlShow('/candidate/searchcandidate')">
            <template slot="title">
              <i class="el-icon-search"></i>
              <span slot="title">搜索候选人</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/background.html/case/successfulPermList"
                        v-if="jobTypeControlShow('/case/successfulPermList')">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">成功列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/background.html/file/filelist"
                        v-if="jobTypeControlShow('/file/filelist')">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">文件管理</span>
            </template>
          </el-menu-item>
          <el-submenu index="/background.html/salary"
                      v-if="jobTypeControlShow('/salary')">
            <template slot="title">
              <i class="el-icon-money"></i>
              <span slot="title">工资</span>
            </template>
            <el-menu-item index="/background.html/salary/salaryList">工资列表</el-menu-item>
            <el-menu-item index="/background.html/salary/salarySpecialItemList"
                          v-if="jobTypeControlShow('/salary/salarySpecialItemList')">工资特殊项列表</el-menu-item>
            <el-menu-item index="/background.html/salary/reimbursementSummaryList">报销列表</el-menu-item>
            <el-menu-item index="/background.html/salary/reimbursementItemList">报销项详情列表</el-menu-item>
            <el-menu-item v-if="showControl('/salary/invoiceList')"
                          index="/background.html/salary/invoiceList">业务发票</el-menu-item>
            <el-menu-item index="/background.html/salary/kpiworkdaysadjustList">KPI工作日调整列表</el-menu-item>
            <el-menu-item index="/background.html/salary/kpiList">KPI历史记录</el-menu-item>
          </el-submenu>
          <el-submenu index="/background.html/my"
                      v-if="jobTypeControlShow('/my')">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span slot="title">我的</span>
            </template>
            <el-menu-item index="/background.html/mynews/mynewslist"
                          v-if="jobTypeControlShow('/mynews/mynewslist')">我的新闻</el-menu-item>
            <el-menu-item index="/background.html/mytask/mytasklist"
                          v-if="jobTypeControlShow('/mytask/mytasklist')">我的任务</el-menu-item>
            <el-menu-item index="/background.html/holiday/holidaylist"
                          v-if="jobTypeControlShow('/holiday/holidaylist')">我的假期</el-menu-item>
            <!-- <el-menu-item index="/my/myplan/planlist">我的计划</el-menu-item> -->
          </el-submenu>
          <el-submenu index="/background.html/config"
                      v-if="jobTypeControlShow('/config')">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </template>
            <el-menu-item index="/background.html/user/userlist"
                          v-show="showControl('/user/userlist')">用户列表</el-menu-item>
            <el-menu-item index="/background.html/personalInfo">个人信息</el-menu-item>
          </el-submenu>
          <el-submenu index="/background.html/training"
                      v-if="showControl('/training')">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">培训与考核</span>
            </template>
            <el-menu-item index="/background.html/training/lessonlist">课程列表</el-menu-item>
            <el-menu-item index="/background.html/training/studyrecordlist">培训列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer style="background-color:#545c64;height:30px;padding-top:5px;">
      <el-link type="success"
               target="_blank"
               href="https://beian.miit.gov.cn">沪ICP备2022003281号-1</el-link>
    </el-footer>
  </el-container>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<script src="./index.js"></script>
