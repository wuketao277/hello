<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>KPI历史记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-form @submit.native.prevent
               style="display:inline-block;width:250px;">
        <el-form-item style="margin-bottom:0px;">
          <el-input v-model="search"
                    autocomplete="off"
                    @keyup.enter.native="query"
                    placeholder="可通过登录名、姓名、月份来查询"
                    clearable
                    style="width:260px;"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table :data="table.content"
                :border="true"
                :highlight-current-row="true"
                :stripe="true"
                style="width: 100%">
        <el-table-column type="index"
                         width="50"
                         label="序号"
                         fixed></el-table-column>
        <el-table-column prop="month"
                         width="90"
                         label="月份"
                         fixed></el-table-column>
        <el-table-column prop="userName"
                         label="姓名"
                         width="120px"
                         fixed></el-table-column>
        <el-table-column prop="finishRate"
                         label="总达成率"
                         width="90px"
                         fixed></el-table-column>
        <el-table-column prop="finishRateTICF"
                         label="TI+CF达成率"
                         width="110px"
                         fixed></el-table-column>
        <el-table-column prop="finishRateVIIOI"
                         label="VI+IOI达成率"
                         width="110px"
                         fixed></el-table-column>
        <el-table-column prop="finishRateCVO"
                         label="CVO达成率"
                         width="110px"
                         fixed></el-table-column>
        <el-table-column prop="finishRateInterview"
                         label="面试达成率"
                         width="110px"
                         fixed></el-table-column>
        <el-table-column prop="cvo"
                         label="CVO"
                         width="60px"></el-table-column>
        <el-table-column prop="interview1st"
                         label="1st"
                         width="60px"></el-table-column>
        <el-table-column prop="interview2nd"
                         label="2nd"
                         width="60px"></el-table-column>
        <el-table-column prop="interview3rd"
                         label="3rd"
                         width="60px"></el-table-column>
        <el-table-column prop="interview4th"
                         label="4th"
                         width="60px"></el-table-column>
        <el-table-column prop="interview5th"
                         label="5th"
                         width="60px"></el-table-column>
        <el-table-column prop="interviewFinal"
                         label="final"
                         width="60px"></el-table-column>
        <el-table-column prop="viioi"
                         label="VI+IOI"></el-table-column>
        <el-table-column prop="vi"
                         label="VI"
                         width="60px"></el-table-column>
        <el-table-column prop="ioi"
                         label="IOI"
                         width="60px"></el-table-column>
        <el-table-column prop="ticf"
                         label="TI+CF"></el-table-column>
        <el-table-column prop="ti"
                         label="TI"
                         width="60px"></el-table-column>
        <el-table-column prop="workDays"
                         label="工作天数"
                         width="80px"></el-table-column>
        <el-table-column prop="checkKPI"
                         label="是否考核"
                         :formatter="formatBoolean"
                         width="80px"></el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next, sizes"
                     :total="table.totalElements"
                     :current-page="table.pageable.pageNumber"
                     :page-sizes="page.pageSizes"
                     :page-size="table.pageable.pageSize"
                     @size-change="sizeChange"
                     @current-change="currentChange"
                     @prev-click="prevClick"
                     @next-click="nextClick"></el-pagination>
    </template>
  </div>
</template>
<script src="./kpiList.js"></script>
