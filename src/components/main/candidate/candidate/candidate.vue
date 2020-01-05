<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/candidate/candidatelist' }">候选人列表</el-breadcrumb-item>
      <el-breadcrumb-item>候选人</el-breadcrumb-item>
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
      <el-form-item label="中文名" prop="chineseName">
        <el-input v-model="form.chineseName"></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="englishName">
        <el-input v-model="form.englishName"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNo">
        <el-input v-model="form.phoneNo"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input v-model="form.department"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
    </el-form>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保存候选人</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="cancel">取消</el-button>
    </div>
    <hr style="background-color:#409EFF;height:1px;">
    <!--评论-->
    <el-row v-for="comment in comments" :key="comment" style="text-align:left;">
      <el-col :span="2">
        <div class="grid-content bg-purple">{{comment.inputUserName}}</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">{{comment.inputTime}}</div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple">{{comment.content}}</div>
      </el-col>
    </el-row>
    <el-form
      ref="newComment"
      label-position="left"
      size="small"
      :model="form"
      label-width="80px"
      style="text-align:left;">
      <el-form-item label="新评论" prop="content"  v-show="(mode === 'add' || mode === 'modify')">
        <el-input type="textarea" v-model="newComment.content"></el-input>
      </el-form-item>
    </el-form>
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="saveComment">保存评论</el-button>
    </div>
  </div>
</template>
<script src="./candidate.js"></script>
