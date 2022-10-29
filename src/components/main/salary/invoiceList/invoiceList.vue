<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发票列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="add">新 增</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modify">修 改</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detail">查 看</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteById">删 除</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="searchDialog = true">搜 索</el-button>
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
      >
        <el-table-column type="index" width="50" label="序号" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="createDate"
          :formatter="formatDate"
          width="120"
          label="开票日期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="sum" width="120" label="发票金额" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="type"
          width="100"
          label="发票类型"
          show-overflow-tooltip
          :formatter="formatType"
        ></el-table-column>
        <el-table-column prop="clientChineseName" width="300" label="客户名称"></el-table-column>
        <el-table-column prop="kind" width="100" label="品类" show-overflow-tooltip></el-table-column>
        <el-table-column prop="po" width="100" label="PO"></el-table-column>
        <el-table-column prop="contact" width="300" label="联系信息"></el-table-column>
        <el-table-column prop="amName" width="100" label="AM" show-overflow-tooltip></el-table-column>
        <el-table-column prop="candidateChineseName" width="100" label="候选人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" width="300" label="备注"></el-table-column>
        <el-table-column
          prop="sendDate"
          :formatter="formatDate"
          width="120"
          label="寄出日期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="receiveDate"
          :formatter="formatDate"
          width="120"
          label="收到日期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cancel"
          width="100"
          label="是否作废"
          show-overflow-tooltip
          :formatter="formatCancel"
        ></el-table-column>
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
        @prev-click="prevClick"
        @next-click="nextClick"
      ></el-pagination>
    </template>
    <el-dialog title="搜索" :visible="searchDialog" :show-close="false" width="60%">
      <div>
        <el-form label-position="left" label-width="70px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="开票日期">
                <el-date-picker
                  type="date"
                  placeholder="开始日期"
                  v-model="search.createDateStart"
                  style="width: 140px;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                <span>-</span>
                <el-date-picker
                  type="date"
                  placeholder="结束日期"
                  v-model="search.createDateEnd"
                  style="width: 140px;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户">
                <el-select
                  v-model="search.clientId"
                  placeholder="请选择客户"
                  style="width:100%;"
                  clearable
                >
                  <el-option
                    v-for="client in clients"
                    :key="client.id"
                    :value="client.id"
                    :label="client.chineseName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="AM">
                <el-select
                  v-model="search.consultantId"
                  placeholder="请选择顾问"
                  clearable
                  style="width:100%;"
                >
                  <el-option
                    v-for="consultant in consultants"
                    :key="consultant.id"
                    :value="consultant.id"
                    :label="consultant.username"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发票类型">
                <el-select
                  v-model="search.type"
                  placeholder="请选择发票类型"
                  clearable
                  style="width:100%;"
                >
                  <el-option
                    v-for="type in types"
                    :key="type.code"
                    :value="type.code"
                    :label="type.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="正常/作废">
                <el-switch
                  v-model="search.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="正常"
                  inactive-text="作废"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="searchDialog = false">取 消</el-button>
          <el-button type="primary" @click="query">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./invoiceList.js"></script>
