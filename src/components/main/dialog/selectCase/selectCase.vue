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
    <el-form @submit.native.prevent>
      <el-row :gutter="40">
        <el-col :span="10">
          <el-form-item label
                        style="mergin-bottom:0px;">
            <el-input v-model="search"
                      autocomplete="off"
                      @keyup.enter.native="sureSearchDialog"
                      placeholder="输入关键字后，回车即可搜索。"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item>
            <el-radio-group v-model="status"
                            @change="sureSearchDialog">
              <el-radio label="ALL">全部</el-radio>
              <el-radio label="PREPARE">准备</el-radio>
              <el-radio label="DOING">进行中</el-radio>
              <el-radio label="FINISH">完成</el-radio>
              <el-radio label="PAUSE">暂停</el-radio>
              <el-radio label="CLOSE">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="caseList"
              @current-change="handleCurrentChange"
              @row-dblclick="handleRowDblClick"
              :border="true"
              :highlight-current-row="true"
              :max-height="400"
              style="width: 100%">
      <el-table-column type="index"
                       width="50"
                       label="序号"></el-table-column>
      <el-table-column prop="id"
                       width="100"
                       label="职位id"></el-table-column>
      <el-table-column prop="clientChineseName"
                       width="200"
                       label="客户名称"></el-table-column>
      <el-table-column prop="title"
                       label="职位名称"></el-table-column>
      <el-table-column prop="status"
                       width="100"
                       :formatter="this.getStatusName"
                       label="状态"></el-table-column>
    </el-table>
  </div>
</template>
<script src="./selectCase.js"></script>
