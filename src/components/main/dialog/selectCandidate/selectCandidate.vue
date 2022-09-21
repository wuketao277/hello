<template>
  <div>
    <div class="toolbar">
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item label style="mergin-bottom:0px;">
          <el-input
            v-model="search"
            autocomplete="off"
            @keyup.enter.native="sureSearchDialog"
            placeholder="输入关键字后，回车即可搜索。"
          ></el-input>
        </el-form-item>
      </el-form>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="success" size="small" @click="sureDialog" icon="el-icon-circle-check">确 定</el-button>
      <el-button type="warning" size="small" @click="cancelDialog" icon="el-icon-circle-close">取 消</el-button>
    </div>
    <el-table
      :data="candidateList"
      @current-change="handleCurrentChange"
      @row-dblclick="handleRowDblClick"
      :border="true"
      :highlight-current-row="true"
      :max-height="400"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="id" label="后续人id" width="80"></el-table-column>
      <el-table-column prop="chineseName" label="中文名称" width="80"></el-table-column>
      <el-table-column prop="englishName" label="英文名称" width="80"></el-table-column>
      <el-table-column prop="phoneNo" label="手机"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="age" label="年龄" width="60"></el-table-column>
      <el-table-column prop="companyName" label="公司"></el-table-column>
      <el-table-column prop="department" label="部门"></el-table-column>
      <el-table-column prop="title" label="职位"></el-table-column>
    </el-table>
  </div>
</template>
<script src="./selectCandidate.js"></script>
