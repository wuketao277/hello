<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/candidate/candidatelist' }">候选人列表</el-breadcrumb-item>
      <el-breadcrumb-item>候选人</el-breadcrumb-item>
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
    </div>
    <el-form
      ref="form"
      label-position="left"
      size="small"
      :model="form"
      label-width="80px"
      style="text-align:left;"
      :rules="rules"
    >
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="候选人id">
            <span>{{form.id}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="中文名" prop="chineseName">
            <el-input v-model="form.chineseName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英文名" prop="englishName">
            <el-input v-model="form.englishName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="3">
          <el-form-item label="年龄" prop="age">
            <span>{{form.age}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="生日" prop="birthDay">
            <el-input v-model="form.birthDay" placeholder="例如：1999-01-01"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号" prop="phoneNo">
            <el-input v-model="form.phoneNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="公司名称" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门" prop="department">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职位" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="学校" prop="schoolName">
            <el-input v-model="form.schoolName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现地" prop="currentAddress">
            <el-input v-model="form.currentAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="期地" prop="futureAddress">
            <el-input v-model="form.futureAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="现薪" prop="currentMoney">
            <el-input v-model="form.currentMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="期薪" prop="futureMoney">
            <el-input v-model="form.futureMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期">
            <el-input v-model="form.date"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="英文水平" prop="englishLevel">
            <el-input v-model="form.englishLevel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              :rows="3"
              :autosize="{ minRows: 2, maxRows: 10}"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="简历" prop="resume">
            <el-input
              v-model="resume"
              type="textarea"
              :rows="5"
              :autosize="{ minRows: 2, maxRows: 10}"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs type="border-card">
      <el-tab-pane label="推荐职位">
        <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
          <el-tooltip class="item" effect="dark" content="将后续人推荐到职位" placement="top">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-share"
              @click="openSelectCaseDialog"
            >推荐职位</el-button>
          </el-tooltip>
        </div>
        <el-table
          :data="candidateForCaseList"
          :border="true"
          style="width: 100%"
          @current-change="rowChange"
        >
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column width="320" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="editCase(scope.$index, scope.row)">编辑职位</el-button>
              <el-button
                v-if="!isAttention(scope.row)"
                size="mini"
                type="success"
                @click="updateCandidateForCaseAttention(scope.row, true)"
              >添加关注</el-button>
              <el-button
                v-if="isAttention(scope.row)"
                size="mini"
                type="warning"
                @click="updateCandidateForCaseAttention(scope.row, false)"
              >取消关注</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteRecommend(scope.$index, scope.row)"
                v-show="showControl('deleteRecommend')"
              >删除推荐</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="clientName" label="公司名称"></el-table-column>
          <el-table-column prop="title" label="职位名称"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="评论">
        <!--评论开始-->
        <div v-show="comments.length > 0" style="margin-bottom:20px;">
          <el-row style="text-align:left;">
            <el-col :span="2">
              <span>评论人</span>
            </el-col>
            <el-col :span="4">
              <span>评论时间</span>
            </el-col>
            <el-col :span="2">
              <span>评论阶段</span>
            </el-col>
            <el-col :span="16">
              <span>评论内容</span>
            </el-col>
          </el-row>
          <el-row v-for="comment in comments" :key="comment" style="text-align:left;">
            <el-col :span="2">
              <div class="grid-content bg-purple">{{comment.username}}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{comment.inputTime.replace('T',' ')}}</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">{{comment.phase}}</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{comment.content}}</div>
            </el-col>
          </el-row>
        </div>
        <el-form
          ref="newComment"
          label-position="left"
          size="small"
          :model="form"
          label-width="80px"
          style="text-align:left;"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="评论阶段"
                prop="phase"
                v-show="(mode === 'add' || mode === 'modify')"
              >
                <el-select v-model="newComment.phase" placeholder="请选择">
                  <el-option
                    v-for="item in phaseOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="评论内容"
                prop="content"
                v-show="(mode === 'add' || mode === 'modify')"
              >
                <el-input type="textarea" v-model="newComment.content"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
          <el-button
            type="success"
            size="small"
            icon="el-icon-circle-check"
            @click="saveComment"
          >保存评论</el-button>
        </div>
        <!--评论结束-->
      </el-tab-pane>
      <el-tab-pane label="任务">
        <!--任务开始-->
        <div v-show="tasks.length > 0" style="margin-bottom:20px;">
          <el-row style="text-align:left;">
            <el-col :span="2">
              <span>执行人</span>
            </el-col>
            <el-col :span="4">
              <span>执行时间</span>
            </el-col>
            <el-col :span="6">
              <span>任务标题</span>
            </el-col>
            <el-col :span="12">
              <span>任务内容</span>
            </el-col>
          </el-row>
          <el-row v-for="task in tasks" :key="task" style="text-align:left;">
            <el-col :span="2">
              <div class="grid-content bg-purple">{{task.executeRealName}}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{task.executeDate.substr(0,10)}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{task.taskTitle}}</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">{{task.taskContent}}</div>
            </el-col>
          </el-row>
        </div>
        <el-form
          ref="newTask"
          label-position="left"
          size="small"
          :model="form"
          label-width="80px"
          style="text-align:left;"
          v-show="(mode === 'add' || mode === 'modify')"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="执行时间" prop="executeDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="newTask.executeDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="任务标题" prop="taskTitle">
                <el-input v-model="newTask.taskTitle"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="任务内容" prop="taskContent">
                <el-input type="textarea" v-model="newTask.taskContent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="toolbar" v-show="(mode === 'add' || mode === 'modify')">
          <el-button type="success" size="small" icon="el-icon-circle-check" @click="saveTask">保存任务</el-button>
        </div>
        <!--任务结束-->
      </el-tab-pane>
      <el-tab-pane label="文件">
        <!--附件开始-->
        <downloadFile :files="uploadFiles" v-on:delete-file-success="queryUploadFiles"></downloadFile>
        <!--附件结束-->
      </el-tab-pane>
    </el-tabs>
    <!--推荐职位对话框-->
    <el-dialog title="推荐职位" :visible.sync="selectCaseDialogShow">
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
<script src="./candidate.js"></script>
