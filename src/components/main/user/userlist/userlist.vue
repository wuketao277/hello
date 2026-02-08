<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-plus"
                 @click="add">新 增</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-edit"
                 @click="modify">修 改</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-share"
                 @click="detail">查 看</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-refresh-left"
                 @click="query(true)">刷 新</el-button>
      <el-form @submit.native.prevent
               style="display:inline-block;width:250px;">
        <el-form-item label
                      style="margin-bottom:0px;">
          <el-input v-model="search"
                    autocomplete="off"
                    @keyup.enter.native="sureSearchDialog"
                    @input="sureSearchDialog"
                    @clear="sureSearchDialog"
                    clearable
                    placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="table.content"
              @current-change="handleCurrentChange"
              @row-dblclick="modify"
              :border="true"
              :highlight-current-row="true"
              :stripe="true"
              style="width: 100%">
      <el-table-column type="index"
                       width="50"
                       label="序号"></el-table-column>
      <el-table-column prop="username"
                       width="100"
                       label="登录名"></el-table-column>
      <el-table-column prop="realname"
                       width="100"
                       label="用户姓名"></el-table-column>
      <el-table-column prop="enabledName"
                       width="100"
                       label="状态"></el-table-column>
      <el-table-column prop="birthday"
                       width="100"
                       label="生日"
                       :formatter="formatDate"></el-table-column>
      <el-table-column prop="phoneNo"
                       width="150"
                       label="电话"></el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       width="250"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="onBoardDate"
                       label="入职日期"
                       :formatter="formatDate"></el-table-column>
      <el-table-column prop="dimissionDate"
                       label="离职日期"
                       :formatter="formatDate"></el-table-column>
    </el-table>
    <el-pagination background
                   layout="prev, pager, next, sizes"
                   :total="table.totalElements"
                   :current-page="table.pageable.pageNumber"
                   :page-sizes="page.pageSizes"
                   :page-size="table.pageable.pageSize"
                   @size-change="sizeChange"
                   @current-change="currentChange"
                   @prev-click="prevClick"
                   @next-click="nextClick"></el-pagination>
  </div>
</template>
<script src="./userlist.js"></script>
