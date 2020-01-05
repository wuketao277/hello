<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="addRole">新增</el-button>
      <el-button type="primary" size="small" icon="el-icon-zoom-in" @click="detailRole">查看</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modifyRole">修改</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteRole">删除</el-button>
      <el-button type="primary" size="small" icon="el-icon-search" @click="switchSearchDialog">搜索</el-button>
    </div>
    <el-form
      v-if="search.show"
      style="border:1px solid black;"
      ref="form"
      :model="search"
      label-width="80px"
    >
      <el-form-item label="角色名称">
        <el-input v-model="search.name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="search.description"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="table.content"
      :border="true"
      :highlight-current-row="true"
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="id" width="50" label="id"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="table.content.length"
      :current-page="table.pageable.pageNumber"
      :page-sizes="page.pageSizes"
      :page-size="table.pageable.pageSize"
    ></el-pagination>
    <!--搜索对话框-->
    <el-dialog title="搜索" :visible.sync="showSearchDialog">
      <el-form>
        <el-form-item label="搜索内容">
          <el-input v-model="search" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSearchDialog">取 消</el-button>
        <el-button type="primary" @click="query">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./rolelist.js"></script>
