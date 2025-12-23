<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>PRC列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-plus"
                 @click="addPRC">新 增</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-edit"
                 @click="modifyPRC">修 改</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-share"
                 @click="detailPRC">查 看</el-button>
      <el-button type="danger"
                 size="small"
                 icon="el-icon-delete"
                 @click="deleteById">删 除</el-button>
      <el-form @submit.native.prevent
               style="display:inline-block;width:250px;">
        <el-form-item label
                      style="margin-bottom:0px;">
          <el-input v-model="search"
                    autocomplete="off"
                    @keyup.enter.native="query"
                    @clear="query"
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
              @current-change="handleCurrentChange"
              @row-dblclick="modifyPRC"
              :border="true"
              :highlight-current-row="true"
              :stripe="true"
              style="width: 100%">
      <el-table-column type="index"
                       width="50"
                       label="序号"></el-table-column>
      <el-table-column prop="id"
                       label="id"
                       width="80"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="chineseName"
                       label="中文名称"
                       width="80"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="phoneNo"
                       label="手机"
                       width="120"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       width="120"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="birthDay"
                       label="生日"
                       width="100"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="companyName"
                       label="公司"
                       width="120"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="schoolName"
                       label="学校"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="currentAddress"
                       label="现地址"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="futureAddress"
                       label="期望地址"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="currentMoney"
                       label="现薪资"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="futureMoney"
                       label="期望薪资"
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
<script src="./prclist.js"></script>
