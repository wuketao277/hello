<template>
  <div style="height:100%;">
    <div class="blockdiv">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的新闻</span>
          <el-button
            size="mini"
            icon="el-icon-edit"
            circle
            @click="openView('/mynews/mynewslist')"
          ></el-button>
        </div>
        <div v-for="myNews in myNewsList" :key="myNews">
          <el-row style="padding-bottom:5px;">
            <el-col :span="20">{{myNews.title}}</el-col>
            <el-col :span="4">
              <el-button type="success" size="mini" icon="el-icon-circle-check" @click="viewMyNewsDetail(myNews)">查看</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div class="blockdiv">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的任务</span>
          <el-button
            size="mini"
            icon="el-icon-edit"
            circle
            @click="openView('/mytask/mytasklist')"
          ></el-button>
        </div>
        <div v-for="task in myTasks" :key="task">
          <el-row style="padding-bottom:5px;">
            <el-col :span="20">{{task.taskTitle}}</el-col>
            <el-col :span="4">
              <el-button type="success" size="mini" icon="el-icon-circle-check" @click="viewMyTaskDetail(task)">查看</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div class="blockdiv2">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>KPI看板</span>
        </div>
        <div>
          <el-date-picker
            v-model="KPIDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="success" size="mini" icon="el-icon-setting" @click="calcKPI()">计算KPI</el-button>
        </div>
        <div>
          <el-table
            :data="KPIDashboard"
            :border="true"
            :highlight-current-row="true"
            :stripe="true"
            :row-class-name="rowStyle"
            style="width: 100%"
            max-height="500"
            @current-change="rowChange"
          >
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="kpiDetail(scope.$index, scope.row)">详情</el-button>
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
      </el-card>
    </div>
    <el-dialog title="评论详情" :visible.sync="commentsDetailTableVisible" width="70%">
      <el-table :data="commentsDetailTable" max-height="500">
        <el-table-column label="操作" width="130" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editCandidate(scope.$index, scope.row)">编辑候选人</el-button>
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
  height: 300px;
  width: 49%;
  margin: 2px;
  float: left;
}
.blockdiv2 {
  /* height: 500px; */
  width: 98%;
  margin: 2px;
  float: left;
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
