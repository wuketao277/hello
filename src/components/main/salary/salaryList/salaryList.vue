<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>薪资列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button
        type="warning"
        size="small"
        icon="el-icon-edit"
        @click="modify"
        v-show="showControl('modifySalary')"
      >修 改</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detail">查 看</el-button>
      <el-button
        type="danger"
        size="small"
        icon="el-icon-share"
        @click="generateSalary"
        v-show="showControl('generateSalary')"
      >生成工资</el-button>
      <el-form
        @submit.native.prevent
        style="display:inline-block;width:250px;"
        v-show="showControl('search')"
      >
        <el-form-item label style="margin-bottom:0px;">
          <el-input
            v-model="search"
            autocomplete="off"
            @keyup.enter.native="sureSearchDialog"
            placeholder="可通过登录名、姓名、月份来查询"
            clearable
            style="width:260px;"
          ></el-input>
        </el-form-item>
      </el-form>&nbsp;&nbsp;&nbsp;
      <el-button
        type="primary"
        size="small"
        @click="showLoginName=!showLoginName"
        v-if="!showLoginName"
      >显示Login Name</el-button>
      <el-button
        type="primary"
        size="small"
        @click="showLoginName=!showLoginName"
        v-if="showLoginName"
      >隐藏Login Name</el-button>
      <el-button
        type="primary"
        size="small"
        @click="showWorkingDays=!showWorkingDays"
        v-if="!showWorkingDays"
      >显示Working Days</el-button>
      <el-button
        type="primary"
        size="small"
        @click="showWorkingDays=!showWorkingDays"
        v-if="showWorkingDays"
      >隐藏Working Days</el-button>
      <el-button
        type="primary"
        size="small"
        @click="showHistoryDebt=!showHistoryDebt"
        v-if="!showHistoryDebt"
      >显示History Debt</el-button>
      <el-button
        type="primary"
        size="small"
        @click="showHistoryDebt=!showHistoryDebt"
        v-if="showHistoryDebt"
      >隐藏History Debt</el-button>
    </div>
    <div v-show="showControl('statistics')" style="text-align:left;">
      <span>当月税前总金额：{{curMonthPreTaxSum}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span>当月税后总金额：{{curMonthAfterTaxSum}}</span>
    </div>
    <template>
      <el-table
        :data="table.content"
        :border="true"
        :highlight-current-row="true"
        style="width: 100%"
        @current-change="rowChange"
      >
        <el-table-column type="index" width="45" label="No."></el-table-column>
        <el-table-column
          prop="consultantUserName"
          width="110"
          label="Login Name"
          v-if="showLoginName"
        ></el-table-column>
        <el-table-column prop="consultantRealName" width="100" label="User Name"></el-table-column>
        <el-table-column prop="month" width="90" label="Month"></el-table-column>
        <el-table-column prop="workingDays" width="120" label="Working Days" v-if="showWorkingDays"></el-table-column>
        <el-table-column prop="historyDebt" width="110" label="History Debt" v-if="showHistoryDebt"></el-table-column>
        <el-table-column prop="sum" width="120" label="Pretax Income"></el-table-column>
        <el-table-column prop="finalSum" width="90" label="Net Pay"></el-table-column>
        <el-table-column prop="personalTax" width="120" label="Individual Tax"></el-table-column>
        <el-table-column prop="insurance" width="140" label="Social Insurance"></el-table-column>
        <el-table-column prop="gongjijin" label="Housing Provident Fund"></el-table-column>
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
<script src="./salaryList.js"></script>
