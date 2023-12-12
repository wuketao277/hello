<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/salary/kpiworkdaysadjustList'}">KPI工作日调整列表</el-breadcrumb-item>
      <el-breadcrumb-item>KPI工作日调整</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar"
         v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-check"
                 @click="save">保 存</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-circle-close"
                 @click="cancel">取 消</el-button>
    </div>
    <el-form ref="form"
             :model="form"
             label-width="100px"
             label-position="left"
             size="small"
             style="margin-top:10px;text-align:left;">
      <el-row :gutter="20">
        <el-col :span="6">
          <span style="color:red;">*</span>
          <el-button type="primary"
                     size="small"
                     icon="el-icon-share"
                     @click="openSelectUserDialog">Name</el-button>
          <span>{{form.userName}}</span>
        </el-col>
        <el-col :span="6">
          <el-form-item label="调整日期"
                        required>
            <el-date-picker v-model="form.adjustDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="调整天数"
                        required>
            <el-input v-model="form.adjustDays"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.remark"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择用户"
               :visible.sync="selectUserDialogShow">
      <selectUser v-on:cancel-dialog="selectUserDialogShow = false"
                  v-on:sure-dialog="sureSelectUserDialog"></selectUser>
    </el-dialog>
  </div>
</template>
<script src="./kpiworkdaysadjust.js"></script>
