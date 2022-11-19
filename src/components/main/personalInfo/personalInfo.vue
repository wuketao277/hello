<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <p></p>
    <el-tabs value="baseInfo"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="基本信息"
                   name="baseInfo">
        <div class="toolbar">
          <el-button type="success"
                     size="small"
                     icon="el-icon-circle-check"
                     @click="saveBaseInfo">保 存</el-button>
          <el-button type="warning"
                     size="small"
                     icon="el-icon-circle-close"
                     @click="cancelChangeBaseInfo">取 消</el-button>
        </div>
        <el-form ref="extInfoForm"
                 :model="form"
                 label-width="100px"
                 size="small"
                 label-position="left"
                 style="margin-top:10px;text-align:left;">
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="身份证号码">
                <el-input v-model="extInfoForm.idCardNo"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="生日">
                <el-date-picker v-model="extInfoForm.birthday"
                                type="date"
                                placeholder="选择日期"
                                style="width:100%"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别">
                <el-select v-model="extInfoForm.gender"
                           placeholder="请选择"
                           clearable
                           style="width:200px;">
                  <el-option v-for="gender in genders"
                             :key="gender.code"
                             :value="gender.code"
                             :label="gender.describe"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="电话">
                <el-input v-model="extInfoForm.phoneNo"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话2">
                <el-input v-model="extInfoForm.phoneNo2"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话3">
                <el-input v-model="extInfoForm.phoneNo3"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="邮箱">
                <el-input v-model="extInfoForm.email"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="工作地址">
                <el-input v-model="extInfoForm.workAddress"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="居住地址">
                <el-input v-model="extInfoForm.lifeAddress"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="户籍地址">
                <el-input v-model="extInfoForm.homeAddress"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="工资卡银行">
                <el-select v-model="extInfoForm.bank"
                           placeholder="请选择"
                           clearable
                           style="width:100%;">
                  <el-option v-for="bank in banks"
                             :key="bank.code"
                             :value="bank.code"
                             :label="bank.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行名称">
                <el-input v-model="extInfoForm.cardBankName"
                          clearable
                          placeholder="例如：建设银行上海浦东崮山路支行"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工资卡号">
                <el-input v-model="extInfoForm.cardNumber"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="公积金账号">
                <el-input v-model="extInfoForm.gongJiJinAccount"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="教育背景">
                <el-input v-model="extInfoForm.educationBackground"
                          clearable
                          placeholder="例如：北京服装学院 自动化专业 2002.09~2006.07"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="紧急联系人">
                <el-input v-model="extInfoForm.emergencyContact"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="紧急联系电话">
                <el-input v-model="extInfoForm.emergencyTelephoneNo"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码"
                   name="password">
        <!--工具栏-->
        <div class="toolbar">
          <el-button type="success"
                     size="small"
                     icon="el-icon-circle-check"
                     @click="changePasswordSubmit">提 交</el-button>
          <el-button type="warning"
                     size="small"
                     icon="el-icon-circle-close"
                     @click="changePasswordCancel">取 消</el-button>
        </div>
        <el-form ref="form"
                 :model="form"
                 label-width="100px"
                 size="small"
                 label-position="left"
                 style="margin-top:10px;text-align:left;">
          <el-form-item label="原密码">
            <el-input v-model="changePasswordForm.oldPassword"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="changePasswordForm.newPassword"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="changePasswordForm.newPassword2"
                      type="password"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./personalInfo.js"></script>
