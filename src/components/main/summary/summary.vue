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
                     plain
                     size="small"
                     @click="queryPipeline('myself')">自 己</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryPipeline('all')">全 部</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryPipeline('shenyang')">沈 阳</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryPipeline('shanghai')">上 海</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryPipeline('beijing')">北 京</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryPipeline('wuhan')">武 汉</el-button>
        </div>
        <el-button type="text"
                   plain
                   size="mini"
                   v-if="pipelineShowControlList.length === 0"
                   @click="openAllPipeline()">展开全部</el-button>
        <el-button type="text"
                   plain
                   size="mini"
                   v-if="pipelineShowControlList.length !== 0"
                   @click="closeAllPipeline()">折叠全部</el-button>
        <el-button type="text"
                   plain
                   size="mini"
                   v-if="!pipelineCaseShowControlFlag"
                   @click="pipelineCaseShowControlFlag = true">显示空职位</el-button>
        <el-button type="text"
                   plain
                   size="mini"
                   v-if="pipelineCaseShowControlFlag"
                   @click="pipelineCaseShowControlFlag = false">隐藏空职位</el-button>
        <div v-for="pipeline in pipelineList"
             :key="pipeline.user.id"
             style="clear:both;">
          <span>{{pipeline.user.username}}</span>
          <el-button type="text"
                     plain
                     size="mini"
                     @click="openPipeline(pipeline.user.username)"
                     v-if="!showPipeline(pipeline.user.username)">展开</el-button>
          <el-button type="text"
                     plain
                     size="mini"
                     @click="closePipeline(pipeline.user.username)"
                     v-if="showPipeline(pipeline.user.username)">折叠</el-button>
          <div v-for="pipecase in pipeline.pipelineCaseList"
               :key="pipecase.id"
               style="margin-left:30px;clear:both;"
               v-show="showPipeline(pipeline.user.username)">
            <div v-if="pipelineCaseShowControlFlag || pipecase.paymentCandidateList.length !== 0
             || pipecase.invoiceCandidateList.length !== 0
              || pipecase.onboardCandidateList.length !== 0
               || pipecase.offerCandidateList.length !== 0
                || pipecase.interviewCandidateList.length !== 0
                 || pipecase.cvoCandidateList.length !== 0
                 || pipecase.viioiCandidateList.length !== 0">
              <el-row>
                <el-col :span="12">
                  <el-button type="text"
                             @click="toClient(pipecase.clientId)"
                             style="font-size:18px;">{{pipecase.clientChineseName}}</el-button>
                </el-col>
                <el-col :span="12">
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
                               style="margin:0px;padding:0px;color:#67C23A;font-size:16px;">{{candidate.chineseName}}</el-button>
                  </div>
                </div>
                <div style="width:14%;float:left;">
                  <div style="background-color:#F2F6FC;padding:0px 10px 0px 10px;">
                    <span style="width:100%;margin:10px;10px;0px;10px;">Invoice</span><br />
                  </div>
                  <div style="padding:0px 10px 0px 10px;">
                    <el-button v-for="candidate in pipecase.invoiceCandidateList"
                               :key="candidate.id"
                               type="text"
                               @click="jumpToCandidateById(candidate.id)"
                               style="margin:0px;padding:0px;color:#67C23A;font-size:16px;">{{candidate.chineseName}}</el-button>
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
                               style="margin:0px;padding:0px;color:#67C23A;font-size:16px;">{{candidate.chineseName}}</el-button>
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
                               style="margin:0px;padding:0px;color:#67C23A;font-size:16px;">{{candidate.chineseName}}</el-button>
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
                               style="margin:0px;padding:0px;color:#67C23A;font-size:16px;">{{candidate.chineseName}}</el-button>
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
                               style="margin:0px;padding:0px;color:#67C23A;font-size:16px;">{{candidate.chineseName}}</el-button>
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
                               style="margin:0px;padding:0px;color:#67C23A;font-size:16px;">{{candidate.chineseName}}</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!--pipeline模块结束-->
      <!--面试安排开始-->
      <el-tab-pane label="面试安排"
                   name="1">
        <div class="toolbar">
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryInterviewPlan('myself')">自 己</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryInterviewPlan('all')">全 部</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryInterviewPlan('shenyang')">沈 阳</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryInterviewPlan('shanghai')">上 海</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryInterviewPlan('beijing')">北 京</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="queryInterviewPlan('wuhan')">武 汉</el-button>
        </div>
        <div v-if="showTodayOnboardTable()">
          <h3 style="margin:0px;">当日入职信息</h3>
          <el-table :data="todayOnboardList"
                    :border="true"
                    :highlight-current-row="true"
                    :stripe="true"
                    :show-header="true"
                    :row-class-name="setRowClassNameForInterviewPlan"
                    style="width: 100%">
            <el-table-column type="index"
                             width="50"
                             label="序号"></el-table-column>
            <el-table-column prop="clientName"
                             label="公司名称"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text"
                           @click="editClient(scope.$index, scope.row)">{{scope.row.clientName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="title"
                             label="岗位名称"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text"
                           @click="editCase(scope.$index, scope.row)">{{scope.row.title}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="candidateChineseName"
                             label="候选人"
                             width="65"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text"
                           @click="editCandidate(scope.$index, scope.row.candidateId)">{{scope.row.candidateChineseName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="allUserName"
                             label="相关人员"
                             show-overflow-tooltip></el-table-column>
          </el-table>
          <br />
          <h3 style="margin:0px;">当日面试信息</h3>
        </div>
        <el-table :data="interviewPlan"
                  :border="true"
                  :highlight-current-row="true"
                  :stripe="true"
                  :show-header="true"
                  :row-class-name="setRowClassNameForInterviewPlan"
                  style="width: 100%">
          <el-table-column type="index"
                           width="50"
                           label="序号"></el-table-column>
          <el-table-column prop="clientName"
                           label="公司名称"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text"
                         @click="editClient(scope.$index, scope.row)">{{scope.row.clientName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="caseTitle"
                           label="岗位名称"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text"
                         @click="editCase(scope.$index, scope.row)">{{scope.row.caseTitle}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="candidateName"
                           label="候选人"
                           width="65"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text"
                         @click="editCandidate(scope.$index, scope.row.candidateId)">{{scope.row.candidateName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="interviewTime"
                           label="面试时间"
                           width="160"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="phase"
                           label="第几轮"
                           width="65"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="content"
                           label="内容"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="username"
                           label="创建人"
                           width="150"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="cw"
                           label="CW"
                           width="70"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
      <!--面试安排结束-->
      <el-tab-pane label="关注职位"
                   style="text-align:left;"
                   v-if="showControl('/focus')"
                   name="2">
        <div class="toolbar">
          <el-button type="warning"
                     size="small"
                     plain
                     v-if="!attentionCaseShowCandidate"
                     @click="switchAttentionCaseShowCandidate(true)">显示候选人信息</el-button>
          <el-button type="primary"
                     size="small"
                     plain
                     v-if="attentionCaseShowCandidate"
                     @click="switchAttentionCaseShowCandidate(false)">隐藏候选人信息</el-button>
          <el-button type="primary"
                     size="small"
                     plain
                     v-if="showControl('/queryAllUserCaseAttention')"
                     @click="queryAllUserCaseAttention">全部关注职位</el-button>
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
                   name="3">
        <div class="toolbar">
          <el-button type="warning"
                     size="small"
                     plain
                     v-if="!cwCaseShowCandidate"
                     @click="switchCWCaseShowCandidate(true)">显示候选人信息</el-button>
          <el-button type="primary"
                     size="small"
                     plain
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
                   name="4">
        <div v-for="candidateAttention in candidateAttentionList"
             :key="candidateAttention.id"
             style="display:inline-block;width:100px;float:left;margin:5px;border:1px solid #DCDFE6;border-radius: 4px;color:#606266;"
             @click="detailCandidate(candidateAttention.candidateId)">
          <div style="text-align:center;margin-top:5px;margin-bottom:5px;font-size:14px;color:#409EFF;">{{candidateAttention.candidateChineseName}}</div>
          <span v-for="label in candidateAttention.labels"
                :key="label"
                style="font-size:10px;margin-left:4px;margin-right:4px;">{{label}}</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的新闻"
                   v-if="showControl('/news')"
                   name="5">
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
                   name="6">
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
                   name="7">
        <div>
          <el-date-picker type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="开始日期"
                          v-model="startDate"
                          size="small"
                          style="width:130px;"></el-date-picker>
          <span>-</span>
          <el-date-picker type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="结束日期"
                          v-model="endDate"
                          size="small"
                          style="width:130px;"></el-date-picker>&nbsp;&nbsp;
          <el-checkbox v-model="kpiOnlyShowCheck"
                       @change="calcKPI()">只看考核人</el-checkbox>
          &nbsp;&nbsp;
          <el-date-picker v-model="saveKPIMonth"
                          value-format="yyyy-MM-dd"
                          type="month"
                          size="small"
                          style="width:130px;"
                          placeholder="选择月"
                          v-if="showControl('saveKPIDate')">
          </el-date-picker>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="saveKPI"
                     v-if="showControl('saveKPIButton')">保存KPI结果</el-button>
        </div>
        <div style="margin-top:5px;">
          <el-button type="primary"
                     plain
                     size="small"
                     @click="calcDate('today')">今天</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="calcDate('week')">本周</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="calcDate('preMonth')">上月</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="calcDate('month')">本月</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="calcDate('monthToNow')">本月至今</el-button>
          <el-button type="primary"
                     size="small"
                     plain
                     @click="calcDate('tonow')">截止目前</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="kpiScopeChange('myself')">自己</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="kpiScopeChange('all')">全部</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="kpiScopeChange('shanghai')">上海</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="kpiScopeChange('beijing')">北京</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="kpiScopeChange('shenyang')">沈阳</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="kpiScopeChange('wuhan')">武汉</el-button>
          <el-button type="primary"
                     plain
                     size="small"
                     @click="kpiScopeChange('nanjing')">南京</el-button>
          <el-button type="primary"
                     size="small"
                     icon="el-icon-setting"
                     plain
                     @click="calcKPI()">计算KPI</el-button>
          <el-button type="primary"
                     size="small"
                     icon="el-icon-download"
                     plain
                     @click="downloadKPI()">下载KPI</el-button>
        </div>
        <div>
          <el-table :data="KPIDashboard"
                    :border="true"
                    :highlight-current-row="true"
                    :stripe="true"
                    style="width: 100%;margin-top:10px;"
                    height="500px"
                    @current-change="rowChange">
            <el-table-column label="操作"
                             width="80px"
                             fixed>
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="kpiDetail(scope.$index, scope.row)">详情</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="userName"
                             label="姓名"
                             width="100px"
                             fixed></el-table-column>
            <el-table-column prop="finishRate"
                             label="总达成率"
                             width="70px"
                             fixed></el-table-column>
            <el-table-column prop="finishRateTICF"
                             label="TI+CF达成率"
                             width="70px"
                             fixed></el-table-column>
            <el-table-column prop="finishRateVIIOI"
                             label="VI+IOI达成率"
                             width="70px"
                             fixed></el-table-column>
            <el-table-column prop="finishRateCVO"
                             label="CVO达成率"
                             width="70px"
                             fixed></el-table-column>
            <el-table-column prop="finishRateInterview"
                             label="面试达成率"
                             width="70px"
                             fixed></el-table-column>
            <el-table-column prop="cvo"
                             label="CVO"
                             width="60px"></el-table-column>
            <el-table-column prop="interview1st"
                             label="1st"
                             width="60px"></el-table-column>
            <el-table-column prop="interview2nd"
                             label="2nd"
                             width="60px"></el-table-column>
            <el-table-column prop="interview3rd"
                             label="3rd"
                             width="60px"></el-table-column>
            <el-table-column prop="interview4th"
                             label="4th"
                             width="60px"></el-table-column>
            <el-table-column prop="interview5th"
                             label="5th"
                             width="60px"></el-table-column>
            <el-table-column prop="interviewFinal"
                             label="final"
                             width="60px"></el-table-column>
            <el-table-column prop="viioi"
                             label="VI+IOI"></el-table-column>
            <el-table-column prop="vi"
                             label="VI"
                             width="60px"></el-table-column>
            <el-table-column prop="ioi"
                             label="IOI"
                             width="60px"></el-table-column>
            <el-table-column prop="ticf"
                             label="TI+CF"></el-table-column>
            <el-table-column prop="ti"
                             label="TI"
                             width="60px"></el-table-column>
            <el-table-column prop="workDays"
                             label="工作天数"
                             width="80px"></el-table-column>
            <el-table-column prop="newCandidates"
                             label="新增候选人数量"
                             width="100px">
              <template slot-scope="scope">
                {{scope.row.newCandidates}}&nbsp;&nbsp;
                <el-button size="mini"
                           @click="candidateDetail(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="抽签"
                   name="8">
        <div class="toolbar">
          <el-button type="success"
                     size="small"
                     plain
                     icon="el-icon-circle-check"
                     @click="sortUsers">排 序</el-button>
          <el-button type="warning"
                     size="small"
                     plain
                     icon="el-icon-delete"
                     @click="clearSelectUsers">清 空</el-button>
        </div>
        <el-checkbox :indeterminate="isChouqianAll"
                     v-model="isChouqianCheckAll"
                     @change="handleChouqianCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="selectUsers"
                           style="margin-top:10px;margin-bottom:10px;">
          <el-checkbox v-for="user in drawusers"
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
                       @click="editCandidate(scope.$index, scope.row.candidateId)">{{scope.row.candidateName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column property="phase"
                         label="阶段"
                         width="100"></el-table-column>
        <el-table-column property="interviewTime"
                         label="面试时间"
                         width="160"></el-table-column>
        <el-table-column property="content"
                         label="内容"></el-table-column>
        <el-table-column property="inputTime"
                         label="录入时间"
                         width="160"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="候选人详情"
               :visible.sync="candidateDetailTableVisible"
               width="60%">
      <el-table :data="candidateDetailTable"
                :highlight-current-row="true"
                :border="true"
                max-height="500">
        <el-table-column property="chineseName"
                         label="候选人姓名"
                         width="100">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="editCandidate(scope.$index, scope.row.id)">{{scope.row.chineseName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column property="informationScore"
                         label="信息完整性"></el-table-column>
        <el-table-column property="createTime"
                         :formatter="formatTime"
                         label="录入时间"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="待办任务"
               :visible.sync="todoTaskDialog"
               width="80%">
      <el-table :data="myTasks"
                :border="true"
                :highlight-current-row="true"
                :stripe="true"
                :show-header="true"
                @row-dblclick="handleTaskDblClick"
                @current-change="taskRowChange"
                style="width: 100%">
        <el-table-column label="候选人"
                         width="80"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text"
                       @click="editCandidate(scope.$index, scope.row.relativeCandidateId)">{{scope.row.relativeCandidateChineseName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="taskTitle"
                         label="任务标题"
                         width="280"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="taskContent"
                         label="任务内容"
                         show-overflow-tooltip></el-table-column>
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
.rowDistanceDay0 {
  color: red;
}
.rowDistanceDay1 {
  color: #ffbb00;
}
.rowDistanceDay2 {
  color: #006eff;
}
</style>
<script src="./summary.js"></script>
