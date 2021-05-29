<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>候选人列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar">
      <el-button type="success" size="small" icon="el-icon-circle-plus" @click="addCandidate">新增</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="modifyCandidate">修改</el-button>
      <el-button type="primary" size="small" icon="el-icon-share" @click="detailCandidate">查看</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh-left" @click="query(true)">刷新</el-button>
      <el-form @submit.native.prevent style="display:inline-block;width:250px;">
        <el-form-item label="" style="margin-bottom:0px;">
          <el-input v-model="search" autocomplete="off" @keyup.enter.native="sureSearchDialog" placeholder="输入关键字后，回车即可搜索。"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        action="http://localhost:8080/candidate/uploadFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :accept="xlsx"
        multiple
        :limit="3"
        :file-list="fileList"
        :on-success="uploadFileSuccess"
        style="display:inline;"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-form
      v-if="search.show"
      style="border:1px solid black;"
      ref="form"
      :model="search"
      label-width="80px"
    >
      <el-form-item label="中文名称">
        <el-input v-model="search.chinesename"></el-input>
      </el-form-item>
      <el-form-item label="英文名称">
        <el-input v-model="search.englishname"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="table.content"
      @current-change="handleCurrentChange"
      :border="true"
      :highlight-current-row="true"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="id" label="候选人id" width="80"></el-table-column>
      <el-table-column prop="chineseName" label="中文名称" width="80"></el-table-column>
      <el-table-column prop="englishName" label="英文名称" width="80"></el-table-column>
      <el-table-column prop="phoneNo" label="手机" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
      <el-table-column prop="birthDay" label="生日" width="60"></el-table-column>
      <el-table-column prop="age" label="年龄" width="60"></el-table-column>
      <el-table-column prop="companyName" label="公司" width="120"></el-table-column>
      <el-table-column prop="department" label="部门" width="120"></el-table-column>
      <el-table-column prop="title" label="职位" width="120"></el-table-column>
      <el-table-column prop="schoolName" label="学校"></el-table-column>
      <el-table-column prop="currentAddress" label="现地址"></el-table-column>
      <el-table-column prop="futureAddress" label="期望地址"></el-table-column>
      <el-table-column prop="currentMoney" label="现薪资"></el-table-column>
      <el-table-column prop="futureMoney" label="期望薪资"></el-table-column>
      <el-table-column prop="date" label="日期" width="80"></el-table-column>
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
<script src="./candidatelist.js"></script>
