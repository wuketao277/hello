<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <p></p>
    <el-tabs value="first" type="card" @tab-click="handleClick">
      <el-tab-pane label="修改密码" name="first">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          size="small"
          style="margin-top:10px;text-align:left;"
        >
          <el-form-item label="原密码">
            <el-input v-model="changePasswordForm.oldPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="changePasswordForm.newPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="changePasswordForm.newPassword2" type="password"></el-input>
          </el-form-item>
        </el-form>
        <!--工具栏-->
        <div class="toolbar">
          <el-button
            type="success"
            size="small"
            icon="el-icon-circle-check"
            @click="changePasswordSubmit"
          >提交</el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-circle-close"
            @click="changePasswordCancel"
          >取消</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./personalInfo.js"></script>
