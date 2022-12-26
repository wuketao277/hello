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
      <el-form @submit.native.prevent
               style="display:inline-block;width:250px;">
        <el-form-item label
                      style="margin-bottom:0px;">
          <el-input v-model="search"
                    autocomplete="off"
                    placeholder="输入关键字后，回车即可搜索。"
                    @change="searchChange"
                    clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="hrList"
              @current-change="handleCurrentChange"
              @row-dblclick="handleRowDblClick"
              :border="true"
              :highlight-current-row="true"
              :max-height="400"
              style="width: 100%">
      <el-table-column type="index"
                       width="50"
                       label="序号"></el-table-column>
      <el-table-column prop="englishName"
                       width="150"
                       label="英文名"></el-table-column>
      <el-table-column prop="chineseName"
                       width="150"
                       label="中文名"></el-table-column>
      <el-table-column prop="clientName"
                       label="客户名称"></el-table-column>
    </el-table>
  </div>
</template>
<script src="./selectHr.js"></script>
