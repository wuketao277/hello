<template>
  <div>
    <div class="toolbar">
      <el-button type="success"
                 size="small"
                 @click="sureDialog"
                 icon="el-icon-circle-check">确 定</el-button>
      <el-button type="warning"
                 size="small"
                 @click="cancelDialog"
                 icon="el-icon-circle-close">取 消</el-button>
    </div>
    <el-table :data="caseList"
                @row-dblclick="handleRowDblClick"
              @current-change="handleCurrentChange"
                
                :border="true"
                :highlight-current-row="true"
                :stripe="true"
                style="width: 100%">
        <el-table-column type="index"
                         width="50"
                         label="序号"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="caseId"
                         width="100"
                         label="职位id"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="clientChineseName"
                         label="客户名称"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="caseTitle"
                         label="职位名称"
                         show-overflow-tooltip></el-table-column>
      </el-table>
  </div>
</template>
<script src="./myCase.js"></script>
