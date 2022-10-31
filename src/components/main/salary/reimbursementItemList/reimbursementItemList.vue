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
      >新 增</el-button>
      <el-button
        type="warning"
        size="small"
        icon="el-icon-edit"
        @click="modify"
        v-show="showControl('edit')"
      >修 改</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteById">删 除</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detail">查 看</el-button>
      <el-button
        type="warning"
        size="small"
        icon="el-icon-s-check"
        @click="approveSelection"
        v-if="showControl('approveButton')"
      >审批通过</el-button>
      <el-form @submit.native.prevent style="display:inline-block;width:260px;">
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
      <el-button type="primary" size="medium" icon="el-icon-download" @click="downloadReimbursementItem()">下载报销项</el-button>
      <span>总报销:{{totalReimbursementSum}}</span>&nbsp;&nbsp;
      <span>应报销:{{needReimbursementSum}}</span>
    </div>
    <template>
      <el-table
        :data="table.content"
        :border="true"
        :highlight-current-row="true"
        :stripe="true"
        style="width: 100%"
        @current-change="rowChange"
        @row-dblclick="modify"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" width="50" label="序号" fixed></el-table-column>
        <el-table-column type="selection" width="50" fixed v-if="showControl('selectionColumn')"></el-table-column>
        <el-table-column
          prop="company"
          width="220"
          label="报销公司"
          :formatter="companyFormatter"
          show-overflow-tooltip
          fixed
        ></el-table-column>
        <el-table-column prop="userName" width="100" label="登录名" fixed></el-table-column>
        <el-table-column prop="paymentMonth" width="100" label="报销月" fixed></el-table-column>
        <el-table-column prop="date" width="100" label="发生日期"></el-table-column>
        <el-table-column prop="location" width="50" label="地点" :formatter="locationFormatter"></el-table-column>
        <el-table-column prop="needPay" width="80" label="是否报销" :formatter="needPayFormatter"></el-table-column>
        <el-table-column prop="type" width="50" label="类别" :formatter="typeFormatter"></el-table-column>
        <el-table-column
          prop="kind"
          width="180"
          label="项目"
          :formatter="kindFormatter"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="invoiceNo" width="200" label="发票号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" width="80" label="单价"></el-table-column>
        <el-table-column prop="count" width="80" label="数量"></el-table-column>
        <el-table-column prop="sum" width="100" label="金额"></el-table-column>
        <el-table-column prop="approveStatus" width="100" label="审批状态"></el-table-column>
        <el-table-column prop="description" width="250" label="描述" show-overflow-tooltip></el-table-column>
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
        @row-dblclick="handleRowDblClick"
        @prev-click="prevClick"
        @next-click="nextClick"
      ></el-pagination>
    </template>
  </div>
</template>
<script src="./reimbursementItemList.js"></script>
