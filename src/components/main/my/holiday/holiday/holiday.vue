<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/holiday/holidaylist'}">假期列表</el-breadcrumb-item>
      <el-breadcrumb-item>假期</el-breadcrumb-item>
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
        <el-col :span="6">
          <el-form-item label="序号">{{form.id}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请人">{{form.userName}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审批状态"
                        v-if="showControl('approve')">
            <el-select v-model="form.approveStatus"
                       placeholder="请选择"
                       style="width:100%;"
                       clearable>
              <el-option v-for="status in approveStatusList"
                         :key="status.code"
                         :value="status.code"
                         :label="status.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="请假日期">
            <el-date-picker v-model="form.holidayDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            style="width:100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="请假时长"
                        required>
            <el-input v-model="form.holidayLong"
                      style="width:90%;"></el-input>
            <span>天</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="剩余年假">
            <el-input v-model="form.remark"
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script src="./holiday.js"></script>
