<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文件列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-form @submit.native.prevent
               style="display:inline-block;width:250px;">
        <el-form-item label
                      style="mergin-bottom:0px;">
          <el-input v-model="search"
                    autocomplete="off"
                    @keyup.enter.native="sureSearchDialog"
                    @input="sureSearchDialog"
                    @clear="sureSearchDialog"
                    clearable
                    placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-upload"
                 @click="openUploadFileDialog">上传文件</el-button>
    </div>
    <template>
      <!-- <downloadFile :files="table.content"
                    v-on:delete-file-success="query"></downloadFile> -->
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
        <el-table-column prop="originalFileName"
                         label="创建人"></el-table-column>
        <el-table-column prop="createUserName"
                         width="100"
                         label="创建人"></el-table-column>
        <el-table-column prop="createTime"
                         width="180"
                         label="创建时间"></el-table-column>
        <el-table-column label="操作"
                         width="120px">
          <template slot-scope="file">
            <el-button type="primary"
                       icon="el-icon-download"
                       size="mini"
                       circle
                       title="下载文件"
                       @click="downloadFile(file.row)"></el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       circle
                       title="删除文件"
                       @click="deleteFile(file.row)"></el-button>
          </template>
        </el-table-column>
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
    <!--上传文件对话框-->
    <el-dialog title="上传文件"
               :visible.sync="showUploadFileDialog">
      <uploadFile :uploadFileData="uploadFileData"
                  v-on:upload_file_success="queryUploadFiles"></uploadFile>
    </el-dialog>
  </div>
</template>
<script src="./filelist.js"></script>
<style>
.el-form-item {
  margin-bottom: 0px;
  margin-top: 0px;
}
</style>
