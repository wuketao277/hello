<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
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
                              size="small"
                              style="width:130px;"
                              v-model="form.startDate"></el-date-picker>
              <span>-</span>
              <el-date-picker type="date"
                              placeholder="结束日期"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              size="small"
                              style="width:130px;"
                              v-model="form.endDate"></el-date-picker>&nbsp;&nbsp;
              <el-button type="primary"
                         plain
                         size="small"
                         @click="drawChart">查询</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="calcDate('week')">本周</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="calcDate('lastmonth')">上月</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="calcDate('month')">本月</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="calcDate('nextmonth')">下月</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="calcDate('lastseason')">上季度</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="calcDate('season')">本季度</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="calcDate('nextseason')">下季度</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="calcDate('tonowyear')">今年到现在</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="calcDate('year')">本年</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="calcDate('tonow')">全部</el-button>
              <br/>
              <!-- <el-button type="primary"
                         plain
                         size="small"
                         @click="changeChartSize('big')">大图</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="changeChartSize('small')">小图</el-button> -->

              <el-button type="primary"
                         plain
                         size="small"
                         @click="forwardWeek(1)">向前一周</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="backwardWeek(1)">向后一周</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="forwardMonth(1)">向前一个月</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="backwardMonth(1)">向后一个月</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="forwardYear(1)">向前一个年</el-button>
              <el-button type="primary"
                         plain
                         size="small"
                         @click="backwardYear(1)">向后一个年</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align:left;">
      <el-row style="margin-bottom:60px;">
        <el-col :span="24">
          <div id="offerDate"
               :class="divClass">
            <el-row>
              <el-col :span="12">offer Billing 总和：{{offerDateBilling}}</el-col>
            </el-row>
            <div id="offerDateChart"
                 :class="chartClass"></div>
          </div>
          <div id="paymentDate"
               :class="divClass">
            <el-row>
              <el-col :span="12">payment Billing 总和：{{paymentDateBilling}}</el-col>
            </el-row>
            <div id="paymentDateChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:60px;">
        <el-col :span="24">
          <div id="actualPaymentDate"
               :class="divClass">
            <el-row>
              <el-col :span="12">已付 Billing 总和：{{actualPaymentDateBilling}}</el-col>
            </el-row>
            <div id="actualPaymentDateChart"
                 :class="chartClass"></div>
          </div>
          <div id="unactualPaymentDate"
               :class="divClass">
            <el-row>
              <el-col :span="12">未付 Billing 总和：{{unactualPaymentDateBilling}}</el-col>
            </el-row>
            <div id="unactualPaymentDateChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:60px;">
        <el-col :span="24">
          <div id="personalOfferData"
               :class="divClass">
            <el-row>
              <el-col :span="12">个人 Offer GP 总和</el-col>
            </el-row>
            <div id="personalOfferDataChart"
                 :class="chartClass"></div>
          </div>
          <div id="invoiceDateData"
               :class="divClass">
            <el-row>
              <el-col :span="12">开票总和：{{invoiceDateBilling}}</el-col>
            </el-row>
            <div id="invoiceDateDataChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:60px;">
        <el-col :span="24">
          <div id="personalReceiveData"
               :class="divClass">
            <el-row>
              <el-col :span="12">个人到账 GP 总和</el-col>
            </el-row>
            <div id="personalReceiveDataChart"
                 :class="chartClass"></div>
          </div>
          <div id="recruiterOfferBillingData"
               :class="divClass">
            <span>Recruiter Offer Billing 总和</span>
            <div id="recruiterOfferBillingDataChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:60px;">
        <el-col :span="24">
          <div id="recruiterMonthlyOfferBilling"
               :class="divClass">
            <span>Recruiter 月均 Offer Billing</span>
            <div id="recruiterMonthlyOfferBillingChart"
                 :class="chartClass"></div>
          </div>
          <div id="avgOfferData"
               :class="divClass">
            <el-row>
              <el-col :span="12">个人月均 Offer GP</el-col>
            </el-row>
            <div id="avgOfferDataChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:60px;">
        <el-col :span="24">
          <div id="teamOfferGPData"
               :class="divClass">
            <el-row>
              <el-col :span="12">Team Offer GP 总和</el-col>
            </el-row>
            <div id="teamOfferGPDataChart"
                 :class="chartClass"></div>
          </div>
          <div id="teamMonthlyOfferGPData"
               :class="divClass">
            <el-row>
              <el-col :span="12">Team 月均 Offer GP</el-col>
            </el-row>
            <div id="teamMonthlyOfferGPDataChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
       <el-row style="margin-bottom:60px;">
        <el-col :span="24">
          <div id="groupingByClientOfferData">
            <el-row>
              <el-col :span="24">按客户offer分组数据</el-col>
            </el-row>
            <div id="groupingByClientOfferDataChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:60px;">
        <el-col :span="24">
          <div id="groupingByClientReceiveData">
            <el-row>
              <el-col :span="24">按客户到账分组数据</el-col>
            </el-row>
            <div id="groupingByClientReceiveDataChart"
                 :class="chartClass"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:60px;">
        <el-col :span="24">
          <div id="futureReceiveBillingData"
               :class="divClass">
            <el-row>
              <el-col :span="12">未来到账数据</el-col>
            </el-row>
            <div id="futureReceiveBillingDataChart"
                 :class="chartClass"></div>
          </div><div id="futureReceiveBillingData2"
               :class="divClass">
            <el-row>
              <el-col :span="12">未来到账数据（不含一汽）</el-col>
            </el-row>
            <div id="futureReceiveBillingDataChart2"
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
