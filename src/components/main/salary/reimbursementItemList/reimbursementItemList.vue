<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报销项列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button
        type="success"
        size="small"
        icon="el-icon-circle-plus"
        @click="add"
        v-show="showControl('add')"
      >新增</el-button>
      <el-button
        type="warning"
        size="small"
        icon="el-icon-edit"
        @click="modify"
        v-show="showControl('edit')"
      >修改</el-button>
      <el-button
        type="danger"
        size="small"
        icon="el-icon-delete"
        @click="deleteById"
      >删除</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detail">查看</el-button>
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item style="margin-bottom:0px;">
          <el-input
            v-model="search"
            autocomplete="off"
            @keyup.enter.native="sureSearchDialog"
            placeholder="可通过登录名、姓名、月份来查询"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table
        :data="table.content"
        :border="true"
        :highlight-current-row="true"
        style="width: 100%"
        @current-change="rowChange"
      >
        <el-table-column type="index" width="80" label="序号"></el-table-column>
        <el-table-column prop="userName" width="100" label="登录名"></el-table-column>
        <el-table-column prop="realName" width="100" label="用户姓名"></el-table-column>
        <el-table-column prop="type" width="150" label="类型"></el-table-column>
        <el-table-column prop="date" width="120" label="发生日期"></el-table-column>
        <el-table-column prop="sum" width="100" label="报销金额"></el-table-column>
        <el-table-column prop="paymentMonth" width="150" label="报销月份"></el-table-column>
        <el-table-column prop="approveStatus" width="120" label="审批状态"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
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
<script src="./reimbursementItemList.js"></script>
