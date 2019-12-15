<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="addClient">新增</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit">修改</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
      <el-button type="primary" size="small" icon="el-icon-search" @click="switchSearch">搜索</el-button>
    </div>
    <el-form
      v-if="search.show"
      style="border:1px solid black;"
      ref="form"
      :model="search"
      label-width="80px"
    >
      <el-form-item label="中文名称">
        <el-input v-model="search.chinesename"></el-input>
      </el-form-item>
      <el-form-item label="英文名称">
        <el-input v-model="search.englishname"></el-input>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="clientlist" border="true" highlight-current-row="true" @current-change="handleCurrentChange" style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="chinesename" label="中文名称" width="180"></el-table-column>
        <el-table-column prop="englishname" label="英文名称" width="180"></el-table-column>
        <el-table-column prop="address" label="通讯地址"></el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script src="./clientlist.js"></script>
