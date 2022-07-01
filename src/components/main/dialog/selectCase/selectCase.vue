<template>
  <div>
    <div class="toolbar">
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item label="" style="mergin-bottom:0px;">
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="sureSearchDialog" placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="success" size="small" @click="sureDialog" icon="el-icon-circle-check">确 定</el-button>
      <el-button type="warning" size="small" @click="cancelDialog" icon="el-icon-circle-close">取 消</el-button>
    </div>
    <el-table
      :data="caseList"
      @current-change="handleCurrentChange"
      :border="true"
      :highlight-current-row="true"
      :max-height="400"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="id" width="100" label="职位id"></el-table-column>
      <el-table-column prop="clientChineseName" width="200" label="客户名称"></el-table-column>
      <el-table-column prop="title" label="职位名称"></el-table-column>
      <el-table-column prop="status" width="100" :formatter="this.getStatusName" label="状态"></el-table-column>
    </el-table>
  </div>
</template>
<script src="./selectCase.js"></script>
