<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/salary/salaryList'}">工资列表</el-breadcrumb-item>
      <el-breadcrumb-item>工资</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(this.mode === 'add' || this.mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保 存</el-button>
      <el-button type="warning" size="small" icon="el-icon-circle-close" @click="cancel">取 消</el-button>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="登录名">
            <span>{{form.consultantUserName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="顾问姓名">
            <span>{{form.consultantRealName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="月份">
            <span>{{form.month}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="历史负债">
            <span>{{form.historyDebt}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="税前工资">
            <span>{{form.sum}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所得税">
            <el-input v-model="form.personalTax"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="保险">
            <el-input v-model="form.insurance"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="公积金">
            <el-input v-model="form.gongjijin"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="工作日">
            <el-input v-model="form.workingDays"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="详情">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 100}"
              v-model="form.description"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script src="./salary.js"></script>
