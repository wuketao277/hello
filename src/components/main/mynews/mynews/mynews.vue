<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mynews/mynewslist' }">我的新闻</el-breadcrumb-item>
      <el-breadcrumb-item>新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="saveNews">保 存</el-button>
      <el-button type="warning" size="small" icon="el-icon-delete" @click="cancel">取 消</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-upload"
        @click="openUploadFileDialog"
      >上传文件</el-button>
    </div>
    <el-form
      ref="form"
      label-position="left"
      size="small"
      :model="form"
      label-width="80px"
      style="text-align:left;"
      :rules="rules"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 2, maxRows: 100}"></el-input>
      </el-form-item>
      <el-form-item label="优先级" style="text-align:left;">
        <template>
          <el-radio v-model="form.priority" label="1">非常重要</el-radio>
          <el-radio v-model="form.priority" label="2">重要</el-radio>
          <el-radio v-model="form.priority" label="3">一般</el-radio>
          <el-radio v-model="form.priority" label="4">不重要</el-radio>
          <el-radio v-model="form.priority" label="5">可忽略</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-switch v-model="form.publish" active-color="#13ce66" inactive-color="#999999"></el-switch>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card">
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
<script src="./mynews.js"></script>
