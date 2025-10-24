<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/salary/invoiceList'}">发票列表</el-breadcrumb-item>
      <el-breadcrumb-item>发票</el-breadcrumb-item>
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
             label-width="100px"
             label-position="left"
             size="small"
             style="margin-top:10px;text-align:left;">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="开票日期">
            <el-date-picker v-model="form.createDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发票金额"
                        required>
            <el-input v-model="form.sum"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票编号"
                        required>
            <el-input v-model="form.invoiceNumber"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="发票类型"
                        required>
            <el-select v-model="form.invoiceType"
                       placeholder="请选择发票类型"
                       filterable
                       style="width:100%;">
              <el-option v-for="type in types"
                         :key="type.code"
                         :value="type.code"
                         :label="type.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="品名"
                        required>
            <el-input v-model="form.kind"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户"
                        required>
            <el-select v-model="form.clientId"
                       placeholder="请选择客户"
                       style="width:100%;"
                       filterable
                       @change="clientChange">
              <el-option v-for="client in clients"
                         :key="client.id"
                         :value="client.id"
                         :label="client.chineseName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <span style="color:red;">*</span>
          <el-button type="primary"
                     size="small"
                     icon="el-icon-share"
                     @click="openSelectCandidateDialog"
                     style="width:85px;">候选人</el-button>
          <span>{{form.candidateChineseName}}</span>
        </el-col>
        <el-col :span="6">
          <span style="color:red;">*</span>
          <el-button type="primary"
                     size="small"
                     icon="el-icon-share"
                     @click="openSelectAMDialog"
                     style="width:85px;">AM</el-button>
          <span>{{form.amName}}</span>
        </el-col>
        <el-col :span="6">
          <el-form-item label="PO">
            <el-input v-model="form.po"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="寄出日期">
            <el-date-picker v-model="form.sendDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            style="width:100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收到日期">
            <el-date-picker v-model="form.receiveDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            style="width:100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实际付款日期">
            <el-date-picker v-model="form.actualPaymentDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="正常/作废">
            <el-switch v-model="form.status"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="正常"
                       inactive-text="作废"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="联系信息">
            <el-input type="textarea"
                      v-model="form.contact"
                      :autosize="{ minRows: 1, maxRows: 30}"
                      style="width:100%;"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input type="textarea"
                      v-model="form.remark"
                      :autosize="{ minRows: 1, maxRows: 30}"
                      style="width:100%;"
                      readonly></el-input>
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
               :visible.sync="selectAMDialogShow">
      <selectUser v-on:cancel-dialog="selectAMDialogShow = false"
                  v-on:sure-dialog="sureSelectAMDialog"></selectUser>
    </el-dialog>
  </div>
</template>
<script src="./invoice.js"></script>
