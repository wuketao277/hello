<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/case/caselist'}">职位列表</el-breadcrumb-item>
      <el-breadcrumb-item>职位</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-form-item label="客户">
        <el-select v-model="form.clientId" placeholder="请选择客户">
          <el-option
            v-for="client in clients"
            :key="client.id"
            :value="client.id"
            :label="client.chineseName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="职位名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职位状态">
            <el-radio-group v-model="form.status">
              <el-radio label="PREPARE">准备</el-radio>
              <el-radio label="DOING">进行中</el-radio>
              <el-radio label="FINISH">完成</el-radio>
              <el-radio label="PAUSE">暂停</el-radio>
              <el-radio label="CLOSE">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="职位描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保存</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script src="./case.js"></script>
