<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成功职位列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="add" v-show="showControl('add')">新增</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modify" v-show="showControl('edit')">修改</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detail">查看</el-button>
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item>
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="sureSearchDialog" placeholder="输入关键字后，回车即可搜索。"></el-input>
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
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="clientName" width="120" label="客户名称"></el-table-column>
        <el-table-column prop="title" width="150" label="职位名称"></el-table-column>
        <el-table-column prop="candidateChineseName" width="120" label="候选人姓名"></el-table-column>
        <el-table-column prop="consultantRealName" width="100" label="顾问姓名"></el-table-column>
        <el-table-column prop="consultantCommissionPercent" width="120" label="顾问提成比例"></el-table-column>
        <el-table-column prop="cwRealName" width="100" label="CW姓名"></el-table-column>
        <el-table-column prop="cwCommissionPercent" width="120" label="CW提成比例"></el-table-column>
        <el-table-column prop="bdRealName" width="100" label="BD姓名"></el-table-column>
        <el-table-column prop="bdCommissionPercent" width="120" label="BD提成比例"></el-table-column>
        <el-table-column prop="base" width="100" label="Base"></el-table-column>
        <el-table-column prop="gp" width="100" label="GP"></el-table-column>
        <el-table-column prop="billing" width="100" label="Billing"></el-table-column>
        <el-table-column prop="onBoardDate" :formatter="formatDate" width="120" label="On Board Date"></el-table-column>
        <el-table-column prop="offerDate" :formatter="formatDate" width="120" label="Offer Date"></el-table-column>
        <el-table-column prop="paymentDate" :formatter="formatDate" width="120" label="Payment Date"></el-table-column>
        <el-table-column prop="invoiceDate" :formatter="formatDate" width="120" label="Invoice Date"></el-table-column>
        <el-table-column prop="invoiceNo" width="200" label="Invoice No."></el-table-column>
        <el-table-column prop="po" width="200" label="PO"></el-table-column>
        <el-table-column prop="actualAcceptDate" :formatter="formatDate" width="120" label="实际收款日期"></el-table-column>
        <el-table-column prop="bonusPaymentDate" :formatter="formatDate" width="120" label="奖金发放日期"></el-table-column>
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
<script src="./successfulPermList.js"></script>
