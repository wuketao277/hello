<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成本发票列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-plus"
                 @click="add">新 增</el-button>
      <el-button type="danger"
                 size="small"
                 icon="el-icon-delete"
                 @click="deleteById">删 除</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-share"
                 @click="searchDialog = true">搜 索</el-button>
      <br />
      <span>待付款金额：{{noPaymentSum}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>待开票金额：{{noInvoiceSum}}</span>
    </div>
    <template>
      <el-table :data="table.content"
                :border="true"
                :highlight-current-row="true"
                :stripe="true"
                style="width: 100%"
                @current-change="rowChange"
                @row-dblclick="modify">
        <el-table-column type="index"
                         width="50"
                         label="序号"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantUserName"
                         width="100"
                         label="用户名"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceDate"
                         :formatter="formatDate"
                         width="100"
                         label="开票日期"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="submitDate"
                         :formatter="formatDate"
                         width="100"
                         label="提交日期"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="approveStatus"
                         :formatter="formatApproveStatus"
                         width="80"
                         label="审批状态"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceNumber"
                         width="200"
                         label="发票号码"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="sum"
                         width="90"
                         label="价税合计"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="type"
                         width="90"
                         label="发票类型"
                         show-overflow-tooltip
                         :formatter="formatType"></el-table-column>
        <el-table-column prop="kind"
                         width="100"
                         label="品类"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark"
                         label="备注"
                         show-overflow-tooltip></el-table-column>
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
               width="60%">
      <div>
        <el-form size="small"
                 label-position="left"
                 label-width="90px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="开票日期">
                <el-date-picker type="date"
                                placeholder="开票日期"
                                v-model="search.invoiceDate"
                                style="width: 140px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交日期">
                <el-date-picker type="date"
                                placeholder="提交日期"
                                v-model="search.submitDate"
                                style="width: 140px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户">
                <!-- <el-select v-model="search.consultantUserName"
                           placeholder="请选择用户"
                           clearable
                           style="width:100%;">
                  <el-option v-for="consultant in consultants"
                             :key="consultant.id"
                             :value="consultant.id"
                             :label="consultant.username"></el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发票号码">
                <el-input v-model="search.invoiceNumber"
                          clearable
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发票金额">
                <el-input v-model="search.sum"
                          type="number"
                          clearable
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品名">
                <el-input v-model="search.kind"
                          clearable
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input v-model="search.remark"
                          clearable
                          style="width:100%;"></el-input>
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
                     @click="query">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./costInvoiceList.js"></script>
