<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-plus"
                 @click="addTask">新 增</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-edit"
                 @click="modifyTask">修 改</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-share"
                 @click="detailTask">查 看</el-button>
      <!-- <el-form @submit.native.prevent
               style="display:inline-block;width:250px;">
        <el-form-item label
                      style="mergin-bottom:0px;">
          <el-input v-model="search"
                    autocomplete="off"
                    @keyup.enter.native="sureSearchDialog"
                    @clear="sureSearchDialog"
                    clearable
                    placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form> -->
      <el-button type="primary"
                 size="small"
                 icon="el-icon-search"
                 v-if="showSearchResult"
                 @click="query()">取消搜索</el-button>
    </div>
    <el-table :data="table.content"
              @current-change="handleCurrentChange"
              @row-dblclick="modifyTask"
              :cell-class-name="setCellClassName">
      :border="true"
      :highlight-current-row="true"
      :stripe="true"
      style="width: 100%">
      <el-table-column type="index"
                       label="序号"
                       width="50"></el-table-column>
      <el-table-column prop="executeUserName"
                       label="执行人"
                       width="100"></el-table-column>
      <el-table-column label="候选人"
                       width="80"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text"
                     @click="editCandidate(scope.$index, scope.row.relativeCandidateId)">{{scope.row.relativeCandidateChineseName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="taskTitle"
                       label="任务标题"
                       width="200"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="taskContent"
                       label="任务内容"
                       width="360"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="executeDate"
                       label="执行日期"
                       width="100"></el-table-column>
      <el-table-column prop="finished"
                       :formatter="getFinishedName"
                       label="状态"
                       width="100"></el-table-column>
      <el-table-column prop="createUserName"
                       label="创建人"
                       width="180"></el-table-column>
      <el-table-column prop="createDateTime"
                       label="创建时间"
                       width="180"></el-table-column>
      <el-table-column prop="relativeCandidateId"
                       label="候选人id"
                       width="80"></el-table-column>
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
        <el-form label-position="left"
                 size="small"
                 style="text-align:left;"
                 label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="执行人">
                <el-input v-model="search.executeUserName"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="完成状态">
                <el-radio-group v-model="search.finished">
                  <el-radio label="NONE">非</el-radio>
                  <el-radio label="FINISHED">已完成</el-radio>
                  <el-radio label="UNFINISHED">未完成</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="任务标题">
                <el-input v-model="search.taskTitle"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务内容">
                <el-input v-model="search.taskContent"
                          clearable></el-input>
              </el-form-item>
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
<script src="./mytasklist.js"></script>
<style>
.el-form-item {
  margin-bottom: 0px;
  margin-top: 0px;
}
.cellGreen {
  color: green;
}
.cellRed {
  color: red;
}
</style>
