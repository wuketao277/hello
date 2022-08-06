<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/training/studyrecordlist' }">培训列表</el-breadcrumb-item>
      <el-breadcrumb-item>培训记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar" v-show="this.mode === 'modify'">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保 存</el-button>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-row :gutter="12">
        <el-col :span="0">
          <el-form-item label="id" prop="id">
            <span>{{form.id}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="课程名称" prop="lessonName">
            <span>{{form.lessonName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="学员名称" prop="username">
            <span>{{form.username}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签到时间" prop="signInTime">
            <span>{{form.signInTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="完成时间" prop="finishTime">
            <span>{{form.finishTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="学习时长" prop="hours">
            <span>{{form.hours}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="考核结果" prop="score">
            <el-input v-model="form.score" placeholder="请输入学员课程得分" style="width:150px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script src="./studyrecord.js"></script>
