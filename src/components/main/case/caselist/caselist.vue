<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/background.html' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>职位列表</el-breadcrumb-item>
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
      <el-button type="danger"
                 size="small"
                 icon="el-icon-delete"
                 @click="deleteById"
                 v-if="showControl('delete')">删 除</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-search"
                 @click="searchDialog = true">高级搜索</el-button>
      <el-form @submit.native.prevent
               style="display:inline-block;width:250px;">
        <el-form-item label
                      style="margin-bottom:0px;">
          <el-input v-model="search.title"
                    autocomplete="off"
                    @keyup.enter.native="easyQuery"
                    @clear="easyQuery"
                    placeholder="输入关键字后，回车即可搜索。"
                    clearable></el-input>
        </el-form-item>
      </el-form>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-scissors"
                 v-if="showControl('clearExperienceButton')"
                 @click="clearExperience">清空体验岗位</el-button>
    </div>
    <template>
      <el-table :data="table.content"
                :border="true"
                :highlight-current-row="true"
                :stripe="true"
                style="width: 100%"
                @current-change="rowChange"
                @row-dblclick="modify">
        <el-table-column type="index"
                         width="50"
                         label="序号"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="id"
                         width="100"
                         label="职位id"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="clientChineseName"
                         width="250"
                         label="客户名称"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="title"
                         width="400"
                         label="职位名称"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="status"
                         width="100"
                         :formatter="this.getStatusName"
                         label="状态"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="description"
                         label="描述"
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
    </template>
    <el-dialog title="搜索"
               :visible="searchDialog"
               :show-close="false"
               width="80%">
      <div>
        <el-form size="small"
                 label-position="left"
                 label-width="80px"
                 style="text-align:left;">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Client">
                <el-select v-model="search.clientId"
                           placeholder="请选择客户"
                           style="width:100%;"
                           filterable
                           clearable>
                  <el-option v-for="client in clients"
                             :key="client.id"
                             :value="client.id"
                             :label="client.chineseName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Status">
                <el-radio-group v-model="search.status">
                  <el-radio label="PREPARE">准备</el-radio>
                  <el-radio label="DOING">进行中</el-radio>
                  <el-radio label="FINISH">完成</el-radio>
                  <el-radio label="PAUSE">暂停</el-radio>
                  <el-radio label="CLOSE">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="title">
                <el-input v-model="search.title"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="HR">
                <el-select v-model="search.hrId"
                           placeholder="请选择hr"
                           filterable
                           clearable>
                  <el-option v-for="hr in hrs"
                             :key="hr.id"
                             :value="hr.id"
                             :label="hr.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12"
                  v-if="false">
            <el-col>
              <el-form-item label="可见性">
                <el-checkbox-group v-model="search.show4JobType">
                  <el-checkbox v-for="jobType in this.jobTypeList"
                               :label="jobType.code"
                               :key="jobType.code">{{jobType.name}}</el-checkbox>
                </el-checkbox-group>
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
<script src="./caselist.js"></script>
