<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报销列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-date-picker v-model="reimbursementMonth"
                      type="month"
                      placeholder="请选择报销月份"
                      format="yyyy-MM"
                      value-format="yyyy-MM"
                      style="width:180px;"
                      clearable
                      v-show="showControl('generateReimbursementSummary')"></el-date-picker>
      <el-button type="danger"
                 size="small"
                 icon="el-icon-share"
                 @click="generateReimbursementSummary"
                 v-show="showControl('generateReimbursementSummary')">生成报销</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-search"
                 @click="searchDialog = true">搜 索</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-download"
                 @click="downloadReimbursementSummary()">下载报销</el-button>
    </div>
    <div v-show="showControl('statistics')"
         style="text-align:left;">
      <span>报销总金额：{{reimbursementSum}}</span>
    </div>
    <template>
      <el-table :data="table.content"
                :border="true"
                :highlight-current-row="true"
                :stripe="true"
                :row-class-name="setRowClassName"
                style="width: 100%"
                @current-change="rowChange"
                @row-dblclick="handleRowDblClick">
        <el-table-column type="index"
                         width="50"
                         label="序号"></el-table-column>
        <el-table-column prop="company"
                         width="250"
                         label="报销公司"
                         :formatter="companyFormatter"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="userName"
                         label="登录名"></el-table-column>
        <el-table-column prop="realName"
                         label="用户名"></el-table-column>
        <el-table-column prop="paymentMonth"
                         label="报销月份"></el-table-column>
        <el-table-column prop="sum"
                         label="报销金额"></el-table-column>
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
        <el-form size="small"
                 label-position="left"
                 label-width="110px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="报销公司">
                <el-select v-model="search.company"
                           placeholder="请选择公司"
                           style="width:100%;"
                           filterable
                           clearable>
                  <el-option v-for="company in companyList"
                             :key="company.code"
                             :value="company.code"
                             :label="company.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="登录名">
                <el-input v-model="search.userName"
                          style="width:100%;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="报销月份">
                <el-date-picker v-model="search.paymentMonth"
                                type="month"
                                placeholder="请选择月份"
                                format="yyyy-MM"
                                value-format="yyyy-MM"
                                style="width:100%;"
                                clearable></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="报销金额">
                <el-input v-model="search.sum"
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
<style>
.row1 {
  color: red;
}
.row2 {
  color: blue;
}
.row3 {
  color: #8304fa;
}
.row4 {
  color: #f70361;
}
</style>
<script src="./reimbursementSummaryList.js"></script>
