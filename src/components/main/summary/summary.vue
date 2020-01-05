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
            @click="openView('/my/mynews/newslist')"
          ></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
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
            @click="openView('/my/mytask/tasklist')"
          ></el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">{{'任务内容 ' + o }}</div>
      </el-card>
    </div>
    <div class="blockdiv">
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
    </div>
    <div class="blockdiv">
      <el-card class="box-card">
        <div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style>
.blockdiv {
  height: 50%;
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
