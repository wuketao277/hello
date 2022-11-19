<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/role/rolelist' }">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>角色</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             label-position="left"
             size="small"
             :model="form"
             label-width="80px"
             style="text-align:left;"
             :rules="rules">
      <el-form-item label="id">
        <span>{{form.id}}</span>
      </el-form-item>
      <el-form-item label="角色名称"
                    prop="name">
        <el-input v-model="form.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述"
                    prop="description">
        <el-input v-model="form.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar"
         v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-check"
                 @click="saveRole">保 存</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-delete"
                 @click="cancel">取 消</el-button>
    </div>
  </div>
</template>
<script src="./role.js"></script>
