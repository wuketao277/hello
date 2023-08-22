<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>请假列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-plus"
                 @click="add">新 增</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-edit"
                 @click="modify">修 改</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-share"
                 @click="detail">查 看</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-s-check"
                 @click="approveSelection"
                 v-if="showControl('approveButton')">审批通过</el-button>
      <el-form @submit.native.prevent
               style="display:inline-block;width:250px;">
        <el-form-item label
                      style="margin-bottom:0px;">
          <el-input v-model="search"
                    autocomplete="off"
                    @keyup.enter.native="sureSearchDialog"
                    placeholder="输入关键字后，回车即可搜索。"
                    clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="table.content"
              @current-change="handleCurrentChange"
              @row-dblclick="modify"
              @selection-change="handleSelectionChange"
              :border="true"
              :highlight-current-row="true"
              :stripe="true"
              style="width: 100%">
      <el-table-column type="index"
                       width="50"
                       label="序号"></el-table-column>
      <el-table-column type="selection"
                       width="50"
                       v-if="showControl('selectionColumn')"></el-table-column>
      <el-table-column prop="userName"
                       label="登录名"
                       width="100"></el-table-column>
      <el-table-column prop="userRealName"
                       label="用户姓名"
                       width="100"></el-table-column>
      <el-table-column prop="holidayDate"
                       label="请假日期"
                       :formatter="formatDate"
                       width="100"></el-table-column>
      <el-table-column prop="holidayLong"
                       label="请假时长"
                       width="100"></el-table-column>
      <el-table-column prop="approveStatus"
                       label="审批状态"
                       width="100"></el-table-column>
      <el-table-column prop="approveUserName"
                       label="审批人"
                       width="100"></el-table-column>
      <el-table-column prop="remark"
                       label="备注"></el-table-column>
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
<script src="./holidaylist.js"></script>
