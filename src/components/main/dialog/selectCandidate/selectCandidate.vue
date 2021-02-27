<template>
  <div>
    <div class="toolbar">
      <el-button type="primary" size="small" @click="cancelDialog">取 消</el-button>
      <el-button type="primary" size="small" @click="sureDialog">确 定</el-button>
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item label="" style="mergin-bottom:0px;">
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="sureSearchDialog" placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="candidateList"
      @current-change="handleCurrentChange"
      :border="true"
      :highlight-current-row="true"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
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
