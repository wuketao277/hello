<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/client/clientlist'}">客户列表</el-breadcrumb-item>
      <el-breadcrumb-item>联系人</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-form-item label="客户名称">{{form.clientName}}
      </el-form-item>
      <el-form-item label="中文名">
        <el-input v-model="form.chineseName"></el-input>
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="form.englishName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.mobileNo"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="座机">
        <el-input v-model="form.phoneNo"></el-input>
      </el-form-item>
    </el-form>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar">
      <el-button v-show="(mode === 'add' || mode === 'modify')" type="success" size="small" icon="el-icon-circle-check" @click="save">保存</el-button>
      <el-button v-show="(mode === 'add' || mode === 'modify')" type="danger" size="small" icon="el-icon-delete" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" icon="el-icon-back" @click="returnClient">返回</el-button>
    </div>
  </div>
</template>
<script src="./clientlinkman.js"></script>
