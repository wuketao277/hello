<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/client/clientlist'}">客户列表</el-breadcrumb-item>
      <el-breadcrumb-item>客户</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保 存</el-button>
      <el-button type="warning" size="small" icon="el-icon-circle-close" @click="cancel">取 消</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-upload"
        @click="openUploadFileDialog"
      >上传文件</el-button>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="中文名" prop="chineseName">
            <el-input v-model="form.chineseName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="英文名">
            <el-input v-model="form.englishName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col>
          <el-form-item label="客户备注">
            <el-input
              type="textarea"
              v-model="form.remark"
              :autosize="{ minRows: 2, maxRows: 30}"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col>
          <el-form-item label="发票联系信息">
            <el-input
              type="textarea"
              v-model="form.invoiceContact"
              :autosize="{ minRows: 2, maxRows: 30}"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col>
          <el-form-item label="发票备注">
            <el-input
              type="textarea"
              v-model="form.invoiceRemark"
              :autosize="{ minRows: 2, maxRows: 30}"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs type="border-card">
      <el-tab-pane label="联系人">
        <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
          <el-button type="success" size="small" icon="el-icon-circle-plus" @click="addLinkMan">新增</el-button>
          <el-button type="warning" size="small" icon="el-icon-edit" @click="modifyLinkMan">修改</el-button>
          <el-button type="primary" size="small" icon="el-icon-share" @click="detailLinkMan">查看</el-button>
        </div>
        <template>
          <el-table
            :data="clientLinkManTable"
            :border="true"
            style="width: 100%"
            @current-change="linkManRowChange"
            @row-dblclick="modifyLinkMan"
            :highlight-current-row="true"
            :stripe="true"
          >
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="chineseName" label="联系人中文名"></el-table-column>
            <el-table-column prop="englishName" label="联系人英文名"></el-table-column>
            <el-table-column prop="mobileNo" label="手机号"></el-table-column>
            <el-table-column prop="phoneNo" label="座机号"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
      <el-tab-pane label="文件">
        <!--附件开始-->
        <downloadFile :files="uploadFiles" v-on:delete-file-success="queryUploadFiles"></downloadFile>
        <!--附件结束-->
      </el-tab-pane>
      <el-tab-pane label="合同" v-if="showControl('clientContract')">
        <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
          <el-button
            type="success"
            size="small"
            icon="el-icon-circle-plus"
            @click="addClientContract"
          >新增</el-button>
          <el-button
            type="warning"
            size="small"
            icon="el-icon-edit"
            @click="modifyClientContract"
          >修改</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="detailClientContract"
          >查看</el-button>
        </div>
        <template>
          <el-table
            :data="clientContractTable"
            :border="true"
            style="width: 100%"
            @current-change="clientContractTableRowChange"
            :highlight-current-row="true"
            :stripe="true"
            @row-dblclick="modifyClientContract"
          >
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="id" label="Id"></el-table-column>
            <el-table-column
              prop="company"
              width="200"
              label="Company"
              :formatter="formatCompany"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="category" width="100" label="Category" show-overflow-tooltip></el-table-column>
            <el-table-column
              prop="effectiveDate"
              width="120"
              label="Effective Date"
              :formatter="formatDate"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="expireDate"
              width="120"
              label="Expire Date"
              :formatter="formatDate"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="feeRate" width="100" label="Fee Rate" show-overflow-tooltip></el-table-column>
            <el-table-column
              prop="guaranteePeriod"
              width="150"
              label="Guarantee Period"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="paymentPeriod"
              width="150"
              label="Payment Period"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="containTax"
              width="100"
              label="Contain Tax"
              :formatter="formatContainTax"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="industry" width="120" label="Industry" show-overflow-tooltip></el-table-column>
            <el-table-column prop="type" width="100" label="Type" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bdUserName" width="100" label="BD" show-overflow-tooltip></el-table-column>
            <el-table-column prop="location" width="100" label="Location" show-overflow-tooltip></el-table-column>
            <el-table-column prop="note" width="100" label="Note" show-overflow-tooltip></el-table-column>
            <el-table-column prop="comments" width="100" label="Comments" show-overflow-tooltip></el-table-column>
            <el-table-column prop="forbid" width="100" label="Forbid" show-overflow-tooltip></el-table-column>
            <el-table-column
              prop="receiveDate"
              width="120"
              label="Receive Date"
              :formatter="formatDate"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>
    <!--上传文件对话框-->
    <el-dialog title="上传文件" :visible.sync="showUploadFileDialog">
      <uploadFile :uploadFileData="uploadFileData" v-on:upload_file_success="queryUploadFiles"></uploadFile>
    </el-dialog>
  </div>
</template>
<script src="./client.js"></script>
