<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>薪资列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="warning"
                 size="small"
                 icon="el-icon-edit"
                 @click="modify"
                 v-show="showControl('modifySalary')">修 改</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-share"
                 @click="detail">查 看</el-button>
      <el-date-picker v-model="salaryMonth"
                      type="month"
                      placeholder="请选择工资月份"
                      format="yyyy-MM"
                      value-format="yyyy-MM"
                      style="width:180px;"
                      clearable
                      v-show="showControl('generateSalary')"></el-date-picker>
      <el-button type="danger"
                 size="small"
                 icon="el-icon-share"
                 @click="generateSalary"
                 v-show="showControl('generateSalary')">生成工资</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-share"
                 @click="searchDialog = true">搜 索</el-button>
      <el-button type="primary"
                 size="small"
                 @click="showLoginName=!showLoginName"
                 v-if="!showLoginName"
                 v-show="showControl('loginName')">显示Login Name</el-button>
      <el-button type="primary"
                 size="small"
                 @click="showLoginName=!showLoginName"
                 v-if="showLoginName"
                 v-show="showControl('loginName')">隐藏Login Name</el-button>
      <el-button type="primary"
                 size="small"
                 @click="showWorkingDays=!showWorkingDays"
                 v-if="!showWorkingDays"
                 v-show="showControl('workingDays')">显示Working Days</el-button>
      <el-button type="primary"
                 size="small"
                 @click="showWorkingDays=!showWorkingDays"
                 v-if="showWorkingDays"
                 v-show="showControl('workingDays')">隐藏Working Days</el-button>
      <el-button type="primary"
                 size="small"
                 @click="showHistoryDebt=!showHistoryDebt"
                 v-if="!showHistoryDebt"
                 v-show="showControl('historyDebt')">显示History Debt</el-button>
      <el-button type="primary"
                 size="small"
                 @click="showHistoryDebt=!showHistoryDebt"
                 v-if="showHistoryDebt"
                 v-show="showControl('historyDebt')">隐藏History Debt</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-download"
                 @click="downloadSalary()">下载薪资</el-button>
    </div>
    <div v-show="showControl('statistics')"
         style="text-align:left;">
      <span>税前总金额：{{curMonthPreTaxSum}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span>税后总金额：{{curMonthAfterTaxSum}}</span>
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
                         width="45"
                         label="No."></el-table-column>
        <el-table-column prop="consultantUserName"
                         width="110"
                         label="Login Name"
                         v-if="showLoginName"></el-table-column>
        <el-table-column prop="consultantRealName"
                         width="100"
                         label="User Name"></el-table-column>
        <el-table-column prop="month"
                         width="90"
                         label="Month"></el-table-column>
        <el-table-column prop="workingDays"
                         width="120"
                         label="Working Days"
                         v-if="showWorkingDays"></el-table-column>
        <el-table-column prop="historyDebt"
                         width="110"
                         label="History Debt"
                         v-if="showHistoryDebt"></el-table-column>
        <el-table-column prop="sum"
                         width="120"
                         label="Pretax Income"></el-table-column>
        <el-table-column prop="finalSum"
                         width="90"
                         label="Net Pay"></el-table-column>
        <el-table-column prop="personalTax"
                         width="120"
                         label="Individual Tax"></el-table-column>
        <el-table-column prop="insurance"
                         width="140"
                         label="Social Insurance"></el-table-column>
        <el-table-column prop="gongjijin"
                         width="200"
                         label="Housing Provident Fund"></el-table-column>
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
    <el-dialog title="搜索"
               :visible="searchDialog"
               :show-close="false"
               width="80%">
      <div>
        <el-form label-position="left"
                 label-width="110px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Login Name">
                <el-input v-model="search.loginName"
                          style="width:100%;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="User Name">
                <el-input v-model="search.userName"
                          style="width:100%;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Month">
                <el-date-picker v-model="search.month"
                                type="month"
                                placeholder="请选择月份"
                                format="yyyy-MM"
                                value-format="yyyy-MM"
                                style="width:100%;"
                                clearable></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Pretax Income">
                <el-input v-model="search.pretaxIncome"
                          style="width:100%;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Net Pay">
                <el-input v-model="search.netPay"
                          style="width:100%;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="warning"
                     @click="clearQueryCondition">清 空</el-button>
          <el-button @click="searchDialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="sureSearchDialog">查 询</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./salaryList.js"></script>
