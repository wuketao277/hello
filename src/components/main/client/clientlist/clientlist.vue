<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="add">新增</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modify">修改</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="del">删除</el-button>
      <el-button type="primary" size="small" icon="el-icon-search" @click="switchSearch">搜索</el-button>
    </div>
    <template>
      <el-table
        :data="clientlist"
        border="true"
        highlight-current-row="true"
        style="width: 100%"
        @current-change="currentChange"
        @size-change="sizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="chinesename" label="中文名称" width="180"></el-table-column>
        <el-table-column prop="englishname" label="英文名称" width="180"></el-table-column>
        <el-table-column prop="address" label="通讯地址"></el-table-column>
      </el-table>
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
<script src="./clientlist.js"></script>
