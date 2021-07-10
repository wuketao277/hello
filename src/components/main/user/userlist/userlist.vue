<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="addUser">新增</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modifyUser">修改</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detailUser">查看</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh-left" @click="query(true)">刷新</el-button>
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item label="" style="margin-bottom:0px;">
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="sureSearchDialog" placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" icon="el-icon-search" v-if="showSearchResult" @click="query">取消搜索</el-button>
    </div>
    <el-form
      v-if="search.show"
      style="border:1px solid black;"
      ref="form"
      :model="search"
      label-width="80px"
    >
      <el-form-item label="登录名">
        <el-input v-model="search.ussername"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="search.realname"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="table.content"
      @current-change="handleCurrentChange"
      :border="true"
      :highlight-current-row="true"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="id" label="用户id" width="80"></el-table-column>
      <el-table-column prop="username" label="登录名"></el-table-column>
      <el-table-column prop="realname" label="真实名称"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="enabledName" label="状态"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="table.totalElements"
      :current-page="table.pageable.pageNumber"
      :page-sizes="page.pageSizes"
      :page-size="table.pageable.pageSize"
      @size-change="sizeChange"
      @current-change="currentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    ></el-pagination>
  </div>
</template>
<script src="./userlist.js"></script>
