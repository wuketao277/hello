<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/case/caselist'}">职位列表</el-breadcrumb-item>
      <el-breadcrumb-item>职位</el-breadcrumb-item>
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
      <el-button type="danger"
                 size="small"
                 icon="el-icon-delete"
                 @click="deleteById"
                 v-if="showControl('delete')">删 除</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-upload"
                 @click="openUploadFileDialog">上传文件</el-button>
      <el-switch v-model="attention"
                 inactive-text="不关注"
                 active-text="关注"
                 active-color="#13ce66"
                 @change="updateCaseAttention"></el-switch>
    </div>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-position="left"
             label-width="80px"
             size="small"
             style="margin-top:10px;text-align:left;">
      <el-row :gutter="12">
        <el-col :span="4">
          <el-form-item label="职位id">
            <span>{{form.id}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="创建时间">
            <span>{{formatDate(form.createTime)}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="职位状态"
                        prop="status">
            <el-radio-group v-model="form.status">
              <el-radio label="PREPARE">准备</el-radio>
              <el-radio label="DOING">进行中</el-radio>
              <el-radio label="FINISH">完成</el-radio>
              <el-radio label="PAUSE">暂停</el-radio>
              <el-radio label="CLOSE">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary"
                     size="small"
                     icon="el-icon-share"
                     @click="openSelectCWDialog"
                     style="width:85px;">CW</el-button>
          <span>{{form.cwUserName}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="客户"
                        prop="clientId">
            <el-select v-model="form.clientId"
                       placeholder="请选择客户"
                       filterable
                       style="width:100%">
              <el-option v-for="client in clients"
                         :key="client.id"
                         :value="client.id"
                         :label="client.chineseName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职位名称"
                        prop="title">
            <el-input v-model="form.title"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary"
                     size="small"
                     icon="el-icon-share"
                     @click="selectHRDialogShow = true"
                     style="width:85px;">HR</el-button>
          <span>{{form.hrEnglishName}}&nbsp;-&nbsp;{{form.hrChineseName}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="职级">
            <el-input v-model="form.level"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门">
            <el-input v-model="form.department"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="汇报对象">
            <el-input v-model="form.lineManager"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="薪资范围">
            <el-input v-model="form.salaryScope"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否带人">
            <el-input v-model="form.subordinates"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作地点">
            <el-input v-model="form.location"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="工作经验">
            <el-input v-model="form.experience"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年龄要求">
            <el-input v-model="form.age"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英语要求">
            <el-input v-model="form.english"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="学历要求">
            <el-input v-model="form.school"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="HC">
            <el-input v-model="form.headCount"
                      clearable
                      placeholder="只能填数字"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Pipeline">
            <el-input v-model="form.pipeline"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="面试流程">
            <el-input v-model="form.interviewProcess"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col>
          <el-form-item label="职位描述">
            <el-input type="textarea"
                      v-model="form.description"
                      :autosize="{ minRows: 2, maxRows: 100}"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12"
              v-if="showControl('extMsg')">
        <el-col>
          <el-form-item label="可见性">
            <el-checkbox-group v-model="form.show4JobType">
              <el-checkbox v-for="jobType in jobTypeList"
                           :label="jobType.code"
                           :key="jobType.code">{{jobType.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs type="border-card">
      <el-tab-pane label="候选人">
        <!--候选人开始-->
        <div class="toolbar"
             v-show="(mode === 'add' || mode === 'modify')">
          <el-tooltip class="item"
                      effect="dark"
                      content="给职位添加候选人"
                      placement="top">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-share"
                       @click="openSelectCandidateDialog">添加候选人</el-button>
          </el-tooltip>
          <el-tooltip class="item"
                      effect="dark"
                      content="从一个旧职位上拷贝候选人到当前职位"
                      placement="top">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-document-copy"
                       @click="openSelectCaseDialog">拷贝候选人</el-button>
          </el-tooltip>
        </div>
        <el-table v-loading="candidateTableLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :row-class-name="setCandidateRowClassName"
                  :data="candidateForCaseList"
                  :border="true"
                  style="width: 100%"
                  @current-change="rowChange">
          <el-table-column type="index"
                           width="50"
                           label="序号"></el-table-column>
          <el-table-column label="操作"
                           width="200">
            <template slot-scope="scope">
              <el-button v-if="!isAttention(scope.row)"
                         size="mini"
                         type="success"
                         @click="updateCandidateForCaseAttention(scope.row, true)">添加关注</el-button>
              <el-button v-if="isAttention(scope.row)"
                         size="mini"
                         type="warning"
                         @click="updateCandidateForCaseAttention(scope.row, false)">取消关注</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="deleteRecommend(scope.$index, scope.row)">删除推荐</el-button>
            </template>
          </el-table-column>
          <el-table-column width="120"
                           label="中文名">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="editCandidate(scope.$index, scope.row)">{{scope.row.chineseName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="farthestPhase"
                           width="120"
                           label="最远阶段"></el-table-column>
          <el-table-column prop="latestCommentUsername"
                           width="120"
                           label="评论人"></el-table-column>
          <el-table-column prop="latestCommentContent"
                           label="最后评论内容"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="latestCommentInputtime"
                           width="160"
                           label="最后评论时间"
                           show-overflow-tooltip></el-table-column>
        </el-table>
        <!--候选人结束-->
      </el-tab-pane>
      <el-tab-pane label="文件">
        <!--附件开始-->
        <downloadFile :files="uploadFiles"
                      v-on:delete-file-success="queryUploadFiles"></downloadFile>
        <!--附件结束-->
      </el-tab-pane>
    </el-tabs>
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
    <!--上传文件对话框-->
    <el-dialog title="上传文件"
               :visible.sync="showUploadFileDialog">
      <uploadFile :uploadFileData="uploadFileData"
                  v-on:upload_file_success="queryUploadFiles"></uploadFile>
    </el-dialog>
    <el-dialog title="选择CW"
               :visible.sync="selectCWDialogShow">
      <selectUser v-on:cancel-dialog="selectCWDialogShow = false"
                  v-on:sure-dialog="sureSelectCWDialog"></selectUser>
    </el-dialog>
    <el-dialog title="选择HR"
               :visible.sync="selectHRDialogShow">
      <selectHr v-on:cancel-dialog="selectHRDialogShow = false"
                v-on:sure-dialog="sureSelectHRDialog"></selectHr>
    </el-dialog>
  </div>
</template>
<style>
.rowGreen {
  color: rgb(134, 190, 106);
  font-weight: bolder;
}
.rowBlue {
  color: #409eff;
  font-weight: bolder;
}
</style>
<script src="./case.js"></script>
