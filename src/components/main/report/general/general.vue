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
              <el-button type="primary" size="medium" @click="drawChart">查询</el-button>
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
        <el-col :span="24">
          <div id="offerDate" :style="{width: '600px', height: '400px', float: 'left'}">
            <el-row>
              <el-col :span="12">offer Billing：{{offerDateBilling}}</el-col>
            </el-row>
            <div id="offerDateChart" :style="{width: '100%', height: '400px'}"></div>
          </div>
          <div id="paymentDate" :style="{width: '600px', height: '400px', float: 'left'}">
            <el-row>
              <el-col :span="12">payment Billing：{{paymentDateBilling}}</el-col>
            </el-row>
            <div id="paymentDateChart" :style="{width: '100%', height: '400px'}"></div>
          </div>
          <div id="actualPaymentDate" :style="{width: '600px', height: '400px', float: 'left'}">
            <el-row>
              <el-col :span="12">已付 Billing：{{actualPaymentDateBilling}}</el-col>
            </el-row>
            <div id="actualPaymentDateChart" :style="{width: '100%', height: '400px'}"></div>
          </div>
          <div id="unactualPaymentDate" :style="{width: '600px', height: '400px', float: 'left'}">
            <el-row>
              <el-col :span="12">未付 Billing：{{unactualPaymentDateBilling}}</el-col>
            </el-row>
            <div id="unactualPaymentDateChart" :style="{width: '100%', height: '400px'}"></div>
          </div>
          <!-- <div id="personalRate" :style="{width: '1200px', height: '400px', float: 'left'}"></div>
          <div id="clientRate" :style="{width: '600px', height: '400px', float: 'left'}"></div>-->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script src="./general.js"></script>
