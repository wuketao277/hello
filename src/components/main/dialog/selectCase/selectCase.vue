<template>
  <div>
    <div class="toolbar">
        <el-button type="primary" size="small" @click="cancelDialog">取 消</el-button>
        <el-button type="primary" size="small" @click="sureDialog">确 定</el-button>
      <el-button type="primary" size="small" icon="el-icon-search" @click="showSearchDialog = true">搜索</el-button>
    </div>
    <el-table
      :data="caseList"
      @current-change="handleCurrentChange"
      :border="true"
      :highlight-current-row="true"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="id" width="100" label="职位id"></el-table-column>
      <el-table-column prop="clientName" width="200" label="客户名称"></el-table-column>
      <el-table-column prop="title" label="职位名称"></el-table-column>
      <el-table-column prop="status" width="100" :formatter="this.getStatusName" label="状态"></el-table-column>
    </el-table>
    <!--搜索对话框-->
    <el-dialog title="搜索" :visible.sync="showSearchDialog">
      <el-form @submit.native.prevent>
        <el-form-item label="搜索内容">
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="sureSearchDialog"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSearchDialog">取 消</el-button>
        <el-button type="primary" @click="sureSearchDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./selectCase.js"></script>
