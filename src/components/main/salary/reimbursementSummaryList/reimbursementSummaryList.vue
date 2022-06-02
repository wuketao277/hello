<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报销列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button
        type="danger"
        size="small"
        icon="el-icon-share"
        @click="generateReimbursementSummary"
        v-show="showControl('generateReimbursementSummary')"
      >生成报销</el-button>
    </div>
    <div v-show="showControl('statistics')" style="text-align:left;">
      <span>当月报销总金额：{{currentMonthSumReimbursement}}</span>
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
        <el-table-column prop="userName" label="登录名"></el-table-column>
        <el-table-column prop="realName" label="用户姓名"></el-table-column>
        <el-table-column prop="paymentMonth" label="报销月份"></el-table-column>
        <el-table-column prop="sum" label="报销总金额"></el-table-column>
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
<script src="./reimbursementSummaryList.js"></script>
