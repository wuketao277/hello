<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/salary/salarySpecialItemList'}">工资特殊项列表</el-breadcrumb-item>
      <el-breadcrumb-item>工资特殊项</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保 存</el-button>
      <el-button type="warning" size="small" icon="el-icon-circle-close" @click="cancel">取 消</el-button>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-position="left"
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-row :gutter="12">
        <el-col :span="6">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectConsultantDialog"
            >顾问</el-button>
            <span>{{form.consultantRealName}}</span>
        </el-col>
        <el-col :span="6">
          <el-form-item label="月份">
           <el-date-picker
              v-model="form.month"
              type="month"
              placeholder="选择月"
              format="yyyy-MM"
              value-format="yyyy-MM"
              style="width:150px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金额">
            <el-input v-model="form.sum" size="small" clearable style="width:150px;" placeholder="特殊项金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="前置计算">
            <el-radio v-model="form.isPre" label="yes">是</el-radio>
            <el-radio v-model="form.isPre" label="no">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="描述">
            <el-input v-model="form.description" size="small" clearable style="width:100%;" placeholder="特殊项描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择顾问" :visible.sync="selectConsultantDialogShow">
      <selectUser
        v-on:cancel-dialog="selectConsultantDialogShow = false"
        v-on:sure-dialog="sureSelectConsultantDialog"
      ></selectUser>
    </el-dialog>
  </div>
</template>
<script src="./salarySpecialItem.js"></script>
