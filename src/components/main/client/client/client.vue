<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/client/clientlist'}">客户列表</el-breadcrumb-item>
      <el-breadcrumb-item>客户</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保存</el-button>
      <el-button type="danger" size="small" icon="el-icon-circle-close" @click="cancel">取消</el-button>
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
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-form-item label="中文名">
        <el-input v-model="form.chineseName"></el-input>
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="form.englishName"></el-input>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card">
      <el-tab-pane label="评论">
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
            @current-change="rowChange"
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
    </el-tabs>
    <!--上传文件对话框-->
    <el-dialog title="上传文件" :visible.sync="showUploadFileDialog">
      <uploadFile :uploadFileData="uploadFileData" v-on:upload_file_success="queryUploadFiles"></uploadFile>
    </el-dialog>
  </div>
</template>
<script src="./client.js"></script>
