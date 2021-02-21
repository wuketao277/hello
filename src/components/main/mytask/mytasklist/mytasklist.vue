<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="addTask">新增</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detailTask">查看</el-button>
      <!-- <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteTask">删除</el-button> -->
      <el-button type="primary" size="small" icon="el-icon-search" @click="switchSearchDialog">搜索</el-button>
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
    <!--搜索对话框-->
    <el-dialog title="搜索" :visible.sync="showSearchDialog">
      <el-form @submit.native.prevent>
        <el-form-item label="搜索内容">
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="sureSearchDialog"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSearchDialog">取 消</el-button>
        <el-button type="primary" @click="sureSearchDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./mytasklist.js"></script>
