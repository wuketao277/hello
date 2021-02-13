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
    <!-- <div class="blockdiv">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的计划</span>
          <el-button
            size="mini"
            icon="el-icon-edit"
            circle
            @click="openView('/my/myplan/planlist')"
          ></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">{{'任务内容 ' + o }}</div>
      </el-card>
    </div> -->
    <div class="blockdiv2">
      <el-card class="box-card">
        <el-calendar v-model="calendarValue">
        </el-calendar>
      </el-card>
    </div>
  </div>
</template>
<style>
.blockdiv {
  height: 30%;
  width: 49%;
  margin: 2px;
  float: left;
}
.blockdiv2 {
  height: 70%;
  width: 49%;
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
