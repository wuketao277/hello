<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/training/lessonlist'}">课程列表</el-breadcrumb-item>
      <el-breadcrumb-item>课程</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-show="mode === 'study'">
      <div class="toolbar">
        <el-button type="primary"
                   size="small"
                   icon="el-icon-edit"
                   v-show="!signInStatus"
                   @click="signIn">签 到</el-button>
        <el-button type="primary"
                   size="small"
                   icon="el-icon-check"
                   v-show="signInStatus && !finishStatus"
                   @click="finishStudy">学习完成</el-button>
        <span v-show="finishStatus"
              style="color:#67C23A">本课程已完成</span>
      </div>
      <el-result icon="success"
                 title="成功提示"
                 subTitle="请根据提示进行操作">
        <template slot="extra">
          <el-button type="primary"
                     size="medium">返回</el-button>
        </template>
      </el-result>
      <h1 style="text-align:center">{{form.lessonName}}</h1>
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-position="left"
               label-width="80px"
               size="small"
               style="margin-top:10px;text-align:left;">
        <el-row :gutter="12">
          <el-col>
            <el-input type="textarea"
                      v-model="form.lessonContent"
                      :autosize="{ minRows: 2, maxRows: 100}"
                      clearable
                      readonly></el-input>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-show="mode !== 'study'">
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
        <el-button type="primary"
                   size="small"
                   icon="el-icon-upload"
                   @click="openUploadFileDialog">上传文件</el-button>
      </div>
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-position="left"
               label-width="80px"
               size="small"
               style="margin-top:10px;text-align:left;">
        <el-row :gutter="12">
          <el-col :span="24">
            <el-form-item label="课程名称"
                          prop="lessonName">
              <el-input v-model="form.lessonName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col>
            <el-form-item label="课程内容">
              <el-input type="textarea"
                        v-model="form.lessonContent"
                        :autosize="{ minRows: 2, maxRows: 100}"
                        clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div v-show="false">
        <el-divider content-position="left">课程问题</el-divider>
        <el-form ref="lessonQuestionForm"
                 :model="lessonQuestionForm"
                 label-position="left"
                 label-width="80px"
                 size="small"
                 style="margin-top:10px;text-align:left;">
          <el-row :gutter="12">
            <el-col :span="20">
              <el-form-item label="问题名称"
                            prop="lessonQuestionContent">
                <el-input type="textarea"
                          v-model="lessonQuestionForm.lessonQuestionContent"
                          :autosize="{ minRows: 1, maxRows: 100}"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="success"
                         size="mini"
                         icon="el-icon-circle-check"
                         @click="saveLessonQuestion">保存问题</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="toolbar">
          <el-button type="danger"
                     size="mini"
                     icon="el-icon-delete"
                     @click="deleteLessonQuestionById">删 除</el-button>
        </div>
        <el-table :data="table.content"
                  :border="true"
                  :highlight-current-row="true"
                  :stripe="true"
                  :row-class-name="rowStyle"
                  style="width: 100%"
                  @current-change="rowChange">
          <el-table-column type="index"
                           width="50"
                           label="序号"></el-table-column>
          <el-table-column prop="lessonQuestionContent"
                           label="问题内容"
                           show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination background
                       layout="prev, pager, next"
                       :total="table.totalElements"
                       :current-page="table.pageable.pageNumber"
                       :page-sizes="page.pageSizes"
                       :page-size="table.pageable.pageSize"
                       @size-change="sizeChange"
                       @current-change="currentChange"
                       @prev-click="prevClick"
                       @next-click="nextClick"></el-pagination>
      </div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="文件">
        <!--附件开始-->
        <downloadFile :files="uploadFiles"
                      v-on:delete-file-success="queryUploadFiles"></downloadFile>
        <!--附件结束-->
      </el-tab-pane>
    </el-tabs>
    <!--上传文件对话框-->
    <el-dialog title="上传文件"
               :visible.sync="showUploadFileDialog">
      <uploadFile :uploadFileData="uploadFileData"
                  v-on:upload_file_success="queryUploadFiles"></uploadFile>
    </el-dialog>
  </div>
</template>
<script src="./lesson.js"></script>
