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
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="客户" label-width="120px">
            <el-select v-model="form.clientId" placeholder="请选择客户" style="width:160px;">
              <el-option
                v-for="client in clients"
                :key="client.id"
                :value="client.id"
                :label="client.chineseName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectCaseDialog"
            >职位</el-button>
            <span>{{form.title}}</span>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectCandidateDialog"
            >候选人</el-button>
            <span>{{form.candidateChineseName}}</span>
        </el-col>
      </el-row>
      <br/>
      <el-row>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectConsultantDialog"
            >顾问</el-button>
            <span>{{form.consultantRealName}}</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.consultantCommissionPercent" size="small" clearable style="width:100px;" placeholder="提成比例"></el-input><span>%</span>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectCWDialog"
            >CW</el-button>
            <span>{{form.cwRealName}}</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.cwCommissionPercent" size="small" clearable style="width:100px;" placeholder="提成比例"></el-input><span>%</span>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-share"
            @click="openSelectBDDialog"
            >BD</el-button>
            <span>{{form.bdRealName}}</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.bdCommissionPercent" size="small" clearable style="width:100px;" placeholder="提成比例"></el-input><span>%</span>
        </el-col>
      </el-row>
      <br/>
      <el-row>
        <el-col :span="6">
           <el-form-item label="Location" label-width="120px">
            <el-input v-model="form.location" clearable style="width:160px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item label="Base" label-width="120px">
            <el-input v-model="form.base" clearable style="width:160px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item label="GP" label-width="120px">
            <el-input v-model="form.gp" clearable style="width:160px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item label="Billing" label-width="120px">
            <el-input v-model="form.billing" clearable style="width:160px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="On Board Date" label-width="120px">
            <el-date-picker
              v-model="form.onBoardDate"
              type="date"
              placeholder="选择日期" style="width:160px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Offer Date" label-width="120px">
            <el-date-picker
              v-model="form.offerDate"
              type="date"
              placeholder="选择日期" style="width:160px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Payment Date" label-width="120px">
            <el-date-picker
              v-model="form.paymentDate"
              type="date"
              placeholder="选择日期" style="width:160px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Invoice Date" label-width="120px">
            <el-date-picker
              v-model="form.invoiceDate"
              type="date"
              placeholder="选择日期" style="width:160px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
           <el-form-item label="Invoice No." label-width="120px">
            <el-input v-model="form.invoiceNo" clearable style="width:160px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item label="PO" label-width="120px">
            <el-input v-model="form.po" clearable style="width:160px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item label="channel" label-width="120px">
            <el-input v-model="form.channel" clearable style="width:160px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实际收款日期" label-width="120px">
            <el-date-picker
              v-model="form.actualAcceptDate"
              type="date"
              placeholder="选择日期" style="width:160px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="奖金发放日期" label-width="120px">
            <el-date-picker
              v-model="form.bonusPaymentDate"
              type="date"
              placeholder="选择日期" style="width:160px;">
            </el-date-picker>
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
