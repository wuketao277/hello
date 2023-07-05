<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>面试列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-form @submit.native.prevent
               style="display:inline-block;width:250px;">
        <el-form-item label
                      style="margin-bottom:0px;">
          <el-input v-model="search"
                    autocomplete="off"
                    @keyup.enter.native="query"
                    placeholder="输入关键字后，回车即可搜索。"
                    clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="table.loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="table.content"
              :border="true"
              :highlight-current-row="true"
              :stripe="true"
              style="width: 100%">
      <el-table-column type="index"
                       width="50"
                       label="序号"></el-table-column>
      <el-table-column prop="clientName"
                       label="公司名称"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text"
                     @click="editClient(scope.$index, scope.row)">{{scope.row.clientName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="caseTitle"
                       label="岗位名称"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text"
                     @click="editCase(scope.$index, scope.row)">{{scope.row.caseTitle}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="candidateName"
                       label="候选人"
                       width="80"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text"
                     @click="editCandidate(scope.$index, scope.row)">{{scope.row.candidateName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="phase"
                       label="面试阶段"
                       width="120"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="interviewTimeStr"
                       label="面试时间"
                       width="150"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="username"
                       label="顾问"
                       width="100"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="content"
                       label="备注"
                       show-overflow-tooltip></el-table-column>
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
  </div>
</template>
<script src="./interviewlist.js"></script>
