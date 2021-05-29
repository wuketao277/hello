<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>职位列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="add">新增</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modify">修改</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detail">查看</el-button>
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item>
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="sureSearchDialog" placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table
        :data="table.content"
        :border="true"
        :highlight-current-row="true"
        style="width: 100%"
        @current-change="rowChange"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="id" width="100" label="职位id"></el-table-column>
        <el-table-column prop="clientName" width="200" label="客户名称"></el-table-column>
        <el-table-column prop="title" width="200" label="职位名称"></el-table-column>
        <el-table-column prop="status" width="100" :formatter="this.getStatusName" label="状态"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
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
    </template>
  </div>
</template>
<script src="./caselist.js"></script>
