<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>培训列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modify">评 分</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detail">查 看</el-button>
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item label style="margin-bottom:0px;">
          <el-input
            v-model="search"
            autocomplete="off"
            @keyup.enter.native="query"
            placeholder="输入关键字后，回车即可搜索。"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table
        :data="table.content"
        :border="true"
        :highlight-current-row="true"
        :stripe="true"
        :row-class-name="rowStyle"
        style="width: 100%"
        @current-change="rowChange"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="lessonName" label="课程名称" width="300"></el-table-column>
        <el-table-column prop="realname" width="100" label="学员名称"></el-table-column>
        <el-table-column prop="signInTime" width="200" label="签到时间"></el-table-column>
        <el-table-column prop="finishTime" width="200" label="完成时间"></el-table-column>
        <el-table-column prop="hours" width="200" label="学习时长（小时）"></el-table-column>
        <el-table-column prop="score" width="200" label="课程得分"></el-table-column>
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
    </template>
  </div>
</template>
<script src="./studyrecordlist.js"></script>
