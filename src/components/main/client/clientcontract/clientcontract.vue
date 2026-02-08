<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/client/clientlist'}">客户列表</el-breadcrumb-item>
      <el-breadcrumb-item>客户合同</el-breadcrumb-item>
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
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="客户">{{form.clientChineseName}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约公司">
            <el-select v-model="form.company"
                       style="width:100%;"
                       filterable
                       clearable>
              <el-option v-for="company in companyList"
                         :key="company.code"
                         :value="company.code"
                         :label="company.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-button type="primary"
                     size="small"
                     icon="el-icon-share"
                     @click="openSelectBDDialog"
                     style="width:85px;">BD</el-button>
          <span>{{form.bdUserName}}</span>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同类型">
            <el-select v-model="form.category"
                       placeholder="请选择"
                       style="width:100%;"
                       @change="categoryChange"
                       filterable
                       clearable>
              <el-option v-for="category in categoryList"
                         :key="category"
                         :value="category"
                         :label="category"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否含税">
            <el-switch v-model="form.containTax"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="含税"
                       inactive-text="未税"
                       clearable></el-switch>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="Type">
            <el-select v-model="form.type"
                       placeholder="请选择"
                       style="width:100%;"
                       filterable
                       clearable>
              <el-option v-for="type in typeList"
                         :key="type.code"
                         :value="type.code"
                         :label="type.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="生效日期">
            <el-date-picker v-model="form.effectiveDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"
                            clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束日期">
            <el-date-picker v-model="form.expireDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"
                            clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收到日期">
            <el-date-picker v-model="form.receiveDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"
                            clearable></el-date-picker>
          </el-form-item>
        </el-col><el-col :span="6">
          <el-form-item label="行业">
            <el-select v-model="form.industry"
                       placeholder="请选择"
                       style="width:100%;"
                       filterable
                       clearable>
              <el-option v-for="industry in industryList"
                         :key="industry.code"
                         :value="industry.code"
                         :label="industry.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址">
            <el-input v-model="form.location"
                      maxlength="50"
                      show-word-limit
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="费率">
            <el-input v-model="form.feeRate"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 10}"
                      maxlength="200"
                      show-word-limit
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="保证期">
            <el-input v-model="form.guaranteePeriod"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 10}"
                      maxlength="200"
                      show-word-limit
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="付款期">
            <el-input v-model="form.paymentPeriod"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 10}"
                      maxlength="200"
                      show-word-limit
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="便签">
            <el-input v-model="form.note"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 10}"
                      maxlength="400"
                      show-word-limit
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.comments"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 10}"
                      maxlength="400"
                      show-word-limit
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="禁止条款">
            <el-input v-model="form.forbid"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 10}"
                      maxlength="400"
                      show-word-limit
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择BD"
               :visible.sync="selectBDDialogShow">
      <selectUser v-on:cancel-dialog="selectBDDialogShow = false"
                  v-on:sure-dialog="sureSelectBDDialog"></selectUser>
    </el-dialog>
  </div>
</template>
<script src="./clientcontract.js"></script>
