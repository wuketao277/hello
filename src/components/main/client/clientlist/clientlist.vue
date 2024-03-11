<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-plus"
                 @click="add"
                 v-if="showControl('addClient')">新 增</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-edit"
                 @click="modify"
                 v-if="showControl('modifyClient')">修 改</el-button>
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
                    @keyup.enter.native="sureSearchDialog"
                    placeholder="输入关键字后，回车即可搜索。"
                    @clear="sureSearchDialog"
                    clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table :data="table.content"
                :border="true"
                :highlight-current-row="true"
                :stripe="true"
                :row-class-name="rowStyle"
                style="width: 100%"
                @current-change="rowChange"
                @row-dblclick="handleDBClick">
        <el-table-column type="index"
                         width="50"
                         label="序号"></el-table-column>
        <el-table-column prop="id"
                         width="100"
                         label="编号"></el-table-column>
        <el-table-column prop="chineseName"
                         label="中文名称"></el-table-column>
        <el-table-column prop="englishName"
                         label="英文名称"></el-table-column>
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
    </template>
  </div>
</template>
<script src="./clientlist.js"></script>
