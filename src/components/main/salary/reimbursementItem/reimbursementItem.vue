<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/salary/reimbursementItemList'}">报销项详情列表</el-breadcrumb-item>
      <el-breadcrumb-item>报销项</el-breadcrumb-item>
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
             label-width="120px"
             label-position="left"
             size="small"
             style="margin-top:10px;text-align:left;">
      <el-row :gutter="12">
        <el-col :span="6">
          <span style="color:red;">*</span>
          <el-button type="primary"
                     size="small"
                     icon="el-icon-share"
                     @click="openSelectUserDialog">NAME</el-button>
          <span>{{form.userName}}</span>
        </el-col>
        <el-col :span="6">
          <el-form-item label="STATUS"
                        v-show="showControl('approveStatus')">
            <el-select v-model="form.approveStatus"
                       placeholder="STATUS"
                       style="max-width:100%;"
                       clearable>
              <el-option v-for="status in approveStatusList"
                         :key="status.code"
                         :value="status.code"
                         :label="status.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="NEED PAY"
                        v-show="showControl('needPay')">
            <el-select v-model="form.needPay"
                       placeholder="请选择"
                       style="max-width:100%;"
                       clearable>
              <el-option v-for="v in reimbursementNeedPay"
                         :key="v.code"
                         :value="v.code"
                         :label="v.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="DATE"
                        required>
            <el-date-picker v-model="form.date"
                            type="date"
                            placeholder="发生日期"
                            value-format="yyyy-MM-dd"
                            style="width:100%;"
                            clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="LOCATION"
                        required>
            <el-select v-model="form.location"
                       placeholder="发生地点"
                       style="width:100%;"
                       clearable>
              <el-option v-for="location in locationList"
                         :key="location.code"
                         :value="location.code"
                         :label="location.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="COMPANY"
                        required>
            <el-select v-model="form.company"
                       style="width:100%;"
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
          <el-form-item label="MONTH"
                        required>
            <el-date-picker v-model="form.paymentMonth"
                            type="month"
                            placeholder="选择报销月份"
                            format="yyyy-MM"
                            value-format="yyyy-MM"
                            style="width:100%;"
                            clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="TYPE"
                        required>
            <el-select v-model="form.type"
                       @change="typeChange"
                       placeholder="类别"
                       style="width:100%;"
                       clearable>
              <el-option v-for="type in typeList"
                         :key="type.code"
                         :value="type.code"
                         :label="type.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="KIND"
                        required>
            <el-select v-model="form.kind"
                       placeholder="项目"
                       style="width:100%;"
                       clearable>
              <el-option v-for="kind in currentKindList"
                         :key="kind.code"
                         :value="kind.code"
                         :label="kind.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="INVOICE NO."
                        required>
            <el-input v-model="form.invoiceNo"
                      size="small"
                      clearable
                      placeholder="发票号"
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="PRICE"
                        required>
            <el-input v-model="form.price"
                      size="small"
                      clearable
                      placeholder="单价"
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="COUNT"
                        required>
            <el-input v-model="form.count"
                      size="small"
                      clearable
                      placeholder="数量"
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="SUM"
                        required>
            <el-input v-model="form.sum"
                      size="small"
                      clearable
                      placeholder="总金额"
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="DESCRIPTION">
            <el-input v-model="form.description"
                      size="small"
                      style="width:100%;"
                      clearable
                      placeholder="描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="CREATE USER">
            <span>{{form.createUser}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="CREATE TIME">
            <span>{{timeStrFormate1(form.createTime)}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择报销人"
               :visible.sync="selectUserDialogShow">
      <selectUser v-on:cancel-dialog="selectUserDialogShow = false"
                  v-on:sure-dialog="sureSelectUserDialog"></selectUser>
    </el-dialog>
  </div>
</template>
<script src="./reimbursementItem.js"></script>
