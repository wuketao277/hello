<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/salary/reimbursementItemList'}">报销项详情列表</el-breadcrumb-item>
      <el-breadcrumb-item>报销项</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保存</el-button>
      <el-button type="danger" size="small" icon="el-icon-circle-close" @click="cancel">取消</el-button>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      label-position="left"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-row gutter="20">
        <el-col :span="6">
          <span style="color:red;">*</span>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectUserDialog"
          >name</el-button>
          <span>{{form.userName}}</span>
        </el-col>
        <el-col :span="6">
          <el-form-item label="approve status" v-show="showControl('approveStatus')">
            <el-select v-model="form.approveStatus" placeholder="审批状态" style="width:160px;">
              <el-option
                v-for="status in approveStatusList"
                :key="status.id"
                :value="status.id"
                :label="status.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="paymentMonth" v-show="showControl('approveStatus')">
            <el-date-picker
              v-model="form.paymentMonth"
              type="month"
              placeholder="选择发放月份"
              format="yyyy-MM"
              value-format="yyyy-MM"
              style="width:160px;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
        <el-col :span="6">
          <el-form-item label="type" required>
            <el-select v-model="form.type" placeholder="报销类型" style="width:160px;">
              <el-option
                v-for="type in typeList"
                :key="type.id"
                :value="type.id"
                :label="type.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="happen date" required>
            <el-date-picker
              v-model="form.happenDate"
              type="date"
              placeholder="选择发生日期"
              value-format="yyyy-MM-dd"
              style="width:160px;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="sum" required>
            <el-input
              v-model="form.sum"
              size="small"
              clearable
              placeholder="报销金额"
              style="width:160px;"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
        <el-col :span="18">
          <el-form-item label="description">
            <el-input v-model="form.description" size="small" clearable placeholder="描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择报销人" :visible.sync="selectUserDialogShow">
      <selectUser
        v-on:cancel-dialog="selectUserDialogShow = false"
        v-on:sure-dialog="sureSelectUserDialog"
      ></selectUser>
    </el-dialog>
  </div>
</template>
<script src="./reimbursementItem.js"></script>
