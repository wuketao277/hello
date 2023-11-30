<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/candidate/candidatelist' }">候选人列表</el-breadcrumb-item>
      <el-breadcrumb-item>候选人</el-breadcrumb-item>
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
                 @change="updateCandidateAttention"></el-switch>
    </div>
    <el-form ref="form"
             label-position="left"
             size="small"
             :model="form"
             label-width="100px"
             style="text-align:left;"
             :rules="rules">
      <el-row :gutter="12">
        <el-col :span="4">
          <el-form-item label="候选人id">
            <span>{{form.id}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="创建人">
            <span>{{form.createUserName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="中文名"
                        prop="chineseName">
            <el-input v-model="form.chineseName"
                      maxlength="50"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英文名"
                        prop="englishName">
            <el-input v-model="form.englishName"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="3">
          <el-form-item label="年龄"
                        prop="age">
            <span>{{form.age}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="生日"
                        prop="birthDay"
                        label-width="80px">
            <el-input v-model="form.birthDay"
                      placeholder="例如：1999-01-01"
                      style="width:100%"
                      @input="birthdayChange"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号"
                        prop="phoneNo">
            <el-input v-model="form.phoneNo"
                      maxlength="20"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱"
                        prop="email">
            <el-input v-model="form.email"
                      maxlength="200"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="面试历史"
                        prop="interviewHistory">
            <el-input v-model="form.interviewHistory"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 100}"
                      maxlength="200"
                      show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="求职动机"
                        prop="motivation">
            <el-input v-model="form.motivation"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 100}"
                      maxlength="200"
                      show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="性别">
            <el-select v-model="form.gender"
                       placeholder="请选择"
                       clearable
                       filterable
                       style="width:100%;">
              <el-option v-for="gender in genders"
                         :key="gender.code"
                         :value="gender.code"
                         :label="gender.describe"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英文水平"
                        prop="englishLevel">
            <el-input v-model="form.englishLevel"
                      maxlength="200"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="户籍地址"
                        prop="hometown">
            <el-input v-model="form.hometown"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现地址"
                        prop="currentAddress">
            <el-input v-model="form.currentAddress"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="期望地址"
                        prop="futureAddress">
            <el-input v-model="form.futureAddress"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="家庭情况"
                        prop="family">
            <el-input v-model="form.family"
                      placeholder="婚育情况，是否有宝宝，爱人是做什么的在什么公司？房子是买还是租的，距离远不远？"
                      maxlength="200"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="公司"
                        prop="companyName">
            <el-input placeholder="填写公司名称、入职离职日期、岗位。多段工作请换行填写。"
                      v-model="form.companyName"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 100}"
                      maxlength="200"
                      show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现薪资"
                        prop="currentMoney">
            <el-input v-model="form.currentMoney"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-tooltip class="item"
                      effect="dark"
                      content="期望薪资一定和家人商量好。顾问和候选人商量好的薪资，一定要让候选人Verify，并强调一定按照我们沟通好的内容跟HR说。因为HR对我们很信任，如果您面试时跟HR说的不一致，HR会觉得您在薪资上反复变化，可能会不过。"
                      placement="top">
            <el-form-item label="期望薪资"
                          prop="futureMoney">
              <el-input v-model="form.futureMoney"
                        maxlength="100"
                        clearable></el-input>
            </el-form-item>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="离职分析"
                        prop="dimissionAnalysis">
            <el-input v-model="form.dimissionAnalysis"
                      placeholder="时间要多久，如果您走的时候老板给您升职/加薪/转岗您会怎么决定呢？离职状态的话为什么会裸辞，有赔偿金吗（可以表明是主动离职还是被动离职）什么时候可以上岗？"
                      maxlength="200"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="不匹配原因"
                        prop="notMatchReason">
            <el-select v-model="form.notMatchReason"
                       placeholder="请选择"
                       style="width:100%"
                       filterable
                       clearable>
              <el-option v-for="reaseon in notMatchReasonList"
                         :key="reaseon.code"
                         :value="reaseon.code"
                         :label="reaseon.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="原因详情"
                        prop="notMatchReasonDetail">
            <el-input v-model="form.notMatchReasonDetail"
                      maxlength="400"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="组织架构"
                        prop="companyStructure">
            <el-input v-model="form.companyStructure"
                      placeholder="汇报给谁，他的title是什么？和您平级的有几位？您现在带团队吗？带多少个人团队呢？从什么时候开始带团队，下面的团队是怎么分工的呢？工作内容"
                      maxlength="200"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="学校"
                        prop="schoolName">
            <el-input v-model="form.schoolName"
                      placeholder="是统招的吗？学历证、学位证都有吗？学信网可以查到吗？"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 100}"
                      maxlength="200"
                      show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="必要检查"
                        prop="doubleCheck">
            <el-checkbox-group v-model="form.doubleCheck">
              <el-tooltip class="item"
                          effect="dark"
                          content="请您认真核对简历中中英所有信息（英文语法），包括学历、工作经历及简历上出现的所有日期、薪资的真实准确，客户的背调很严格，现在有问题我可以帮您解决，如果等到背调的时候就会取消offer并上黑名单。"
                          placement="top">
                <el-checkbox label="RESUME">简历内容真实准确</el-checkbox>
              </el-tooltip>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="备注"
                        prop="remark">
            <el-input v-model="form.remark"
                      type="textarea"
                      :rows="3"
                      :autosize="{ minRows: 2, maxRows: 100}"
                      maxlength="2000"
                      show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="简历"
                        prop="resume">
            <el-input v-model="resume"
                      type="textarea"
                      :rows="5"
                      :autosize="{ minRows: 2, maxRows: 100}"
                      maxlength="6000"
                      show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="新标签">
            <el-input v-model="newLabel"
                      placeholder="输入新标签名称"
                      maxlength="100"
                      style="width:250px;"
                      show-word-limit
                      clearable></el-input>
            <el-button type="success"
                       size="mini"
                       icon="el-icon-circle-plus"
                       @click="addLabel">添加</el-button>
            <el-button type="danger"
                       size="mini"
                       icon="el-icon-remove-outline"
                       @click="deleteLabel">删除</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-collapse style="border-width:0px;morgin:0px;padding:0px;">
            <el-collapse-item title="下拉展示所有标签"
                              name="1"
                              style="border-width:0px;morgin:0px;padding:0px;">
              <el-checkbox-group v-model="form.labels"
                                 @change="handleLabelsChange">
                <el-checkbox v-for="label in allLabels"
                             :label="label"
                             :key="label">{{label}}</el-checkbox>
              </el-checkbox-group>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="特殊项">
            <el-checkbox-group v-model="form.specialItem">
              <el-checkbox label="OVERSEASTUDENT">海外留学</el-checkbox>
              <el-checkbox label="OVERSEAASSIGNMENT">海外工作</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs type="border-card">
      <!--职位列表开始-->
      <el-tab-pane label="推荐职位/评论">
        <div class="toolbar"
             v-show="(mode === 'add' || mode === 'modify')">
          <el-tooltip class="item"
                      effect="dark"
                      content="将候选人推荐到职位"
                      placement="top">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-share"
                       @click="openSelectCaseDialog">推荐职位</el-button>
          </el-tooltip>
        </div>
        <el-table highlight-current-row
                  @current-change="handleSelectCaseChange"
                  :data="candidateForCaseList"
                  :border="true"
                  style="width: 100%">
          <el-table-column type="index"
                           width="50"
                           label="序号"></el-table-column>

          <el-table-column width="200"
                           label="操作">
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
          <el-table-column prop="clientName"
                           label="公司名称">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="editClient(scope.$index, scope.row)">{{scope.row.clientName}}</el-button>
            </template></el-table-column>
          <el-table-column prop="title"
                           label="职位名称">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="editCase(scope.$index, scope.row)">{{scope.row.title}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--职位列表结束-->
        <br />
        <el-form ref="newComment"
                 label-position="left"
                 size="small"
                 :model="form"
                 label-width="80px"
                 style="text-align:left;">
          <el-row :gutter="20">
            <el-col :span="3">
              <el-button type="success"
                         size="small"
                         icon="el-icon-chat-dot-round"
                         @click="saveComment">保存评论</el-button>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评论阶段"
                            prop="phase"
                            v-show="(mode === 'add' || mode === 'modify')">
                <el-select v-model="newComment.phase"
                           @change="phaseChange"
                           filterable
                           placeholder="请选择">
                  <el-option v-for="item in phaseOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="评论内容"
                            prop="content"
                            v-show="(mode === 'add' || mode === 'modify')">
                <div v-if="newComment.phase === '1st Interview' || newComment.phase === '2nd Interview' || newComment.phase === '3rd Interview' || newComment.phase === '4th Interview' || newComment.phase === '5th Interview' || newComment.phase === '6th Interview' || newComment.phase === 'Final Interview'">
                  <el-date-picker v-model="newComment.interviewTime"
                                  type="datetime"
                                  placeholder="选择面试时间">
                  </el-date-picker>
                  <el-checkbox v-model="newComment.isFinal">Final</el-checkbox>
                </div>
                <el-input type="textarea"
                          v-model="newComment.content"
                          :autosize="{ minRows: 1, maxRows: 30}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--评论开始-->
        <el-table :data="comments"
                  :border="true"
                  :highlight-current-row="true"
                  :stripe="true"
                  style="width: 100%">
          <el-table-column prop="username"
                           label="评论人"
                           width="100"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="inputTime"
                           label="评论时间"
                           width="160"
                           :formatter="formatTime"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="phase"
                           label="评论阶段"
                           width="130"
                           :formatter="formatPhase"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="interviewTime"
                           label="面试时间"
                           width="140"
                           :formatter="formatTimeForInterviewTime"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="content"
                           label="评论内容"></el-table-column>
          <el-table-column label="操作"
                           width="100">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="text"
                         v-if="showCommentCFButton(scope.row)"
                         @click="addCFModel(scope.row)">添加CF</el-button>
              <el-button size="mini"
                         type="text"
                         v-if="showCommentCFButton(scope.row)"
                         @click="modifyComment(scope.row)">修改</el-button>
              <el-button size="mini"
                         type="text"
                         style="color:red;"
                         v-if="showCommentDeleteButton(scope.row)"
                         @click="deleteComment(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--评论结束-->
      </el-tab-pane>
      <el-tab-pane label="任务">
        <!--任务开始-->
        <div v-show="tasks.length > 0"
             style="margin-bottom:20px;">
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
          <el-row v-for="task in tasks"
                  :key="task.id"
                  style="text-align:left;">
            <el-col :span="2">
              <div class="grid-content bg-purple">{{task.executeUserName}}</div>
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
        <el-form ref="newTask"
                 label-position="left"
                 size="small"
                 :model="form"
                 label-width="80px"
                 style="text-align:left;"
                 v-show="(mode === 'add' || mode === 'modify')">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="执行时间"
                            prop="executeDate">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="newTask.executeDate"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="任务标题"
                            prop="taskTitle">
                <el-input v-model="newTask.taskTitle"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="任务内容"
                            prop="taskContent">
                <el-input type="textarea"
                          v-model="newTask.taskContent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="toolbar"
             v-show="(mode === 'add' || mode === 'modify')">
          <el-button type="success"
                     size="small"
                     icon="el-icon-circle-check"
                     @click="saveTask">保存任务</el-button>
        </div>
        <!--任务结束-->
      </el-tab-pane>
      <el-tab-pane label="文件">
        <!--附件开始-->
        <downloadFile :files="uploadFiles"
                      v-on:delete-file-success="queryUploadFiles"></downloadFile>
        <!--附件结束-->
      </el-tab-pane>
    </el-tabs>
    <!--推荐职位对话框-->
    <el-dialog title="推荐职位"
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
  </div>
</template>
<script src="./candidate.js"></script>
