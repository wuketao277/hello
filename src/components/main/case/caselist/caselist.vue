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
      <el-button type="primary" size="small" icon="el-icon-search" @click="switchSearch">搜索</el-button>
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
        <el-table-column prop="clientName" label="客户名称"></el-table-column>
        <el-table-column prop="title" label="职位名称"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
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
    <!--搜索对话框-->
    <el-dialog title="搜索" :visible.sync="showSearchDialog">
      <el-form>
        <el-form-item label="搜索内容">
          <el-input v-model="search" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSearchDialog">取 消</el-button>
        <el-button type="primary" @click="sureSearchDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./caselist.js"></script>
