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
        <el-table-column prop="clientName" width="200" label="客户名称"></el-table-column>
        <el-table-column prop="caseId" width="100" label="职位id"></el-table-column>
        <el-table-column prop="title" width="200" label="职位名称"></el-table-column>
        <el-table-column prop="candidateId" width="200" label="候选人id"></el-table-column>
        <el-table-column prop="candidateName" width="200" label="候选人姓名"></el-table-column>
        <el-table-column prop="location" width="200" label="Location"></el-table-column>
        <el-table-column prop="base" width="200" label="Base"></el-table-column>
        <el-table-column prop="gp" width="200" label="GP"></el-table-column>
        <el-table-column prop="billing" width="200" label="Billing"></el-table-column>
        <el-table-column prop="onBoardDate" width="200" label="On Board Date"></el-table-column>
        <el-table-column prop="offerDate" width="200" label="Offer Date"></el-table-column>
        <el-table-column prop="paymentDate" width="200" label="Payment Date"></el-table-column>
        <el-table-column prop="consulant" width="200" label="Consulant"></el-table-column>
        <el-table-column prop="commission" width="200" label="Commission"></el-table-column>
        <el-table-column prop="contact" width="200" label="Contact"></el-table-column>
        <el-table-column prop="cwCommission" width="200" label="CW Commission"></el-table-column>
        <el-table-column prop="bd" width="200" label="BD"></el-table-column>
        <el-table-column prop="po" width="200" label="PO"></el-table-column>
        <el-table-column prop="invoiceDate" width="200" label="Invoice Date"></el-table-column>
        <el-table-column prop="invoiceNo" width="200" label="Invoice No."></el-table-column>
        <el-table-column prop="successfulChannel" width="200" label="Successful Channel"></el-table-column>
        <el-table-column prop="actualDateOfCollection" width="200" label="实际收款日期"></el-table-column>
        <el-table-column prop="aonusPaymentDate" width="200" label="奖金发放日期"></el-table-column>
        <el-table-column prop="status" width="100" :formatter="this.getStatusName" label="状态"></el-table-column>
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
<script src="./successfulPermList.js"></script>
