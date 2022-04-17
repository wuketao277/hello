<template>
  <el-container style="height:100%;">
    <el-header
      style="background-color:#545c64;height:40px;padding:0px;text-align:left;font-size:25px;color:#fff;"
    >
      <div style="float:left;height:100%;text-align:left;padding-left:20px;">
        <span>Hello System</span>
      </div>
      <div
        style="float:right;width:50%;text-align:right;padding-top:4px;padding-right:20px;"
      >
        <span>Hi {{username}}</span>
        <el-button
          type="text"
          title="退出系统"
          @click="logout"
          style="cursor:pointer;color:white;"
        >Logout</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width:160px;">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="width:100%;height:100%;text-align:left;"
          :router="true"
        >
          <el-menu-item index="/">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">主页</span>
            </template>
          </el-menu-item>
          <el-submenu index="1" v-if="showControl('/report')">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">报表</span>
            </template>
            <el-menu-item index="/report/general">总报表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">客户</span>
            </template>
            <el-menu-item index="/client/clientlist">客户列表</el-menu-item>
            <el-menu-item index="/client/client">新增客户</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span slot="title">职位</span>
            </template>
            <el-menu-item index="/case/caselist">职位列表</el-menu-item>
            <el-menu-item index="/case/case">新增职位</el-menu-item>
            <el-menu-item index="/case/successfulPermList">成功职位列表</el-menu-item>
            <el-menu-item index="/case/successfulPerm">成功职位</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">候选人</span>
            </template>
            <el-menu-item index="/candidate/candidatelist">候选人列表</el-menu-item>
            <el-menu-item index="/candidate/candidate">新增候选人</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span slot="title">我的</span>
            </template>
            <el-menu-item index="/mynews/mynewslist">我的新闻</el-menu-item>
            <el-menu-item index="/mytask/mytasklist">我的任务</el-menu-item>
            <!-- <el-menu-item index="/my/myplan/planlist">我的计划</el-menu-item> -->
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">文件管理</span>
            </template>
            <el-menu-item index="/file/filelist">文件管理</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-money"></i>
              <span slot="title">工资</span>
            </template>
            <el-menu-item index="/salary/salaryList">工资列表</el-menu-item>
            <el-menu-item index="/salary/salarySpecialItemList">工资特殊项列表</el-menu-item>
            <el-menu-item
              index="/salary/salarySpecialItem"
              v-show="showControl('/salary/salarySpecialItem')"
            >工资特殊项</el-menu-item>
            <el-menu-item index="/salary/reimbursementSummaryList">报销发放列表</el-menu-item>
            <el-menu-item index="/salary/reimbursementItemList">报销项详情列表</el-menu-item>
            <el-menu-item index="/salary/reimbursementItem">报销项</el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </template>
            <el-menu-item index="/user/userlist" v-show="showControl('/user/userlist')">用户列表</el-menu-item>
            <el-menu-item index="/personalInfo">个人信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<script src="./index.js"></script>
