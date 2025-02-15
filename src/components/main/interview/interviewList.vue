<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>面试列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="primary"
                 size="small"
                 icon="el-icon-search"
                 @click="searchDialog = true">搜 索</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-download"
                 @click="downloadInterviews">下载面试</el-button>
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
                       width="80"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="interviewTimeStr"
                       label="面试时间"
                       width="150"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="username"
                       label="顾问"
                       width="100"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="inputTime"
                       label="创建时间"
                       width="160"
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
    <el-dialog title="搜索"
               :visible="searchDialog"
               :show-close="false"
               width="80%">
      <div>
        <el-form size="small"
                 label-position="left"
                 label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="客户">
                <el-select v-model="search.clientName"
                           style="width:100%;"
                           filterable
                           clearable>
                  <el-option v-for="client in clientList"
                             :key="client.chineseName"
                             :value="client.chineseName"
                             :label="client.chineseName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Title">
                <el-input v-model="search.title"
                          style="width:100%;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Login Name">
                <el-input v-model="search.loginName"
                          style="width:100%;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="日期">
                <el-date-picker type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="开始日期"
                                v-model="search.startDate"
                                size="small"
                                style="width:45%;"></el-date-picker>
                <span>-</span>
                <el-date-picker type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="结束日期"
                                v-model="search.endDate"
                                size="small"
                                style="width:45%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="阶段">
                <el-select v-model="search.phase"
                           filterable
                           placeholder="请选择"
                           width="100%"
                           clearable>
                  <el-option v-for="item in phaseOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="search.allInterview">所有面试</el-checkbox>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="warning"
                     @click="clearQueryCondition">清 空</el-button>
          <el-button @click="searchDialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="sureSearchDialog">查 询</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./interviewlist.js"></script>
