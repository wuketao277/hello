<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/client/clientlist'}">客户列表</el-breadcrumb-item>
      <el-breadcrumb-item>客户合同</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保 存</el-button>
      <el-button type="warning" size="small" icon="el-icon-circle-close" @click="cancel">取 消</el-button>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="140px"
      label-position="left"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="Client">{{form.clientChineseName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Company">
            <el-select v-model="form.company" style="width:100%;" clearable>
              <el-option
                v-for="company in companyList"
                :key="company.code"
                :value="company.code"
                :label="company.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectBDDialog"
            style="width:85px;"
          >BD</el-button>
          <span>{{form.bdUserName}}</span>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Category">
            <el-select
              v-model="form.category"
              placeholder="请选择"
              style="width:100%;"
              @change="categoryChange"
              clearable
            >
              <el-option
                v-for="category in categoryList"
                :key="category"
                :value="category"
                :label="category"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Type">
            <el-select v-model="form.type" placeholder="请选择" style="width:100%;" clearable>
              <el-option
                v-for="type in typeList"
                :key="type.code"
                :value="type.code"
                :label="type.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Effective Date">
            <el-date-picker
              v-model="form.effectiveDate"
              type="date"
              placeholder="选择日期"
              style="width:100%;"
              value-format="yyyy-MM-dd"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="Expire Date">
            <el-date-picker
              v-model="form.expireDate"
              type="date"
              placeholder="选择日期"
              style="width:100%;"
              value-format="yyyy-MM-dd"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Fee Rate">
            <el-input v-model="form.feeRate" clearable style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Contain Tax">
            <el-switch
              v-model="form.containTax"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="含税"
              inactive-text="未税"
              clearable
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Guarantee Period">
            <el-input v-model="form.guaranteePeriod" clearable style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="Payment Period">
            <el-input v-model="form.paymentPeriod" clearable style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Industry">
            <el-select v-model="form.industry" placeholder="请选择" style="width:100%;" clearable>
              <el-option
                v-for="industry in industryList"
                :key="industry.code"
                :value="industry.code"
                :label="industry.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Location">
            <el-input v-model="form.location" clearable style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Receive Date">
            <el-date-picker
              v-model="form.receiveDate"
              type="date"
              placeholder="选择日期"
              style="width:100%;"
              value-format="yyyy-MM-dd"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="Note">
            <el-input v-model="form.note" clearable style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="Comments">
            <el-input v-model="form.comments" clearable style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="Forbid">
            <el-input v-model="form.forbid" clearable style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择BD" :visible.sync="selectBDDialogShow">
      <selectUser
        v-on:cancel-dialog="selectBDDialogShow = false"
        v-on:sure-dialog="sureSelectBDDialog"
      ></selectUser>
    </el-dialog>
  </div>
</template>
<script src="./clientcontract.js"></script>
