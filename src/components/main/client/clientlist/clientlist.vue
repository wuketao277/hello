<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="add">新增</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modify">修改</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detail">查看</el-button>
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item label="" style="mergin-bottom:0px;">
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="sureSearchDialog" placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" icon="el-icon-search" v-if="showSearchResult" @click="query(true)">取消搜索</el-button>
    </div>
    <template>
      <el-table
        :data="table.content"
        :border="true"
        :highlight-current-row="true"
        :stripe="true"
        :row-class-name="rowStyle"
        style="width: 100%"
        @current-change="rowChange"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="chineseName" label="中文名称"></el-table-column>
        <el-table-column prop="englishName" label="英文名称"></el-table-column>
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
<script src="./clientlist.js"></script>
<style>
.selectedRow {
  background-color:yellow;
}
.unselectedRow {
  background-color:red;
}
</style>
