<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成功职位列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <div>
        <el-button type="success"
                   size="small"
                   icon="el-icon-circle-plus"
                   @click="add">新 增</el-button>
        <el-button type="warning"
                   size="small"
                   icon="el-icon-edit"
                   @click="modify">修 改</el-button>
        <el-button type="primary"
                   size="small"
                   icon="el-icon-share"
                   @click="detail">查 看</el-button>
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   @click="deleteById"
                   v-if="showControl('delete')">删 除</el-button>
        <el-button type="primary"
                   size="small"
                   icon="el-icon-search"
                   @click="searchDialog = true">搜 索</el-button>
        <el-button type="primary"
                   size="small"
                   icon="el-icon-download"
                   @click="downloadSuccessfulCase()">下载全部成功case</el-button>
      </div>
      <span>总GP:{{gpSum}}</span>
      &nbsp;&nbsp;
      <span>平均GP:{{gpAvg}}</span>
      &nbsp;&nbsp;
      <span>总Billing:{{billingSum}}</span>
      &nbsp;&nbsp;
      <span>平均Billing:{{billingAvg}}</span>
    </div>
    <template>
      <el-table v-loading="table.loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="table.content"
                :border="true"
                :highlight-current-row="true"
                :stripe="true"
                style="width: 100%"
                @current-change="rowChange"
                @row-dblclick="modify">
        <el-table-column type="index"
                         width="50"
                         label="序号"
                         show-overflow-tooltip
                         fixed></el-table-column>
        <el-table-column prop="candidateChineseName"
                         width="80"
                         label="姓名"
                         show-overflow-tooltip
                         fixed></el-table-column>
        <el-table-column prop="gender"
                         width="50"
                         label="性别"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="clientName"
                         width="200"
                         label="客户名称"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="department"
                         width="120"
                         label="部门名称"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="title"
                         width="120"
                         label="职位名称"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="gp"
                         width="100"
                         label="GP"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="billing"
                         width="100"
                         label="Billing"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="base"
                         width="100"
                         label="Base"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="interviewDate"
                         :formatter="formatDate"
                         width="120"
                         label="Interview Date"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="offerDate"
                         :formatter="formatDate"
                         width="120"
                         label="Offer Date"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="onBoardDate"
                         :formatter="formatDate"
                         width="120"
                         label="On Board Date"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="guaranteeDate"
                         :formatter="formatDate"
                         width="130"
                         label="Guarantee Date"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceDate"
                         :formatter="formatDate"
                         width="120"
                         label="Invoice Date"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="paymentDate"
                         :formatter="formatDate"
                         width="120"
                         label="Payment Date"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="actualPaymentDate"
                         :formatter="formatDate"
                         width="180"
                         label="Actual Payment Date"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="approveStatus"
                         :formatter="formatApproveStatus"
                         width="150"
                         label="Approve Status"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="cwUserName"
                         width="100"
                         label="CW"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="cwCommissionPercent"
                         width="80"
                         label="CW Rate"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="bdUserName"
                         width="100"
                         label="BD"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="bdCommissionPercent"
                         width="120"
                         label="BD Rate"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="leaderUserName"
                         width="100"
                         label="Leader"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="leaderCommissionPercent"
                         width="120"
                         label="Leader Rate"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantUserName"
                         width="100"
                         label="AM"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantCommissionPercent"
                         width="80"
                         label="AM Rate"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantUserName2"
                         width="100"
                         label="R2"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantCommissionPercent2"
                         width="80"
                         label="R2 Rate"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantUserName3"
                         width="100"
                         label="R3"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantCommissionPercent3"
                         width="120"
                         label="R3 Rate"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantUserName4"
                         width="100"
                         label="R4"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantCommissionPercent4"
                         width="120"
                         label="R4 Rate"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantUserName5"
                         width="100"
                         label="R5"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="consultantCommissionPercent5"
                         width="120"
                         label="R5 Rate"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="commissionDate"
                         :formatter="formatDate"
                         width="150"
                         label="Commission Date"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceNo"
                         width="200"
                         label="Invoice No."
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="po"
                         width="200"
                         label="PO"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="type"
                         width="100"
                         label="TYPE"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="hrEnglishName"
                         width="100"
                         label="HR-En"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="hrChineseName"
                         width="100"
                         label="HR-Ch"
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
               width="80%">
      <div>
        <el-form size="small"
                 label-position="left"
                 label-width="160px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Client"
                            label-width="80px">
                <el-select v-model="search.clientName"
                           placeholder="请选择客户"
                           style="width:100%;"
                           filterable
                           clearable>
                  <el-option v-for="client in clients"
                             :key="client.chineseName"
                             :value="client.chineseName"
                             :label="client.chineseName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="HR"
                            label-width="80px">
                <el-select v-model="search.hrId"
                           placeholder="请选择hr"
                           filterable
                           clearable>
                  <el-option v-for="hr in hrs"
                             :key="hr.id"
                             :value="hr.id"
                             :label="hr.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Billing"
                            label-width="80px">
                <el-input v-model="search.billing"
                          style="width:100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Consultant"
                            label-width="80px">
                <el-select v-model="search.consultantId"
                           placeholder="请选择顾问"
                           filterable
                           clearable>
                  <el-option v-for="consultant in consultants"
                             :key="consultant.id"
                             :value="consultant.id"
                             :label="consultant.username"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="CW"
                            label-width="80px">
                <el-select v-model="search.cwId"
                           placeholder="请选择CW"
                           filterable
                           clearable>
                  <el-option v-for="cw in cws"
                             :key="cw.id"
                             :value="cw.id"
                             :label="cw.username"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="BD"
                            label-width="80px">
                <el-select v-model="search.bdId"
                           placeholder="请选择BD"
                           filterable
                           clearable>
                  <el-option v-for="bd in bds"
                             :key="bd.id"
                             :value="bd.id"
                             :label="bd.username"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Leader"
                            label-width="80px">
                <el-select v-model="search.leaderId"
                           placeholder="请选择Leader"
                           filterable
                           clearable>
                  <el-option v-for="leader in leaders"
                             :key="leader.id"
                             :value="leader.id"
                             :label="leader.username"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Offer Date">
                <el-date-picker type="date"
                                placeholder="选择开始日期"
                                v-model="search.offerDateStart"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
                <span>-</span>
                <el-date-picker type="date"
                                placeholder="选择结束日期"
                                v-model="search.offerDateEnd"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="On Board Date">
                <el-date-picker type="date"
                                placeholder="选择开始日期"
                                v-model="search.onBoardDateStart"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
                <span>-</span>
                <el-date-picker type="date"
                                placeholder="选择结束日期"
                                v-model="search.onBoardDateEnd"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Payment Date">
                <el-date-picker type="date"
                                placeholder="选择开始日期"
                                v-model="search.paymentDateStart"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
                <span>-</span>
                <el-date-picker type="date"
                                placeholder="选择结束日期"
                                v-model="search.paymentDateEnd"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Actual Payment Date">
                <el-date-picker type="date"
                                placeholder="选择开始日期"
                                v-model="search.actualPaymentDateStart"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
                <span>-</span>
                <el-date-picker type="date"
                                placeholder="选择结束日期"
                                v-model="search.actualPaymentDateEnd"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Invoice Date">
                <el-date-picker type="date"
                                placeholder="选择开始日期"
                                v-model="search.invoiceDateStart"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
                <span>-</span>
                <el-date-picker type="date"
                                placeholder="选择结束日期"
                                v-model="search.invoiceDateEnd"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Commission Date">
                <el-date-picker type="date"
                                placeholder="选择开始日期"
                                v-model="search.commissionDateStart"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
                <span>-</span>
                <el-date-picker type="date"
                                placeholder="选择结束日期"
                                v-model="search.commissionDateEnd"
                                style="width: 160px;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Channel"
                            label-width="80px">
                <el-input v-model="search.channel"
                          style="width:180px;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Status"
                            label-width="80px">
                <el-select v-model="search.approveStatus"
                           placeholder="审批状态"
                           clearable>
                  <el-option v-for="approveStatus in approveStatusList"
                             :key="approveStatus.id"
                             :value="approveStatus.id"
                             :label="approveStatus.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Candidate"
                            label-width="80px">
                <el-input v-model="search.candidateChineseName"
                          style="width:180px;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Type"
                            label-width="80px">
                <el-select v-model="search.type"
                           placeholder="Type"
                           style="width:100%"
                           clearable>
                  <el-option v-for="type in typeList"
                             :key="type.code"
                             :value="type.code"
                             :label="type.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Title"
                            label-width="80px">
                <el-input v-model="search.title"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24"
                    style="text-align: left;">
              <el-form-item label="Shortcut"
                            label-width="80px">
                <el-checkbox v-model="search.nonPayment">未付款</el-checkbox>
                <el-checkbox v-model="search.nonPaymentDue">到期未付款</el-checkbox>
                <el-checkbox v-model="search.nonPaymentDueExcludeYiQi">到期未付款除一汽外</el-checkbox>
                <el-checkbox v-model="search.nonOnboard">未入职</el-checkbox>
                <el-checkbox v-model="search.guaranteePeriod">保证期</el-checkbox>
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
<script src="./successfulPermList.js"></script>
