<template>
  <div style="height:100%;">
    <div class="blockdiv2">
      <h3 v-if="!showControl('/')">欢迎使用Hello Applicant系统</h3>
      <el-tabs type="border-card" v-if="showControl('/')">
        <el-tab-pane label="关注职位" style="text-align:left;" v-if="showControl('/focus')">
          <div v-for="(client,index) in caseAttention4ClientVOArray" :key="index">
            <el-button
              type="text"
              @click="toClient(client.clientId)"
              style="font-size:22px;padding-top:0px;padding-bottom:0px;"
            >{{client.clientChineseName}}</el-button>
            <div style="margin-left:30px;">
              <div v-for="(clientCase,index2) in client.caseList" :key="index2">
                <el-button
                  type="text"
                  @click="toCase(clientCase.caseId)"
                  style="font-size:18px;padding-top:0px;padding-bottom:0px;color:#67C23A;"
                >{{clientCase.caseTitle}}</el-button>
                <div style="margin-left:30px;margin-bottom:10px;">
                  <el-table
                    :data="clientCase.candidateList"
                    :highlight-current-row="true"
                    style="width:100%;font-size:16px;"
                    @current-change="rowChange"
                    :show-header="false"
                    :cell-style="{padding: '0'}"
                    v-show="clientCase.candidateList.length > 0"
                  >
                    <el-table-column width="80" label="操作">
                      <template slot-scope="scope">
                        <el-button type="text" @click="toCandidate(scope.row)">编辑候选人</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="70"
                      prop="candidateChineseName"
                      label="候选人姓名"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      width="90"
                      prop="latestCommentUsername"
                      label="顾问"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      width="180"
                      prop="latestCommentInputtime"
                      label="评论时间"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column prop="latestCommentContent" label="评论内容" show-overflow-tooltip></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="对接职位" v-if="showControl('/cw')">
          <div v-for="(client,index) in cwCaseArray" :key="index">
            <el-button
              type="text"
              @click="toClient(client.clientId)"
              style="font-size:22px;padding-top:0px;padding-bottom:0px;"
            >{{client.clientChineseName}}</el-button>
            <div style="margin-left:30px;">
              <div v-for="(clientCase,index2) in client.caseList" :key="index2">
                <el-button
                  type="text"
                  @click="toCase(clientCase.caseId)"
                  style="font-size:18px;padding-top:0px;padding-bottom:0px;color:#67C23A;"
                >{{clientCase.caseTitle}}</el-button>
                <div style="margin-left:30px;margin-bottom:10px;">
                  <el-table
                    :data="clientCase.candidateList"
                    :highlight-current-row="true"
                    style="width:100%;font-size:16px;"
                    @current-change="rowChange"
                    :show-header="false"
                    :cell-style="{padding: '0'}"
                    v-show="clientCase.candidateList.length > 0"
                  >
                    <el-table-column width="80" label="操作">
                      <template slot-scope="scope">
                        <el-button type="text" @click="toCandidate(scope.row)">编辑候选人</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="70"
                      prop="candidateChineseName"
                      label="候选人姓名"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      width="90"
                      prop="latestCommentUsername"
                      label="顾问"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      width="180"
                      prop="latestCommentInputtime"
                      label="评论时间"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column prop="latestCommentContent" label="评论内容" show-overflow-tooltip></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的新闻" v-if="showControl('/news')">
          <el-table
            :data="myNewsList"
            :border="true"
            :highlight-current-row="true"
            :stripe="true"
            :show-header="false"
            @row-dblclick="handleNewsDblClick"
            @current-change="newsRowChange"
            style="width: 100%"
          >
            <el-table-column prop="title" label="标题" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我的任务" v-if="showControl('/task')">
          <el-table
            :data="myTasks"
            :border="true"
            :highlight-current-row="true"
            :stripe="true"
            :show-header="false"
            @row-dblclick="handleTaskDblClick"
            @current-change="taskRowChange"
            style="width: 100%"
          >
            <el-table-column prop="taskTitle" label="标题" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="taskContent" label="内容" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="KPI" v-if="showControl('/kpi')">
          <div>
            <el-date-picker
              v-model="KPIDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button type="success" size="medium" icon="el-icon-setting" @click="calcKPI()">计算KPI</el-button>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-download"
              @click="downloadKPI()"
            >下载KPI</el-button>
          </div>
          <div>
            <el-table
              :data="KPIDashboard"
              :border="true"
              :highlight-current-row="true"
              :stripe="true"
              style="width: 100%"
              max-height="2000"
              @current-change="rowChange"
            >
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="kpiDetail(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="realName" label="姓名"></el-table-column>
              <el-table-column prop="ti" label="TI"></el-table-column>
              <el-table-column prop="vi" label="VI"></el-table-column>
              <el-table-column prop="ioi" label="IOI"></el-table-column>
              <el-table-column prop="viioi" label="VI+IOI"></el-table-column>
              <el-table-column prop="cvo" label="CVO"></el-table-column>
              <el-table-column prop="interview1st" label="1st Interview"></el-table-column>
              <el-table-column prop="offerSigned" label="Offer Signed"></el-table-column>
              <el-table-column prop="onBoard" label="On Board"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="评论详情" :visible.sync="commentsDetailTableVisible" width="70%">
      <el-table :data="commentsDetailTable" :highlight-current-row="true" max-height="500">
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editCandidate(scope.$index, scope.row)"
            >编辑候选人</el-button>
          </template>
        </el-table-column>
        <el-table-column property="chineseName" label="候选人姓名" width="100"></el-table-column>
        <el-table-column property="phase" label="阶段" width="100"></el-table-column>
        <el-table-column property="content" label="内容"></el-table-column>
        <el-table-column property="inputTime" label="录入时间" width="180"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<style>
.blockdiv {
  min-height: 100%;
  width: 49%;
  padding: 2px;
  float: left;
}
.blockdiv2 {
  width: 100%;
  margin: 2px;
  text-align: left;
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
