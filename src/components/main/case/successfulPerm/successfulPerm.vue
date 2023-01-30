<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/case/successfulPermList'}">成功职位列表</el-breadcrumb-item>
      <el-breadcrumb-item>功能职位</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar"
         v-show="(mode === 'add' || mode === 'modify') && showControl('save')">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-check"
                 @click="save">保 存</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-circle-close"
                 @click="cancel">取 消</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-circle-plus-outline"
                 @click="addConsultant">增加顾问</el-button>
    </div>
    <el-form ref="form"
             :model="form"
             label-width="150px"
             label-position="left"
             size="small"
             style="margin-top:10px;text-align:left;">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="客户"
                        required>
            <el-select v-model="form.clientId"
                       placeholder="请选择客户"
                       style="width:100%;">
              <el-option v-for="client in clients"
                         :key="client.id"
                         :value="client.id"
                         :label="client.chineseName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审批状态"
                        v-show="showControl('approveStatus')">
            <el-select v-model="form.approveStatus"
                       placeholder="审批状态"
                       style="width:100%;">
              <el-option v-for="approveStatus in approveStatusList"
                         :key="approveStatus.id"
                         :value="approveStatus.id"
                         :label="approveStatus.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型"
                        required>
            <el-select v-model="form.type"
                       placeholder="类型"
                       style="width:100%;">
              <el-option v-for="type in typeList"
                         :key="type.code"
                         :value="type.code"
                         :label="type.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12"
              style="margin-bottom:10px;">
        <el-col :span="6">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectCaseDialog"
                     style="width:80px;">职位</el-button>
          <el-button type="text"
                     style="font-size:15px;color:#409EFF;"
                     @click="jumpToTitle"
                     v-show="this.form.title !== ''">{{form.title}}</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectCandidateDialog"
                     style="width:80px;">候选人</el-button>
          <el-button type="text"
                     style="font-size:15px;color:#409EFF;"
                     @click="jumpToCandidate"
                     v-show="this.form.candidateChineseName !== ''">{{form.candidateChineseName}}</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="selectHRDialogShow = true"
                     style="width:80px;">HR</el-button>
          <span>{{form.hrEnglishName}}&nbsp;-&nbsp;{{form.hrChineseName}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="12"
              style="margin-top:10px;margin-bottom:10px;">
        <el-col :span="6">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectCWDialog"
                     style="width:80px;">CW</el-button>
          <div style="display:inline-block;"
               v-show="this.form.cwUserName !== ''">
            <span>{{form.cwUserName}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('cw')"></el-button>
            <el-input v-model="form.cwCommissionPercent"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectBDDialog"
                     style="width:80px;">BD</el-button>
          <div style="display:inline-block;"
               v-show="this.form.bdUserName !== ''">
            <span>{{form.bdUserName}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('bd')"></el-button>
            <el-input v-model="form.bdCommissionPercent"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow1">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('1')"
                     style="width:80px;">顾问1</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName !== ''">
            <span>{{form.consultantUserName}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('1')"></el-button>
            <el-input v-model="form.consultantCommissionPercent"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow2">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('2')"
                     style="width:80px;">顾问2</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName2 !== ''">
            <span>{{form.consultantUserName2}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('2')"></el-button>
            <el-input v-model="form.consultantCommissionPercent2"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow3">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('3')"
                     style="width:80px;">顾问3</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName3 !== ''">
            <span>{{form.consultantUserName3}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('3')"></el-button>
            <el-input v-model="form.consultantCommissionPercent3"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow4">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('4')"
                     style="width:80px;">顾问4</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName4 !== ''">
            <span>{{form.consultantUserName4}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('4')"></el-button>
            <el-input v-model="form.consultantCommissionPercent4"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow5">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('5')"
                     style="width:80px;">顾问5</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName5 !== ''">
            <span>{{form.consultantUserName5}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('5')"></el-button>
            <el-input v-model="form.consultantCommissionPercent5"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow6">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('6')"
                     style="width:80px;">顾问6</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName6 !== ''">
            <span>{{form.consultantUserName6}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('6')"></el-button>
            <el-input v-model="form.consultantCommissionPercent6"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow7">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('7')"
                     style="width:80px;">顾问7</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName7 !== ''">
            <span>{{form.consultantUserName7}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('7')"></el-button>
            <el-input v-model="form.consultantCommissionPercent7"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow8">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('8')"
                     style="width:80px;">顾问8</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName8 !== ''">
            <span>{{form.consultantUserName8}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('8')"></el-button>
            <el-input v-model="form.consultantCommissionPercent8"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow9">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('9')"
                     style="width:80px;">顾问9</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName9 !== ''">
            <span>{{form.consultantUserName9}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('9')"></el-button>
            <el-input v-model="form.consultantCommissionPercent9"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow10">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('10')"
                     style="width:80px;">顾问10</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName10 !== ''">
            <span>{{form.consultantUserName10}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('10')"></el-button>
            <el-input v-model="form.consultantCommissionPercent10"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow11">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('11')"
                     style="width:80px;">顾问11</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName11 !== ''">
            <span>{{form.consultantUserName11}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('11')"></el-button>
            <el-input v-model="form.consultantCommissionPercent11"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow12">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('12')"
                     style="width:80px;">顾问12</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName12 !== ''">
            <span>{{form.consultantUserName12}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('12')"></el-button>
            <el-input v-model="form.consultantCommissionPercent12"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow13">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('13')"
                     style="width:80px;">顾问13</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName13 !== ''">
            <span>{{form.consultantUserName13}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('13')"></el-button>
            <el-input v-model="form.consultantCommissionPercent13"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow14">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('14')"
                     style="width:80px;">顾问14</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName14 !== ''">
            <span>{{form.consultantUserName14}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('14')"></el-button>
            <el-input v-model="form.consultantCommissionPercent14"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow15">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('15')"
                     style="width:80px;">顾问15</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName15 !== ''">
            <span>{{form.consultantUserName15}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('15')"></el-button>
            <el-input v-model="form.consultantCommissionPercent15"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow16">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('16')"
                     style="width:80px;">顾问16</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName16 !== ''">
            <span>{{form.consultantUserName16}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('16')"></el-button>
            <el-input v-model="form.consultantCommissionPercent16"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow17">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('17')"
                     style="width:80px;">顾问17</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName17 !== ''">
            <span>{{form.consultantUserName17}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('17')"></el-button>
            <el-input v-model="form.consultantCommissionPercent17"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow18">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('18')"
                     style="width:80px;">顾问18</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName18 !== ''">
            <span>{{form.consultantUserName18}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('18')"></el-button>
            <el-input v-model="form.consultantCommissionPercent18"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow19">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('19')"
                     style="width:80px;">顾问19</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName19 !== ''">
            <span>{{form.consultantUserName19}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('19')"></el-button>
            <el-input v-model="form.consultantCommissionPercent19"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
        <el-col :span="6"
                v-show="this.consultantColumnShow20">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-share"
                     @click="openSelectConsultantDialog('20')"
                     style="width:80px;">顾问20</el-button>
          <div style="display:inline-block;"
               v-show="this.form.consultantUserName20 !== ''">
            <span>{{form.consultantUserName20}}</span>
            <el-button icon="el-icon-delete"
                       size="mini"
                       circle
                       @click="deleteConsultant('20')"></el-button>
            <el-input v-model="form.consultantCommissionPercent20"
                      size="small"
                      style="width:70px;"
                      placeholder="提成"></el-input>
            <span>%</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="Base"
                        required>
            <el-input v-model="form.base"
                      style="width:70%"></el-input>
            <span>{{formatBase}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Billing"
                        required>
            <el-input v-model="form.billing"
                      style="width:70%"></el-input>
            <span>{{formatBilling}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="GP"
                        required>
            <el-input v-model="form.gp"
                      :readonly="gpReadonly()"
                      style="width:70%"></el-input>
            <span>{{formatGp}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                v-show="showControl('calcGP')">
          <el-button size="mini"
                     type="primary"
                     @click="getGP()">计算GP</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="Offer Date">
            <el-date-picker v-model="form.offerDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="On Board Date">
            <el-date-picker v-model="form.onBoardDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Guarantee Date">
            <el-date-picker v-model="form.guaranteeDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Invoice Date">
            <el-date-picker v-model="form.invoiceDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"
                            v-show="showControl('invoiceDate')"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="Payment Date">
            <el-date-picker v-model="form.paymentDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Actual Payment Date">
            <el-date-picker v-model="form.actualPaymentDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"
                            v-show="showControl('actualPaymentDate')"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Commission Date">
            <el-date-picker v-model="form.commissionDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"
                            v-show="showControl('commissionDate')"
                            clearable></el-date-picker>
            <span v-show="!showControl('commissionDate')">{{getDateStr(form.commissionDate)}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Invoice No.">
            <el-input v-model="form.invoiceNo"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item label="PO">
            <el-input v-model="form.po"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Location">
            <el-input v-model="form.location"
                      clearable
                      style="width:100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="channel">
            <el-input v-model="form.channel"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="comment">
            <el-input type="textarea"
                      v-model="form.comment"
                      :autosize="{minRows: 1, maxRows: 10}"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择候选人"
               :visible.sync="selectCandidateDialogShow">
      <selectCandidate v-on:cancel-dialog="selectCandidateDialogShow = false"
                       v-on:sure-dialog="sureSelectCandidateDialog"></selectCandidate>
    </el-dialog>
    <el-dialog title="选择职位"
               :visible.sync="selectCaseDialogShow">
      <selectCase v-on:cancel-dialog="selectCaseDialogShow = false"
                  v-on:sure-dialog="sureSelectCaseDialog"></selectCase>
    </el-dialog>
    <el-dialog title="选择顾问"
               :visible.sync="selectConsultantDialogShow">
      <selectUser v-on:cancel-dialog="selectConsultantDialogShow = false"
                  v-on:sure-dialog="sureSelectConsultantDialog"></selectUser>
    </el-dialog>
    <el-dialog title="选择CW"
               :visible.sync="selectCWDialogShow">
      <selectUser v-on:cancel-dialog="selectCWDialogShow = false"
                  v-on:sure-dialog="sureSelectCWDialog"></selectUser>
    </el-dialog>
    <el-dialog title="选择BD"
               :visible.sync="selectBDDialogShow">
      <selectUser v-on:cancel-dialog="selectBDDialogShow = false"
                  v-on:sure-dialog="sureSelectBDDialog"></selectUser>
    </el-dialog>
    <el-dialog title="选择HR"
               :visible.sync="selectHRDialogShow">
      <selectHr v-on:cancel-dialog="selectHRDialogShow = false"
                v-on:sure-dialog="sureSelectHRDialog"></selectHr>
    </el-dialog>
  </div>
</template>
<script src="./successfulPerm.js"></script>
