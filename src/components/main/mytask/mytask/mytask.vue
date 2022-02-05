<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mytask/mytasklist' }">任务列表</el-breadcrumb-item>
      <el-breadcrumb-item>我的任务</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-check" v-show="mode === 'add' && !saved" @click="save">保存</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" v-show="mode === 'add' && !saved" @click="cancel">取消</el-button>
      <el-button type="success" size="small" icon="el-icon-circle-check" v-show="mode === 'modify'" @click="update">完成</el-button>
    </div>
    <el-form
      ref="form"
      label-position="left"
      size="small"
      :model="form"
      label-width="80px"
      style="text-align:left;"
      :rules="rules"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="任务标题" prop="taskTitle">
            <el-input v-model="form.taskTitle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="执行日期" prop="executeDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.executeDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="mode === 'add'">
        <el-col :span="24">
          <el-form-item label="执行人">
            <el-checkbox-group v-model="selectUsers">
              <el-checkbox v-for="user in users" :key="user" :label="user">{{user.realname}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="任务内容">
            <el-input type="textarea" v-model="form.taskContent"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="mode === 'modify'">
        <el-col :span="24">
          <el-form-item label="完成状态">
            <el-switch v-model="form.finished" active-color="#13ce66" inactive-color="#999999"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="mode === 'modify'">
        <el-col :span="24">
          <el-form-item label="执行结果">
            <el-input type="textarea" v-model="form.executeResult"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script src="./mytask.js"></script>
