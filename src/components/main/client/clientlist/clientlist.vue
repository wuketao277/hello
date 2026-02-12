<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs type="border-card">
      <el-tab-pane label="客户列表">
        <div class="toolbar">
          <el-button type="success"
                     size="small"
                     icon="el-icon-circle-plus"
                     @click="add"
                     v-if="showControl('addClient')">新 增</el-button>
          <el-button type="warning"
                     size="small"
                     icon="el-icon-edit"
                     @click="modify"
                     v-if="showControl('modifyClient')">修 改</el-button>
          <el-button type="primary"
                     size="small"
                     icon="el-icon-share"
                     @click="detail">查 看</el-button>
          <el-form @submit.native.prevent
                   style="display:inline-block;width:250px;">
            <el-form-item label
                          style="margin-bottom:0px;">
              <el-input v-model="search"
                        autocomplete="off"
                        @keyup.enter.native="sureSearchDialog"
                        @input="sureSearchDialog"
                        placeholder="输入关键字后，回车即可搜索。"
                        @clear="sureSearchDialog"
                        clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
        <template>
          <el-table :data="table.content"
                    :border="true"
                    :highlight-current-row="true"
                    :stripe="true"
                    :row-class-name="rowStyle"
                    style="width: 100%"
                    @current-change="rowChange"
                    @row-dblclick="handleDBClick">
            <el-table-column type="index"
                             width="50"
                             label="序号"></el-table-column>
            <el-table-column prop="id"
                             width="100"
                             label="编号"></el-table-column>
            <el-table-column prop="chineseName"
                             label="中文名称"></el-table-column>
            <el-table-column prop="englishName"
                             label="英文名称"></el-table-column>
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
      </el-tab-pane>
      <el-tab-pane label="合同列表"
                   v-if="showControl('contractList')">
        <el-table :data="clientContractTable.content"
                  :border="true"
                  style="width: 100%"
                  @current-change="clientContractTableRowChange"
                  :highlight-current-row="true"
                  :stripe="true"
                  @row-dblclick="modifyClientContract">
          <el-table-column type="index"
                           width="50"
                           label="序号"></el-table-column>
          <el-table-column prop="clientChineseName"
                           width="150"
                           label="客户名称"
                           :show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="expireDate"
                           width="100"
                           label="结束日期"
                           :formatter="formatDate"
                           :show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="feeRate"
                           width="150"
                           label="费率"
                           :show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="guaranteePeriod"
                           width="150"
                           label="保证期"
                           :show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="candidateOwnPeriod"
                           width="150"
                           label="人选归属期"
                           :show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="containTax"
                           width="80"
                           label="是否含税"
                           :formatter="formatContainTax"
                           :show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="comments"
                           width="200"
                           label="备注"
                           :show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="company"
                           width="200"
                           label="签约公司"
                           :formatter="formatCompany"></el-table-column>
          <el-table-column prop="category"
                           width="100"
                           label="合同类型"></el-table-column>
          <el-table-column prop="effectiveDate"
                           width="120"
                           label="生效日期"
                           :formatter="formatDate"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="paymentPeriod"
                           width="150"
                           label="付款期"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="industry"
                           width="120"
                           label="行业"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="type"
                           width="100"
                           label="合同类别"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="bdUserName"
                           width="100"
                           label="BD"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="location"
                           width="100"
                           label="地点"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="note"
                           width="100"
                           label="便签"
                           show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="forbid"
                           width="100"
                           label="禁止条款"
                           show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="receiveDate"
                           width="120"
                           label="合同收到日期"
                           :formatter="formatDate"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./clientlist.js"></script>
