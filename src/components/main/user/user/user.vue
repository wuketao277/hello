<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user/userlist'}">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保存</el-button>
      <el-button type="danger" size="small" icon="el-icon-circle-close" @click="cancel">取消</el-button>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-form-item label="序号">
        <el-input v-model="form.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.realname"></el-input>
      </el-form-item>
      <el-form-item label="登录名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.enabled" active-color="#13ce66" inactive-color="#ff4949" active-text="正常" inactive-text="停用"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./user.js"></script>
