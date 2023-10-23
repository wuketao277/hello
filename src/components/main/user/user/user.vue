<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/user/userlist'}">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
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
          <el-form-item label="姓名"
                        required>
            <el-input v-model="form.realname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="登录名"
                        required>
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="公司"
                        required>
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
          <el-form-item label="状态">
            <el-switch v-model="form.enabled"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="正常"
                       inactive-text="停用"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="cover base">
            <el-switch v-model="form.coverbase"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="cover"
                       inactive-text="不cover"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="KPI">
            <el-switch v-model="form.checkKPI"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="考核"
                       inactive-text="不考核"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="底薪"
                        required>
            <el-input v-model="form.salarybase"
                      style="width:100px;"></el-input>
            <span>元</span>
            &nbsp;&nbsp;
            <span>{{formatSalarybase}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="工作类型">
            <el-radio v-model="form.jobType"
                      label="FULLTIME">全职</el-radio>
            <el-radio v-model="form.jobType"
                      label="PARTTIME">兼职</el-radio>
            <el-radio v-model="form.jobType"
                      label="INTERN">实习</el-radio>
            <el-radio v-model="form.jobType"
                      label="CONSULTANT">外包</el-radio>
            <el-radio v-model="form.jobType"
                      label="EXPERIENCE">体验</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                v-show="form.jobType === 'CONSULTANT'">
          <el-form-item label="客户公司"
                        prop="clientCompanyId">
            <el-select v-model="form.clientCompanyId"
                       placeholder="请选择客户公司"
                       filterable
                       style="width:100%">
              <el-option v-for="client in clients"
                         :key="client.id"
                         :value="client.id"
                         :label="client.chineseName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="角色集合">
            <el-checkbox-group v-model="form.roles">
              <el-checkbox v-for="role in roleList"
                           :label="role"
                           :key="role">{{role}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="状态">
            <el-switch v-model="form.enabled"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="正常"
                       inactive-text="停用"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="cover base">
            <el-switch v-model="form.coverbase"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="cover"
                       inactive-text="不cover"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="入职日期">
            <el-date-picker v-model="form.onBoardDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="离职日期">
            <el-date-picker v-model="form.dimissionDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="KPI">
            <el-switch v-model="form.checkKPI"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="考核"
                       inactive-text="不考核"></el-switch>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-form-item label="剩余年假">
            <el-input v-model="form.remainHolidayThing"
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="剩余病假">
            <el-input v-model="form.remainHolidayIll"
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectTeamLeaderDialogShow"
                     style="width:80px;">Leader</el-button>
          <div style="display:inline-block;"
               v-show="this.form.teamLeaderUserName !== null && this.form.teamLeaderUserName !== ''">
            <span>{{form.teamLeaderUserName}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteTeamLeader"></el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="center">下面是扩展信息</el-divider>
    <el-form ref="form"
             :model="form"
             label-width="100px"
             size="small"
             label-position="left"
             style="margin-top:10px;text-align:left;">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="身份证号码">
            <el-input v-model="form.idCardNo"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生日">
            <el-date-picker v-model="form.birthday"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            <el-select v-model="form.gender"
                       placeholder="请选择"
                       readonly
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
            <el-input v-model="form.phoneNo"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话2">
            <el-input v-model="form.phoneNo2"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话3">
            <el-input v-model="form.phoneNo3"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮箱">
            <el-input v-model="form.email"
                      readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="工作地址">
            <el-input v-model="form.workAddress"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="居住地址">
            <el-input v-model="form.lifeAddress"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户籍地址">
            <el-input v-model="form.homeAddress"
                      readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="工资卡银行">
            <el-select v-model="form.bank"
                       placeholder="请选择"
                       readonly
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
            <el-input v-model="form.cardBankName"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工资卡号">
            <el-input v-model="form.cardNumber"
                      readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="公积金账号">
            <el-input v-model="form.gongJiJinAccount"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="教育背景">
            <el-input v-model="form.educationBackground"
                      readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="紧急联系人">
            <el-input v-model="form.emergencyContact"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="紧急联系电话">
            <el-input v-model="form.emergencyTelephoneNo"
                      readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择Leader"
               :visible.sync="selectLeaderDialogShow">
      <selectUser v-on:cancel-dialog="selectLeaderDialogShow = false"
                  v-on:sure-dialog="sureSelectLeaderDialog"></selectUser>
    </el-dialog>
  </div>
</template>
<script src="./user.js"></script>
