<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/salary/costInvoiceUsedList'}">成本发票使用列表</el-breadcrumb-item>
      <el-breadcrumb-item>成本发票使用</el-breadcrumb-item>
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
             label-width="80px"
             label-position="left"
             size="small"
             style="margin-top:10px;text-align:left;">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="id">
            <span>{{form.id}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary"
                     size="small"
                     icon="el-icon-share"
                     @click="selectConsultantDialogShow = true">顾问</el-button>
          <span>{{form.consultantUserName}}</span>
        </el-col>
        <el-col :span="6">
          <el-form-item label="使用日期">
            <el-date-picker v-model="form.usedDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="使用金额"
                        required>
            <el-input v-model="form.sum"
                      type="number"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea"
                      v-model="form.remark"
                      :autosize="{ minRows: 1, maxRows: 30}"
                      style="width:100%;"
                      ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择顾问"
               :visible.sync="selectConsultantDialogShow">
      <selectUser v-on:cancel-dialog="selectConsultantDialogShow = false"
                  v-on:sure-dialog="sureSelectConsultantDialog"></selectUser>
    </el-dialog>
  </div>
</template>
<script src="./costInvoiceUsed.js"></script>
