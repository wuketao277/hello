<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报销项列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-plus"
                 @click="add"
                 v-show="showControl('add')">新 增</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-edit"
                 @click="modify"
                 v-show="showControl('edit')">修 改</el-button>
      <el-button type="danger"
                 size="small"
                 icon="el-icon-delete"
                 @click="deleteById">删 除</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-share"
                 @click="detail">查 看</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-s-check"
                 @click="approveSelection"
                 v-if="showControl('approveButton')">审批通过</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-search"
                 @click="searchDialog = true">搜 索</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-download"
                 @click="downloadReimbursementItem()">下载报销项</el-button>
      <br />
      <span>总报销:{{totalReimbursementSum}}</span>&nbsp;&nbsp;
      <span>应报销:{{needReimbursementSum}}</span>
    </div>
    <template>
      <el-table :data="table.content"
                :border="true"
                :highlight-current-row="true"
                :stripe="true"
                style="width: 100%"
                @current-change="rowChange"
                @row-dblclick="modify"
                @selection-change="handleSelectionChange">
        <el-table-column type="index"
                         width="50"
                         label="序号"
                         fixed></el-table-column>
        <el-table-column type="selection"
                         width="50"
                         fixed
                         v-if="showControl('selectionColumn')"></el-table-column>
        <el-table-column prop="company"
                         width="220"
                         label="报销公司"
                         :formatter="companyFormatter"
                         show-overflow-tooltip
                         fixed></el-table-column>
        <el-table-column prop="userName"
                         width="100"
                         label="登录名"
                         fixed></el-table-column>
        <el-table-column prop="paymentMonth"
                         width="100"
                         label="报销月"
                         fixed></el-table-column>
        <el-table-column prop="date"
                         width="100"
                         label="发生日期"></el-table-column>
        <el-table-column prop="location"
                         width="50"
                         label="地点"
                         :formatter="locationFormatter"></el-table-column>
        <el-table-column prop="needPay"
                         width="80"
                         label="是否报销"
                         :formatter="needPayFormatter"></el-table-column>
        <el-table-column prop="type"
                         width="50"
                         label="类别"
                         :formatter="typeFormatter"></el-table-column>
        <el-table-column prop="kind"
                         width="180"
                         label="项目"
                         :formatter="kindFormatter"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceNo"
                         width="200"
                         label="发票号"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="price"
                         width="80"
                         label="单价"></el-table-column>
        <el-table-column prop="count"
                         width="80"
                         label="数量"></el-table-column>
        <el-table-column prop="sum"
                         width="100"
                         label="金额"></el-table-column>
        <el-table-column prop="approveStatus"
                         width="100"
                         label="审批状态"></el-table-column>
        <el-table-column prop="description"
                         width="250"
                         label="描述"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="createUser"
                         width="100"
                         label="创建者"></el-table-column>
        <el-table-column prop="createTime"
                         width="200"
                         label="创建时间"
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
                 label-width="110px">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="User Name">
                <el-input v-model="search.userName"
                          size="small"
                          style="width:100%;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="STATUS">
                <el-select v-model="search.approveStatus"
                           placeholder="STATUS"
                           style="max-width:100%;"
                           filterable
                           clearable>
                  <el-option v-for="status in approveStatusList"
                             :key="status.code"
                             :value="status.code"
                             :label="status.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="NEED PAY">
                <el-select v-model="search.needPay"
                           placeholder="请选择"
                           style="max-width:100%;"
                           filterable
                           clearable>
                  <el-option v-for="v in reimbursementNeedPay"
                             :key="v.code"
                             :value="v.code"
                             :label="v.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="DATE">
                <el-date-picker v-model="search.date"
                                type="date"
                                placeholder="发生日期"
                                value-format="yyyy-MM-dd"
                                style="width:100%;"
                                clearable></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="LOCATION">
                <el-select v-model="search.location"
                           placeholder="发生地点"
                           style="width:100%;"
                           filterable
                           clearable>
                  <el-option v-for="location in locationList"
                             :key="location.code"
                             :value="location.code"
                             :label="location.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="COMPANY">
                <el-select v-model="search.company"
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
          </el-row>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="MONTH">
                <el-date-picker v-model="search.paymentMonth"
                                type="month"
                                placeholder="选择报销月份"
                                format="yyyy-MM"
                                value-format="yyyy-MM"
                                style="width:100%;"
                                clearable></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="TYPE">
                <el-select v-model="search.type"
                           @change="typeChange"
                           placeholder="类别"
                           style="width:100%;"
                           filterable
                           clearable>
                  <el-option v-for="type in typeList"
                             :key="type.code"
                             :value="type.code"
                             :label="type.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="KIND">
                <el-select v-model="search.kind"
                           placeholder="项目"
                           style="width:100%;"
                           filterable
                           clearable>
                  <el-option v-for="kind in currentKindList"
                             :key="kind.code"
                             :value="kind.code"
                             :label="kind.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="INVOICE NO.">
                <el-input v-model="search.invoiceNo"
                          size="small"
                          clearable
                          placeholder="发票号"
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="SUM">
                <el-input v-model="search.sum"
                          size="small"
                          clearable
                          placeholder="总金额"
                          style="width:100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="DESCRIPTION">
                <el-input v-model="search.description"
                          size="small"
                          style="width:100%;"
                          clearable
                          placeholder="描述"></el-input>
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
<script src="./reimbursementItemList.js"></script>
