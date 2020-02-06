<template>
  <div style="text-align:left;">
    <div
      v-for="file in files"
      :key="file"
      style="display:inline-block;margin:5px;text-align:center;"
    >
      <el-card shadow="always" style="width:200px;padding:0px;font-size:20px;">
        <img src="@/assets/document.jpg" style="width:70px;">
        <br>
        <span>{{file.originalFileName}}</span>
        <br>
        <el-row>
          <el-col :span="12">
            <el-button
              type="primary"
              icon="el-icon-download"
              size="mini"
              circle
              title="下载文件"
              @click="downloadFile(file)"
            ></el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              title="删除文件"
              @click="deleteFile(file)"
            ></el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script src="./downloadFile.js"></script>
