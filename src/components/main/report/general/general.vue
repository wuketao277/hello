<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>总报表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-form ref="form"
               :model="form">
        <el-form-item>
          <el-row>
            <el-col :span="24"
                    style="text-align:left;">
              <el-date-picker type="date"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              placeholder="开始日期"
                              v-model="form.startDate"></el-date-picker>
              <span>-</span>
              <el-date-picker type="date"
                              placeholder="结束日期"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              v-model="form.endDate"></el-date-picker>&nbsp;&nbsp;
              <el-button type="primary"
                         size="medium"
                         @click="drawChart">查询</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="calcDate('week')">本周</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="calcDate('lastmonth')">上月</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="calcDate('month')">本月</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="calcDate('nextmonth')">下月</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="calcDate('lastseason')">上季度</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="calcDate('season')">本季度</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="calcDate('nextseason')">下季度</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="calcDate('tonowyear')">今年到现在</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="calcDate('year')">本年</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="calcDate('tonow')">全部</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="changeChartSize('big')">大图</el-button>
              <el-button type="success"
                         plain
                         size="medium"
                         @click="changeChartSize('small')">小图</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align:left;">
      <el-row style="margin-bottom:30px;">
        <el-col :span="24">
          <div id="offerDate"
               :class="divClass">
            <el-row>
              <el-col :span="12">offer Billing Sum：{{offerDateBilling}}</el-col>
            </el-row>
            <div id="offerDateChart"
                 :class="chartClass"></div>
          </div>
          <div id="paymentDate"
               :class="divClass">
            <el-row>
              <el-col :span="12">payment Billing Sum：{{paymentDateBilling}}</el-col>
            </el-row>
            <div id="paymentDateChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:30px;">
        <el-col :span="24">
          <div id="actualPaymentDate"
               :class="divClass">
            <el-row>
              <el-col :span="12">已付 Billing Sum：{{actualPaymentDateBilling}}</el-col>
            </el-row>
            <div id="actualPaymentDateChart"
                 :class="chartClass"></div>
          </div>
          <div id="unactualPaymentDate"
               :class="divClass">
            <el-row>
              <el-col :span="12">未付 Billing Sum：{{unactualPaymentDateBilling}}</el-col>
            </el-row>
            <div id="unactualPaymentDateChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div id="personalOfferData"
               :class="divClass">
            <el-row>
              <el-col :span="12">Personal Offer Data</el-col>
            </el-row>
            <div id="personalOfferDataChart"
                 :class="chartClass"></div>
          </div>
          <div id="invoiceDateData"
               :class="divClass">
            <el-row>
              <el-col :span="12">Invoice Sum：{{invoiceDateBilling}}</el-col>
            </el-row>
            <div id="invoiceDateDataChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div id="personalReceiveData"
               :class="divClass">
            <el-row>
              <el-col :span="12">Personal Receive Data</el-col>
            </el-row>
            <div id="personalReceiveDataChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div id="recruiterBilling"
               :class="divClass">
            <el-row>
              <el-col :span="24">Recruiter Billing Data</el-col>
            </el-row>
            <div id="recruiterBillingChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script src="./general.js"></script>
<style>
.divBig {
  width: 98%;
  height: 600px;
  float: left;
}
.divSmall {
  width: 48%;
  height: 400px;
  float: left;
}
.chartBig {
  height: 600px;
}
.chartSmall {
  height: 400px;
}
</style>
