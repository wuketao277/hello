<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/school/schoolTypeList'}">学校列表</el-breadcrumb-item>
      <el-breadcrumb-item>学校</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar"
         v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-check"
                 @click="save">保 存</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-circle-close"
                 @click="cancel">取 消</el-button>
    </div>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-position="left"
             label-width="80px"
             size="small"
             style="margin-top:10px;text-align:left;">
      <el-row :gutter="12">
        <el-col :span="16">
          <el-form-item label="学校名称"
                        prop="schoolName">
            <el-input v-model="form.schoolName"
                      maxlength="100"
                      show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-switch v-model="form.isPublic"
                 inactive-text="民办"
                 active-text="公办"
                 active-color="#13ce66"
                 inactive-color="#ff0000"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script src="./schoolType.js"></script>
