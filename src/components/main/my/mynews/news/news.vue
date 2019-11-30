<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/my/mynews/newslist' }">我的新闻</el-breadcrumb-item>
      <el-breadcrumb-item>新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" style="mergin-top:20px;">
      <el-form-item label="新闻id">
        <span>{{form.id}}</span>
      </el-form-item>
      <el-form-item label="新闻标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="新闻链接">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="新闻内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./news.js"></script>
