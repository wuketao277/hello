<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/my/mynews/newslist' }">我的新闻</el-breadcrumb-item>
      <el-breadcrumb-item>新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      label-position="left"
      size="small"
      :model="form"
      label-width="80px"
      style="text-align:left;"
      :rules="rules"
    >
      <el-form-item label="id">
        <span>{{form.id}}</span>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="优先级" style="text-align:left;">
        <template>
          <el-radio v-model="form.priority" label="1">非常重要</el-radio>
          <el-radio v-model="form.priority" label="2">重要</el-radio>
          <el-radio v-model="form.priority" label="3">一般</el-radio>
          <el-radio v-model="form.priority" label="4">不重要</el-radio>
          <el-radio v-model="form.priority" label="5">可忽略</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-switch v-model="form.publish" active-color="#13ce66" inactive-color="#999999"></el-switch>
      </el-form-item>
    </el-form>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="saveNews">保存</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script src="./news.js"></script>
