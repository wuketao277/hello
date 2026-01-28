<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/bigEvent/bigEventList' }">大事件列表</el-breadcrumb-item>
      <el-breadcrumb-item>大事件</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-check"
                 v-show="mode === 'add' || mode === 'modify'"
                 @click="save">保 存</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-delete"
                 v-show="mode === 'add' || mode === 'modify'"
                 @click="cancel">取
        消</el-button>
    </div>
    <el-form ref="form"
             label-position="left"
             size="small"
             :model="form"
             label-width="80px"
             style="text-align:left;"
             :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="创建人"
                        prop="createUserName">
            <span>{{ form.createUserName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间"
                        prop="createDateTime">
            <span>{{ form.createDateTime }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题"
                        prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="内容">
            <el-input type="textarea"
                      :rows="30"
                      v-model="form.detail"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script src="./bigEventInfo.js"></script>
