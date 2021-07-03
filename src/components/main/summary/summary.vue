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
            @current-change="rowChange"
          >
            <el-table-column prop="name" label="姓名"></el-table-column>
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
    <!-- <div class="blockdiv2">
      <el-card class="box-card">
        <el-calendar v-model="calendarValue">
        </el-calendar>
      </el-card>
    </div> -->
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
  height: 500px;
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
