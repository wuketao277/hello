<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/salary/costInvoiceList'}">成本发票列表</el-breadcrumb-item>
      <el-breadcrumb-item>成本发票</el-breadcrumb-item>
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
          <el-form-item label="id">
            <span>{{form.id}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名">
            <span>{{form.consultantUserName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审批状态">
            <el-select v-model="form.approveStatus"
                       placeholder="审批状态"
                       filterable
                       style="width:100%;"
                       :disabled="disableControl('approveStatus')">
              <el-option v-for="approveStatus in approveStatusList"
                         :key="approveStatus.id"
                         :value="approveStatus.id"
                         :label="approveStatus.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开票日期">
            <el-date-picker v-model="form.invoiceDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="提交日期">
            <el-date-picker v-model="form.submitDate"
                            type="date"
                            placeholder="选择日期"
                            style="width:100%;"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票号码"
                        required>
            <el-input v-model="form.invoiceNumber"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="价税合计"
                        required>
            <el-input v-model="form.sum"
            type="number"
                      clearable
                      style="width:100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发票类型"
                        required>
            <el-select v-model="form.type"
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
          <el-form-item label="备注">
            <el-input type="textarea"
                      v-model="form.remark"
                      :autosize="{ minRows: 1, maxRows: 30}"
                      style="width:100%;"
                      ></el-input>
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
<script src="./costInvoice.js"></script>
