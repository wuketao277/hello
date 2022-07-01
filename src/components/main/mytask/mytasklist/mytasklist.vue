<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="addTask">新 增</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detailTask">查 看</el-button>
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item label="" style="mergin-bottom:0px;">
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="sureSearchDialog" placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" icon="el-icon-search" v-if="showSearchResult" @click="query()">取消搜索</el-button>
    </div>
    <el-table
      :data="table.content"
      @current-change="handleCurrentChange"
      :border="true"
      :highlight-current-row="true"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column prop="taskTitle" label="任务的标题" width="200"></el-table-column>
      <el-table-column prop="taskContent" label="任务内容" width="360"></el-table-column>
      <el-table-column prop="executeRealName" label="执行人" width="80"></el-table-column>
      <el-table-column prop="executeDate" label="执行日期" width="100"></el-table-column>
      <el-table-column prop="finished" :formatter="getFinishedName" label="状态" width="100"></el-table-column>
      <el-table-column prop="createRealName" label="创建人" width="80"></el-table-column>
      <el-table-column prop="createDateTime" label="创建时间"></el-table-column>
      <el-table-column prop="relativeCandidateId" label="候选人id" width="80"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="table.totalElements"
      :current-page="table.pageable.pageNumber"
      :page-sizes="page.pageSizes"
      :page-size="table.pageable.pageSize"
      @size-change="sizeChange"
      @current-change="currentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    ></el-pagination>
  </div>
</template>
<script src="./mytasklist.js"></script>
<style>
.el-form-item {
  margin-bottom: 0px;
  margin-top: 0px;
}
</style>
