<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>薪资特殊项列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-plus"
                 @click="add"
                 v-show="showControl('add')">新 增</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-edit"
                 @click="modify"
                 v-show="showControl('edit')">修 改</el-button>
      <el-button type="danger"
                 size="small"
                 icon="el-icon-delete"
                 @click="deleteById"
                 v-show="showControl('delete')">删 除</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-share"
                 @click="detail">查 看</el-button>
      <el-form @submit.native.prevent
               style="display:inline-block;width:250px;"
               v-show="showControl('search')">
        <el-form-item style="margin-bottom:0px;">
          <el-input v-model="search"
                    autocomplete="off"
                    @keyup.enter.native="sureSearchDialog"
                    placeholder="可通过登录名、姓名、月份来查询"
                    clearable
                    style="width:260px;"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table :data="table.content"
                :border="true"
                :highlight-current-row="true"
                :stripe="true"
                style="width: 100%"
                @current-change="rowChange"
                @row-dblclick="rowDblClick">
        <el-table-column type="index"
                         width="50"
                         label="序号"></el-table-column>
        <el-table-column prop="consultantUserName"
                         width="100"
                         label="登录名"></el-table-column>
        <el-table-column prop="consultantRealName"
                         width="100"
                         label="用户姓名"></el-table-column>
        <el-table-column prop="month"
                         width="100"
                         label="月份"></el-table-column>
        <el-table-column prop="sum"
                         width="120"
                         label="金额"></el-table-column>
        <el-table-column prop="description"
                         label="描述"></el-table-column>
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
<script src="./salarySpecialItemList.js"></script>
