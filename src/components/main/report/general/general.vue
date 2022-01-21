<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>总报表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-row>
            <el-col :span="24" style="text-align:left;">
              <el-date-picker type="date" placeholder="开始日期" v-model="form.startDate"></el-date-picker>
              <span>-</span>
              <el-date-picker type="date" placeholder="结束日期" v-model="form.endDate"></el-date-picker>&nbsp;&nbsp;
              <el-button type="primary" size="medium">查询</el-button>
              <el-button type="success" plain size="medium" @click="calcDate('week')">本周</el-button>
              <el-button type="success" plain size="medium" @click="calcDate('month')">本月</el-button>
              <el-button type="success" plain size="medium" @click="calcDate('season')">本季度</el-button>
              <el-button type="success" plain size="medium" @click="calcDate('year')">本年</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align:left;">
      <el-row>
        <el-col :span="4">GP：{{GP}}</el-col>
        <el-col :span="4">Billing：{{Billing}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div id="personalRate" :style="{width: '1200px', height: '400px', float: 'left'}"></div>
          <div id="clientRate" :style="{width: '600px', height: '400px', float: 'left'}"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script src="./general.js"></script>
