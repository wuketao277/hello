<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/client/clientlist'}">客户列表</el-breadcrumb-item>
      <el-breadcrumb-item>联系人</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar">
      <el-button v-show="(mode === 'add' || mode === 'modify')"
                 type="success"
                 size="small"
                 icon="el-icon-circle-check"
                 @click="save">保 存</el-button>
      <el-button v-show="(mode === 'add' || mode === 'modify')"
                 type="warning"
                 size="small"
                 icon="el-icon-delete"
                 @click="cancel">取 消</el-button>
      <!-- <el-button type="primary" size="small" icon="el-icon-back" @click="returnClient">返回</el-button> -->
    </div>
    <el-form ref="form"
             :model="form"
             label-width="80px"
             label-position="left"
             size="small"
             style="margin-top:10px;text-align:left;">
      <el-form-item label="客户名称">{{form.clientName}}</el-form-item>
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
      <el-form-item label="备注">
        <el-input v-model="form.comments"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 100}"
                  maxlength="400"
                  show-word-limit
                  clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./clientlinkman.js"></script>
