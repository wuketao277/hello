<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/case/successfulPermList'}">成功职位列表</el-breadcrumb-item>
      <el-breadcrumb-item>功能职位</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保存</el-button>
      <el-button type="danger" size="small" icon="el-icon-circle-close" @click="cancel">取消</el-button>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="160px"
      label-position="left"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户" required>
            <el-select v-model="form.clientId" placeholder="请选择客户" style="width:200px;">
              <el-option
                v-for="client in clients"
                :key="client.id"
                :value="client.id"
                :label="client.chineseName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审批状态" v-show="showControl('approveStatus')">
            <el-select v-model="form.approveStatus" placeholder="审批状态" style="width:130px;">
              <el-option
                v-for="approveStatus in approveStatusList"
                :key="approveStatus.id"
                :value="approveStatus.id"
                :label="approveStatus.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span style="color:red;">*</span>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectCaseDialog"
            style="width:85px;"
          >职位</el-button>
          <span>{{form.title}}</span>
        </el-col>
        <el-col :span="6">
          <span style="color:red;">*</span>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectCandidateDialog"
            style="width:85px;"
          >候选人</el-button>
          <span>{{form.candidateChineseName}}</span>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectCWDialog"
            style="width:85px;"
          >CW</el-button>
          <span>{{form.cwUserName}}</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="form.cwCommissionPercent"
            size="small"
            clearable
            style="width:75px;"
            placeholder="提成"
          ></el-input>
          <span>%</span>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectBDDialog"
            style="width:85px;"
          >BD</el-button>
          <span>{{form.bdUserName}}</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="form.bdCommissionPercent"
            size="small"
            clearable
            style="width:75px;"
            placeholder="提成"
          ></el-input>
          <span>%</span>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectConsultantDialog('1')"
            style="width:85px;"
          >顾问</el-button>
          <span>{{form.consultantUserName}}</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="form.consultantCommissionPercent"
            size="small"
            clearable
            style="width:75px;"
            placeholder="提成"
          ></el-input>
          <span>%</span>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectConsultantDialog('2')"
            style="width:85px;"
          >顾问2</el-button>
          <span>{{form.consultantUserName2}}</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="form.consultantCommissionPercent2"
            size="small"
            clearable
            style="width:75px;"
            placeholder="提成"
          ></el-input>
          <span>%</span>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectConsultantDialog('3')"
            style="width:85px;"
          >顾问3</el-button>
          <span>{{form.consultantUserName3}}</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="form.consultantCommissionPercent3"
            size="small"
            clearable
            style="width:75px;"
            placeholder="提成"
          ></el-input>
          <span>%</span>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectConsultantDialog('4')"
            style="width:85px;"
          >顾问4</el-button>
          <span>{{form.consultantUserName4}}</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="form.consultantCommissionPercent4"
            size="small"
            clearable
            style="width:75px;"
            placeholder="提成"
          ></el-input>
          <span>%</span>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectConsultantDialog('5')"
            style="width:85px;"
          >顾问5</el-button>
          <span>{{form.consultantUserName5}}</span>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="form.consultantCommissionPercent5"
            size="small"
            clearable
            style="width:75px;"
            placeholder="提成"
          ></el-input>
          <span>%</span>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="6">
          <el-form-item label="Location">
            <el-input v-model="form.location" clearable style="width:130px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Base">
            <el-input v-model="form.base" clearable style="width:100px;"></el-input>
            <span>{{formatBase}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Billing">
            <el-input v-model="form.billing" clearable style="width:100px;" @change="getGP"></el-input>
            <span>{{formatBilling}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="GP">
            <el-input v-model="form.gp" clearable readonly style="width:100px;"></el-input>
            <span>{{formatGp}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="Offer Date">
            <el-date-picker
              v-model="form.offerDate"
              type="date"
              placeholder="选择日期"
              style="width:130px;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="On Board Date">
            <el-date-picker
              v-model="form.onBoardDate"
              type="date"
              placeholder="选择日期"
              style="width:130px;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Payment Date">
            <el-date-picker
              v-model="form.paymentDate"
              type="date"
              placeholder="选择日期"
              style="width:130px;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Actual Payment Date">
            <el-date-picker
              v-model="form.actualPaymentDate"
              type="date"
              placeholder="选择日期"
              style="width:130px;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="Invoice Date">
            <el-date-picker
              v-model="form.invoiceDate"
              type="date"
              placeholder="选择日期"
              style="width:130px;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Commission Date">
            <el-date-picker
              v-model="form.commissionDate"
              type="date"
              placeholder="选择日期"
              style="width:130px;"
              value-format="yyyy-MM-dd"
              v-show="showControl('commissionDate')"
              clearable
            ></el-date-picker>
            <span v-show="!showControl('commissionDate')">{{getDateStr(form.commissionDate)}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Invoice No.">
            <el-input v-model="form.invoiceNo" clearable style="width:130px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="PO">
            <el-input v-model="form.po" clearable style="width:130px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="channel">
            <el-input v-model="form.channel" clearable style="width:130px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="comment">
            <el-input type="textarea" v-model="form.comment" :autosize="{minRows: 1, maxRows: 10}" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="选择候选人" :visible.sync="selectCandidateDialogShow">
      <selectCandidate
        v-on:cancel-dialog="selectCandidateDialogShow = false"
        v-on:sure-dialog="sureSelectCandidateDialog"
      ></selectCandidate>
    </el-dialog>
    <el-dialog title="选择职位" :visible.sync="selectCaseDialogShow">
      <selectCase
        v-on:cancel-dialog="selectCaseDialogShow = false"
        v-on:sure-dialog="sureSelectCaseDialog"
      ></selectCase>
    </el-dialog>
    <el-dialog title="选择顾问" :visible.sync="selectConsultantDialogShow">
      <selectUser
        v-on:cancel-dialog="selectConsultantDialogShow = false"
        v-on:sure-dialog="sureSelectConsultantDialog"
      ></selectUser>
    </el-dialog>
    <el-dialog title="选择CW" :visible.sync="selectCWDialogShow">
      <selectUser
        v-on:cancel-dialog="selectCWDialogShow = false"
        v-on:sure-dialog="sureSelectCWDialog"
      ></selectUser>
    </el-dialog>
    <el-dialog title="选择BD" :visible.sync="selectBDDialogShow">
      <selectUser
        v-on:cancel-dialog="selectBDDialogShow = false"
        v-on:sure-dialog="sureSelectBDDialog"
      ></selectUser>
    </el-dialog>
  </div>
</template>
<script src="./successfulPerm.js"></script>
