<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>搜索候选人</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="primary"
                 size="small"
                 icon="el-icon-search"
                 @click="searchDialog = true">搜 索</el-button>
    </div>
    <el-table v-loading="table.loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="table.content"
              @current-change="handleCurrentChange"
              @row-dblclick="modifyCandidate"
              :border="true"
              :highlight-current-row="true"
              :stripe="true"
              style="width: 100%">
      <el-table-column type="index"
                       width="50"
                       label="序号"></el-table-column>
      <el-table-column prop="id"
                       label="候选人id"
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
      <el-table-column prop="age"
                       label="年龄"
                       width="60"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="companyName"
                       label="公司"
                       width="120"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="department"
                       label="部门"
                       width="120"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="title"
                       label="职位"
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
      <el-table-column prop="date"
                       label="日期"
                       width="80"
                       show-overflow-tooltip></el-table-column>
    </el-table>
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
              <el-form-item label="关键字"
                            label-width="80px">
                <el-input v-model="search.keyWords"
                          placeholder="请输入关键字，多个关键字直接可以用AND连接"
                          style="width:100%;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="年龄">
                <el-input v-model="search.ageMin"
                          placeholder="下限"
                          style="width:45%;"
                          clearable></el-input>
                <span>-</span>
                <el-input v-model="search.ageMax"
                          placeholder="上限"
                          style="width:45%;"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-select v-model="search.gender"
                           placeholder="请选择"
                           clearable
                           filterable
                           style="width:100%;">
                  <el-option v-for="gender in genders"
                             :key="gender.code"
                             :value="gender.code"
                             :label="gender.describe"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="院校级别">
                <el-checkbox-group v-model="search.schoolLevel">
                  <el-checkbox label="985">985</el-checkbox>
                  <el-checkbox label="211">211</el-checkbox>
                  <el-checkbox label="双一流">双一流</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="最远阶段">
                <el-radio-group v-model="search.farthestPhase">
                  <el-radio label="无">无</el-radio>
                  <el-radio label="CVO">CVO</el-radio>
                  <el-radio label="interview1">1st</el-radio>
                  <el-radio label="interview2">2nd</el-radio>
                  <el-radio label="interview3">3rd</el-radio>
                  <el-radio label="interview4">4th</el-radio>
                  <el-radio label="finalInterview">Final</el-radio>
                  <el-radio label="offerSigned">Offer Signed</el-radio>
                  <el-radio label="onBoard">On Board</el-radio>
                </el-radio-group>
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
                     @click="query">搜 索</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./searchcandidate.js"></script>
