<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/client/clientlist'}">客户列表</el-breadcrumb-item>
      <el-breadcrumb-item>客户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" size="small" style="margin-top:10px;text-align:left;">
      <el-form-item label="id">
        <span>{{form.id}}</span>
      </el-form-item>
      <el-form-item label="中文名">
        <el-input v-model="form.chineseName"></el-input>
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="form.englishName"></el-input>
      </el-form-item>
      <el-form-item label="通讯地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="中文姓名">
        <el-input v-model="form.personChineseName"></el-input>
      </el-form-item>
      <el-form-item label="英文姓名">
        <el-input v-model="form.personEnglishName"></el-input>
      </el-form-item>
      <el-form-item label="通讯电话">
        <el-input v-model="form.phoneNo"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./client.js"></script>
