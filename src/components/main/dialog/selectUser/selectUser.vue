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
      :data="userList"
      @current-change="handleCurrentChange"
      :border="true"
      :highlight-current-row="true"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="id" label="用户id" width="80"></el-table-column>
      <el-table-column prop="username" label="登录名"></el-table-column>
      <el-table-column prop="realname" label="真实名称"></el-table-column>
    </el-table>
  </div>
</template>
<script src="./selectUser.js"></script>
