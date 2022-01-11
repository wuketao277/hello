<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>总报表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="text-align:left;">
      <el-row>
        <el-col :span="12">
          Yearly GP：{{yearlyGP}}
          <el-tabs v-model="tabsChoice4YTGP">
            <el-tab-pane label="Personal Rate" name="1">
              <div id="yearlyGPPersonalRate" :style="{width: '600px', height: '600px'}"></div>
            </el-tab-pane>
            <el-tab-pane label="Client Rate" name="2">
              <div id="yearlyGPClientRate" :style="{width: '600px', height: '600px'}"></div>
            </el-tab-pane>
            <el-tab-pane label="Monthly Rate" name="3">
              <div id="yearlyGPMonthlyRate" :style="{width: '600px', height: '600px'}"></div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12">
          Yearly Billing：{{yearlyBilling}}
          <el-tabs v-model="tabsChoice4YTB">
            <el-tab-pane label="Personal Rate" name="1">
              <div id="yearlyBillingPersonalRate" :style="{width: '600px', height: '600px'}"></div>
            </el-tab-pane>
            <el-tab-pane label="Client Rate" name="2">
              <div id="yearlyBillingClientRate" :style="{width: '600px', height: '600px'}"></div>
            </el-tab-pane>
            <el-tab-pane label="Monthly Rate" name="3">
              <div id="yearlyBillingMonthlyRate" :style="{width: '600px', height: '600px'}"></div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          Monthly GP：{{monthlyGP}}
          <el-tabs v-model="tabsChoice4MGP">
            <el-tab-pane label="Personal Rate" name="1">
              <div id="monthlyGPPersonalRate" :style="{width: '600px', height: '600px'}"></div>
            </el-tab-pane>
            <el-tab-pane label="Client Rate" name="2">
              <div id="monthlyGPClientRate" :style="{width: '600px', height: '600px'}"></div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12">
          Monthly Billing：{{monthlyBilling}}
          <el-tabs v-model="tabsChoice4MB">
            <el-tab-pane label="Personal Rate" name="1">
              <div id="monthlyBillingPersonalRate" :style="{width: '600px', height: '600px'}"></div>
            </el-tab-pane>
            <el-tab-pane label="Client Rate" name="2">
              <div id="monthlyBillingClientRate" :style="{width: '600px', height: '600px'}"></div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script src="./general.js"></script>
