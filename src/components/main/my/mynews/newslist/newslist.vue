<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="addNews">新增</el-button>
      <el-button type="primary" size="small" icon="el-icon-zoom-in" @click="detailNews">查看</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modifyNews">修改</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteNews">删除</el-button>
      <el-button type="primary" size="small" icon="el-icon-search" @click="queryNews">搜索</el-button>
    </div>
    <el-form
      v-if="search.show"
      style="border:1px solid black;"
      ref="form"
      :model="search"
      label-width="80px"
    >
      <el-form-item label="新闻标题">
        <el-input v-model="search.title"></el-input>
      </el-form-item>
      <el-form-item label="新闻内容">
        <el-input v-model="search.content"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="table.content"
      border="true"
      highlight-current-row="true"
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="id" width="50" label="id"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="link" label="连接地址"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="table.content.length"
      :current-page="table.pageable.pageNumber"
      :page-sizes="page.pageSizes"
      :page-size="table.pageable.pageSize"
    ></el-pagination>
  </div>
</template>
<script src="./newslist.js"></script>
