<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/case/caselist'}">职位列表</el-breadcrumb-item>
      <el-breadcrumb-item>职位</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success" size="small" icon="el-icon-circle-check" @click="save">保存</el-button>
      <el-button type="danger" size="small" icon="el-icon-circle-close" @click="cancel">取消</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-upload"
        @click="openUploadFileDialog"
      >上传文件</el-button>
      <el-switch v-model="attention" inactive-text="不关注" active-text="关注" active-color="#13ce66" @change="updateCaseAttention"></el-switch>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      size="small"
      style="margin-top:10px;text-align:left;"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="职位id">
            <span>{{form.id}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="职位状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio label="PREPARE">准备</el-radio>
              <el-radio label="DOING">进行中</el-radio>
              <el-radio label="FINISH">完成</el-radio>
              <el-radio label="PAUSE">暂停</el-radio>
              <el-radio label="CLOSE">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户" prop="clientId">
            <el-select v-model="form.clientId" placeholder="请选择客户" style="width:100%">
              <el-option
                v-for="client in clients"
                :key="client.id"
                :value="client.id"
                :label="client.chineseName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职位名称" prop="title">
            <el-input v-model="form.title" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职级">
            <el-input v-model="form.level" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="部门">
            <el-input v-model="form.department" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="汇报对象">
            <el-input v-model="form.lineManager" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否带人">
            <el-input v-model="form.subordinates" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="英语要求">
            <el-input v-model="form.english" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年龄要求">
            <el-input v-model="form.age" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作经验">
            <el-input v-model="form.experience" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="学历要求">
            <el-input v-model="form.school" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作地点">
            <el-input v-model="form.location" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="薪资范围">
            <el-input v-model="form.salaryScope" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="职位描述">
        <el-input
          type="textarea"
          v-model="form.description"
          :autosize="{ minRows: 2, maxRows: 20}"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card">
      <el-tab-pane label="候选人">
        <!--候选人开始-->
        <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
          <el-tooltip class="item" effect="dark" content="给职位添加候选人" placement="top">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-share"
              @click="openSelectCandidateDialog"
            >添加候选人</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="从一个旧职位上拷贝候选人到当前职位" placement="top">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-document-copy"
              @click="openSelectCaseDialog"
            >拷贝候选人</el-button>
          </el-tooltip>
        </div>
        <el-table
          :data="candidateForCase"
          :border="true"
          style="width: 100%"
          @current-change="rowChange"
        >
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="editCandidate(scope.$index, scope.row)"
              >编辑候选人</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteRecommend(scope.$index, scope.row)"
              >删除推荐</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="chineseName" width="120" label="中文名"></el-table-column>
          <el-table-column prop="latestCommentUsername" width="120" label="评论人"></el-table-column>
          <el-table-column prop="latestCommentContent" label="最后评论内容" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="latestCommentInputtime"
            width="160"
            label="最后评论时间"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <!--候选人结束-->
      </el-tab-pane>
      <el-tab-pane label="文件">
        <!--附件开始-->
        <downloadFile :files="uploadFiles" v-on:delete-file-success="queryUploadFiles"></downloadFile>
        <!--附件结束-->
      </el-tab-pane>
    </el-tabs>
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
    <!--上传文件对话框-->
    <el-dialog title="上传文件" :visible.sync="showUploadFileDialog">
      <uploadFile :uploadFileData="uploadFileData" v-on:upload_file_success="queryUploadFiles"></uploadFile>
    </el-dialog>
  </div>
</template>
<script src="./case.js"></script>
