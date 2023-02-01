<template>
  <div class="blockdiv">
    <div class="blockdiv2"
         v-if="!showControl('/')"></div>
    <el-tabs type="border-card"
             v-if="showControl('/')"
             @tab-click="tabClick"
             :value="tabIndex">
      <!--pipeline模块开始-->
      <el-tab-pane label="Pipeline"
                   name="0">
        <div class="toolbar">
          <el-button type="primary"
                     size="mini"
                     @click="queryPipeline('self')">自 己</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="queryPipeline('all')">全 部</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="queryPipeline('shenyang')">沈 阳</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="queryPipeline('shanghai')">上 海</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="queryPipeline('beijing')">北 京</el-button>
        </div>
        <div v-for="pipeline in pipelineList"
             :key="pipeline.user.id"
             style="clear:both;">
          <span>{{pipeline.user.username}}</span>
          <div v-for="pipecase in pipeline.pipelineCaseList"
               :key="pipecase.id"
               style="margin-left:30px;clear:both;">
            <el-row>
              <el-col :span="8">
                <el-button type="text"
                           @click="toClient(pipecase.clientId)"
                           style="font-size:18px;">{{pipecase.clientChineseName}}</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="text"
                           @click="toCase(pipecase.id)"
                           style="font-size:18px;">{{pipecase.title}}</el-button>
              </el-col>
            </el-row>
            <div>
              <div style="width:14%;float:left;">
                <div style="background-color:#F2F6FC;padding:0px 10px 0px 10px;">
                  <span>Payment</span><br />
                </div>
                <div style="padding:0px 10px 0px 10px;">
                  <el-button v-for="candidate in pipecase.paymentCandidateList"
                             :key="candidate.id"
                             type="text"
                             @click="jumpToCandidateById(candidate.id)"
                             style="margin:0px;padding:0px;color:#606266;font-size:16px;">{{candidate.chineseName}}</el-button>
                </div>
              </div>
              <div style="width:14%;float:left;">
                <div style="background-color:#F2F6FC;padding:0px 10px 0px 10px;">
                  <span style="width:100%;margin:10px;10px;0px;10px;">Invoice</span><br />
                </div>
              </div>
              <div style="width:14%;float:left;">
                <div style="background-color:#F2F6FC;padding:0px 10px 0px 10px;">
                  <span style="width:100%;margin:10px;10px;0px;10px;">Onboard</span><br />
                </div>
                <div style="padding:0px 10px 0px 10px;">
                  <el-button v-for="candidate in pipecase.onboardCandidateList"
                             :key="candidate.id"
                             type="text"
                             @click="jumpToCandidateById(candidate.id)"
                             style="margin:0px;padding:0px;color:#606266;font-size:16px;">{{candidate.chineseName}}</el-button>
                </div>
              </div>
              <div style="width:14%;float:left;">
                <div style="background-color:#F2F6FC;padding:0px 10px 0px 10px;">
                  <span style="width:100%;margin:10px;10px;0px;10px;">Offer</span><br />
                </div>
                <div style="padding:0px 10px 0px 10px;">
                  <el-button v-for="candidate in pipecase.offerCandidateList"
                             :key="candidate.id"
                             type="text"
                             @click="jumpToCandidateById(candidate.id)"
                             style="margin:0px;padding:0px;color:#606266;font-size:16px;">{{candidate.chineseName}}</el-button>
                </div>
              </div>
              <div style="width:14%;float:left;">
                <div style="background-color:#F2F6FC;padding:0px 10px 0px 10px;">
                  <span style="width:100%;margin:10px;10px;0px;10px;">Interview</span><br />
                </div>
                <div style="padding:0px 10px 0px 10px;">
                  <el-button v-for="candidate in pipecase.interviewCandidateList"
                             :key="candidate.id"
                             type="text"
                             @click="jumpToCandidateById(candidate.id)"
                             style="margin:0px;padding:0px;color:#606266;font-size:16px;">{{candidate.chineseName}}</el-button>
                </div>
              </div>
              <div style="width:14%;float:left;">
                <div style="background-color:#F2F6FC;padding:0px 10px 0px 10px;">
                  <span style="width:100%;margin:10px;10px;0px;10px;">CVO</span><br />
                </div>
                <div style="padding:0px 10px 0px 10px;">
                  <el-button v-for="candidate in pipecase.cvoCandidateList"
                             :key="candidate.id"
                             type="text"
                             @click="jumpToCandidateById(candidate.id)"
                             style="margin:0px;padding:0px;color:#606266;font-size:16px;">{{candidate.chineseName}}</el-button>
                </div>
              </div>
              <div style="width:14%;float:left;">
                <div style="background-color:#F2F6FC;padding:0px 10px 0px 10px;">
                  <span style="width:100%;margin:10px;10px;0px;10px;">VI/IOI</span><br />
                </div>
                <div style="padding:0px 10px 0px 10px;">
                  <el-button v-for="candidate in pipecase.viioiCandidateList"
                             :key="candidate.id"
                             type="text"
                             @click="jumpToCandidateById(candidate.id)"
                             style="margin:0px;padding:0px;color:#606266;font-size:16px;">{{candidate.chineseName}}</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!--pipeline模块结束-->
      <el-tab-pane label="关注职位"
                   style="text-align:left;"
                   v-if="showControl('/focus')"
                   name="1">
        <div class="toolbar">
          <el-button type="warning"
                     size="mini"
                     v-if="!attentionCaseShowCandidate"
                     @click="switchAttentionCaseShowCandidate(true)">显示候选人信息</el-button>
          <el-button type="primary"
                     size="mini"
                     v-if="attentionCaseShowCandidate"
                     @click="switchAttentionCaseShowCandidate(false)">隐藏候选人信息</el-button>
        </div>
        <div v-for="client in caseAttention4ClientVOArray"
             :key="client.clientId">
          <el-button type="text"
                     @click="toClient(client.clientId)"
                     style="font-size:22px;padding-top:0px;padding-bottom:0px;">{{client.clientChineseName}}</el-button>
          <div style="margin-left:30px;">
            <div v-for="clientCase in client.caseList"
                 :key="clientCase.caseId">
              <el-button type="text"
                         @click="toCase(clientCase.caseId)"
                         style="font-size:18px;padding-top:0px;padding-bottom:0px;color:#67C23A;">{{clientCase.caseTitle}}</el-button>
              <div style="margin-left:30px;margin-bottom:10px;">
                <el-table :data="clientCase.candidateList"
                          :highlight-current-row="true"
                          style="width:100%;font-size:16px;"
                          @current-change="rowChange"
                          :show-header="false"
                          :cell-style="{padding: '0'}"
                          v-show="attentionCaseShowCandidate && clientCase.candidateList.length > 0">
                  <el-table-column width="70"
                                   label="候选人姓名"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-button type="text"
                                 @click="jumpToCandidate(scope.row)">{{scope.row.candidateChineseName}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column width="90"
                                   prop="latestCommentUsername"
                                   label="顾问"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column width="180"
                                   prop="latestCommentInputtime"
                                   label="评论时间"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column prop="latestCommentContent"
                                   label="评论内容"
                                   show-overflow-tooltip></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="对接职位"
                   v-if="showControl('/cw')"
                   name="2">
        <div class="toolbar">
          <el-button type="warning"
                     size="mini"
                     v-if="!cwCaseShowCandidate"
                     @click="switchCWCaseShowCandidate(true)">显示候选人信息</el-button>
          <el-button type="primary"
                     size="mini"
                     v-if="cwCaseShowCandidate"
                     @click="switchCWCaseShowCandidate(false)">隐藏候选人信息</el-button>
        </div>
        <div v-for="client in cwCaseArray"
             :key="client.clientId">
          <el-button type="text"
                     @click="toClient(client.clientId)"
                     style="font-size:22px;padding-top:0px;padding-bottom:0px;">{{client.clientChineseName}}</el-button>
          <div style="margin-left:30px;">
            <div v-for="clientCase in client.caseList"
                 :key="clientCase.caseId">
              <el-button type="text"
                         @click="toCase(clientCase.caseId)"
                         style="font-size:18px;padding-top:0px;padding-bottom:0px;color:#67C23A;">{{clientCase.caseTitle}}</el-button>
              <div style="margin-left:30px;margin-bottom:10px;">
                <el-table :data="clientCase.candidateList"
                          :highlight-current-row="true"
                          style="width:100%;font-size:16px;"
                          @current-change="rowChange"
                          :show-header="false"
                          :cell-style="{padding: '0'}"
                          v-show="cwCaseShowCandidate && clientCase.candidateList.length > 0">
                  <el-table-column width="70"
                                   label="候选人姓名"
                                   show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-button type="text"
                                 @click="jumpToCandidate(scope.row)">{{scope.row.candidateChineseName}}</el-button>
                    </template></el-table-column>
                  <el-table-column width="90"
                                   prop="latestCommentUsername"
                                   label="顾问"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column width="180"
                                   prop="latestCommentInputtime"
                                   label="评论时间"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column prop="latestCommentContent"
                                   label="评论内容"
                                   show-overflow-tooltip></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关注候选人"
                   v-if="showControl('/candidateAttention')"
                   name="3">
        <el-button type="primary"
                   plain
                   shadow="hover"
                   v-for="candidateAttention in candidateAttentionList"
                   :key="candidateAttention.candidateId"
                   @click="detailCandidate(candidateAttention.candidateId)">{{candidateAttention.candidateChineseName}}</el-button>
      </el-tab-pane>
      <el-tab-pane label="我的新闻"
                   v-if="showControl('/news')"
                   name="4">
        <el-table :data="myNewsList"
                  :border="true"
                  :highlight-current-row="true"
                  :stripe="true"
                  :show-header="false"
                  @row-dblclick="handleNewsDblClick"
                  @current-change="newsRowChange"
                  style="width: 100%">
          <el-table-column prop="title"
                           label="新闻标题"
                           width="180"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="content"
                           label="新闻内容"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="我的任务"
                   v-if="showControl('/task')"
                   name="5">
        <el-table :data="myTasks"
                  :border="true"
                  :highlight-current-row="true"
                  :stripe="true"
                  :show-header="true"
                  @row-dblclick="handleTaskDblClick"
                  @current-change="taskRowChange"
                  style="width: 100%">
          <el-table-column prop="taskTitle"
                           label="任务标题"
                           width="180"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="taskContent"
                           label="任务内容"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="KPI"
                   v-if="showControl('/kpi')"
                   name="6">
        <div>
          <el-date-picker type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="开始日期"
                          v-model="startDate"
                          style="width:180px;"></el-date-picker>
          <span>-</span>
          <el-date-picker type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="结束日期"
                          v-model="endDate"
                          style="width:180px;"></el-date-picker>&nbsp;&nbsp;
          <el-button type="success"
                     size="medium"
                     icon="el-icon-setting"
                     @click="calcKPI()">计算KPI</el-button>
          <el-button type="success"
                     plain
                     size="medium"
                     @click="calcDate('today')">今天</el-button>
          <el-button type="success"
                     plain
                     size="medium"
                     @click="calcDate('week')">本周</el-button>
          <el-button type="success"
                     plain
                     size="medium"
                     @click="calcDate('month')">本月</el-button>
          <el-button type="success"
                     plain
                     size="medium"
                     @click="calcDate('tonow')">截止目前</el-button>
          <el-button type="primary"
                     size="medium"
                     icon="el-icon-download"
                     @click="downloadKPI()">下载KPI</el-button>
        </div>
        <br />
        <div>
          <el-table :data="KPIDashboard"
                    :border="true"
                    :highlight-current-row="true"
                    :stripe="true"
                    style="width: 100%"
                    max-height="2000"
                    @current-change="rowChange">
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="kpiDetail(scope.$index, scope.row)">详情</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="realName"
                             label="姓名"></el-table-column>
            <el-table-column prop="ti"
                             label="TI"></el-table-column>
            <el-table-column prop="vi"
                             label="VI"></el-table-column>
            <el-table-column prop="ioi"
                             label="IOI"></el-table-column>
            <el-table-column prop="viioi"
                             label="VI+IOI"></el-table-column>
            <el-table-column prop="cvo"
                             label="CVO"></el-table-column>
            <el-table-column prop="interview1st"
                             label="1st Interview"></el-table-column>
            <el-table-column prop="offerSigned"
                             label="Offer Signed"></el-table-column>
            <el-table-column prop="onBoard"
                             label="On Board"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="抽签"
                   name="7">
        <div class="toolbar">
          <el-button type="success"
                     size="small"
                     icon="el-icon-circle-check"
                     @click="sortUsers">排 序</el-button>
          <el-button type="warning"
                     size="small"
                     icon="el-icon-delete"
                     @click="clearSelectUsers">清 空</el-button>
        </div>
        <el-checkbox-group v-model="selectUsers"
                           style="margin-top:10px;margin-bottom:10px;">
          <el-checkbox v-for="user in users"
                       :key="user.id"
                       :label="user">{{user.username}}</el-checkbox>
        </el-checkbox-group>
        <el-table :data="sortSelectUsers"
                  :border="true"
                  :highlight-current-row="true"
                  :stripe="true"
                  style="width: 100%">
          <el-table-column type="index"
                           label="序号"
                           width="50"></el-table-column>
          <el-table-column prop="username"
                           label="登录名"></el-table-column>
          <el-table-column prop="realname"
                           label="姓名"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="评论详情"
               :visible.sync="commentsDetailTableVisible"
               width="80%">
      <el-button size="small"
                 type="primary"
                 @click="orderComment('phase')">按阶段排序</el-button>
      <el-button size="small"
                 type="primary"
                 @click="orderComment('candidate')">按候选人排序</el-button>
      <br /><span>筛选阶段：</span>
      <el-button type="text"
                 @click="selectAllPhase">全选</el-button>
      <el-button type="text"
                 @click="clearPhaseSelected">清空</el-button>&nbsp;&nbsp;
      <el-checkbox-group v-model="selectedPhases"
                         @change="handlePhaseChange"
                         style="margin-top:10px;margin-bottom:10px;display:inline;">
        <el-checkbox v-for="phase in phaseList"
                     :key="phase"
                     :label="phase">{{phase}}</el-checkbox>
      </el-checkbox-group>
      <el-table :data="commentsDetailTable"
                :highlight-current-row="true"
                :border="true"
                max-height="500">
        <el-table-column property="candidateName"
                         label="候选人姓名"
                         width="100">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="editCandidate(scope.$index, scope.row)">{{scope.row.candidateName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column property="phase"
                         label="阶段"
                         width="100"></el-table-column>
        <el-table-column property="content"
                         label="内容"></el-table-column>
        <el-table-column property="inputTime"
                         label="录入时间"
                         width="180"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<style>
.blockdiv {
  width: 100%;
  height: 100%;
  text-align: left;
}
.blockdiv2 {
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/background-6.jpg");
  background-size: 100%;
}
.box-card {
  height: 100%;
  text-align: left;
}
.clearfix {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}
</style>
<script src="./summary.js"></script>
