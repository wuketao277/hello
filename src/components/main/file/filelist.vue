<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文件列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item label="" style="mergin-bottom:0px;">
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="query" placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" icon="el-icon-search" v-if="showSearchResult" @click="query(true)">取消搜索</el-button>
      <el-upload
        class="upload-demo"
        action="http://www.helloapplicant.com/uploadFile/uploadFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :accept="xlsx"
        multiple
        :limit="3"
        :file-list="fileList"
        :on-success="uploadFileSuccess"
        style="display:inline;"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <template>
      <downloadFile :files="table.content" v-on:delete-file-success="query"></downloadFile>
      <el-pagination
        background
        layout="prev, pager, next"
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
  </div>
</template>
<script src="./filelist.js"></script>
<style>
.el-form-item {
  margin-bottom: 0px;
  margin-top: 0px;
}
</style>
