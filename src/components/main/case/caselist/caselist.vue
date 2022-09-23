<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>职位列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="add">新 增</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modify">修 改</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detail">查 看</el-button>
      <el-button
        type="danger"
        size="small"
        icon="el-icon-delete"
        @click="deleteById"
        v-if="showControl('delete')"
      >删 除</el-button>
    </div>
    <div>
      <el-form @submit.native.prevent>
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label style="margin-bottom:0px;">
              <el-input
                v-model="search"
                autocomplete="off"
                @keyup.enter.native="sureSearchDialog"
                placeholder="输入关键字后，回车即可搜索。"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="margin-bottom:0px;">
              <el-radio-group v-model="searchStatus" @change="sureSearchDialog">
                <el-radio label="ALL">全部</el-radio>
                <el-radio label="PREPARE">准备</el-radio>
                <el-radio label="DOING">进行中</el-radio>
                <el-radio label="FINISH">完成</el-radio>
                <el-radio label="PAUSE">暂停</el-radio>
                <el-radio label="CLOSE">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template>
      <el-table
        :data="table.content"
        :border="true"
        :highlight-current-row="true"
        style="width: 100%"
        @current-change="rowChange"
        @row-dblclick="handleRowDblClick"
      >
        <el-table-column type="index" width="50" label="序号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="id" width="100" label="职位id" show-overflow-tooltip></el-table-column>
        <el-table-column prop="clientChineseName" width="250" label="客户名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="title" width="400" label="职位名称" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="status"
          width="100"
          :formatter="this.getStatusName"
          label="状态"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="description" label="描述" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, sizes"
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
