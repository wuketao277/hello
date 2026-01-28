<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大事件列表</el-breadcrumb-item>
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
      <el-form @submit.native.prevent
               style="display:inline-block;width:250px;">
        <el-form-item label
                      style="margin-bottom:0px;">
          <el-input v-model="search"
                    autocomplete="off"
                    @keyup.enter.native="query"
                    @clear="query"
                    clearable
                    placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="table.content"
              @row-dblclick="modify"
              @current-change="handleCurrentChange"
              :border="true"
              :highlight-current-row="true"
              :stripe="true"
              style="width: 100%">
      <el-table-column type="index"
                       label="序号"
                       width="50"></el-table-column>
      <el-table-column prop="createUserName"
                       label="创建人"
                       width="100"></el-table-column>
      <el-table-column prop="title"
                       label="标题"
                       width="300" show-overflow-tooltip></el-table-column>
      <el-table-column prop="detail"
                       label="详情" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createDateTime"
                       label="创建时间"
                       width="200"></el-table-column>
    </el-table>
    <el-pagination background
                   layout="prev, pager, next, sizes"
                   :total="table.totalElements"
                   :current-page="table.pageable.pageNumber"
                   :page-size="table.pageable.pageSize"
                   :page-sizes="page.pageSizes"
                   @size-change="sizeChange"
                   @current-change="currentChange"
                   @prev-click="prevClick"
                   @next-click="nextClick"></el-pagination>
  </div>
</template>
<script src="./bigEventList.js"></script>
<style>
</style>
