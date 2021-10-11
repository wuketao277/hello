<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/salary/salarySpecialItemList'}">工资特殊项列表</el-breadcrumb-item>
      <el-breadcrumb-item>工资特殊项</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保存</el-button>
      <el-button type="danger" size="small" icon="el-icon-circle-close" @click="cancel">取消</el-button>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-row>
        <el-col :span="4">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectConsultantDialog"
            >顾问</el-button>
            <span>{{form.consultantRealName}}</span>
        </el-col>
        <el-col :span="8">
          <el-form-item label="月份" label-width="60px">
           <el-date-picker
              v-model="form.month"
              type="month"
              placeholder="选择月"
              format="yyyy-MM"
              value-format="yyyy-MM">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="金额" label-width="40px">
            <el-input v-model="form.sum" size="small" clearable style="width:150px;" placeholder="特殊项金额"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述" label-width="40px">
            <el-input v-model="form.description" size="small" clearable style="width:500px;" placeholder="特殊项描述"></el-input>
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
