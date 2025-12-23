<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-bottom:20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/background.html/prc/prclist' }">PRC列表</el-breadcrumb-item>
      <el-breadcrumb-item>PRC</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具栏，只有模式为新增或修改时才显示-->
    <div class="toolbar"
         v-show="(mode === 'add' || mode === 'modify')">
      <el-button type="success"
                 size="small"
                 icon="el-icon-circle-check"
                 @click="save">保 存</el-button>
      <el-button type="warning"
                 size="small"
                 icon="el-icon-circle-close"
                 @click="cancel">取 消</el-button>
      <el-button type="danger"
                 size="small"
                 icon="el-icon-delete"
                 @click="deleteById">删 除</el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-upload"
                 @click="openUploadFileDialog">上传文件</el-button>
      <!-- <el-switch v-model="attention"
                 inactive-text="不关注"
                 active-text="关注"
                 active-color="#13ce66"
                 @change="updateCandidateAttention"></el-switch> -->
    </div>
    <el-form ref="form"
             label-position="left"
             size="small"
             :model="form"
             label-width="100px"
             style="text-align:left;"
             :rules="rules">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="PRC id">
            <span>{{form.id}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="中文名"
                        prop="chineseName">
            <el-input v-model="form.chineseName"
                      maxlength="50"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英文名"
                        prop="englishName">
            <el-input v-model="form.englishName"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="生日"
                        prop="birthDay">
            <el-input v-model="form.birthDay"
                      placeholder="例如：1999-01-01"
                      style="width:100%"
                      @input="birthdayChange"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="星座">
            <el-select v-model="form.constellation"
                       placeholder="请选择"
                       clearable
                       filterable
                       style="width:100%;">
              <el-option v-for="constellation in constellations"
                         :key="constellation.code"
                         :value="constellation.code"
                         :label="constellation.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-select v-model="form.gender"
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
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="手机号"
                        prop="phoneNo">
            <el-input v-model="form.phoneNo"
                      maxlength="20"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱"
                        prop="email">
            <el-input v-model="form.email"
                      maxlength="200"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英文水平"
                        prop="englishLevel">
            <el-input v-model="form.englishLevel"
                      maxlength="200"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="户籍地址"
                        prop="hometown">
            <el-input v-model="form.hometown"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现地址"
                        prop="currentAddress">
            <el-input v-model="form.currentAddress"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="期望地址"
                        prop="futureAddress">
            <el-input v-model="form.futureAddress"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="家庭情况"
                        prop="family">
            <el-input v-model="form.family"
                      maxlength="200"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item label="公司"
                        prop="companyName">
            <el-input v-model="form.companyName"
                      maxlength="200"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职位"
                        prop="title">
            <el-input v-model="form.title"
                      maxlength="200"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现薪资"
                        prop="currentMoney">
            <el-input v-model="form.currentMoney"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="期望薪资"
                        prop="futureMoney">
            <el-input v-model="form.futureMoney"
                      maxlength="100"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="学校"
                        prop="schoolName">
            <el-input v-model="form.schoolName"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="备注"
                        prop="remark">
            <el-input v-model="form.remark"
                      type="textarea"
                      :rows="3"
                      :autosize="{ minRows: 2, maxRows: 100}"
                      maxlength="2000"
                      show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
     <el-tabs type="border-card">
      <!--职位列表开始-->
      <el-tab-pane label="评论">
        <el-form ref="newComment"
                 label-position="left"
                 size="small"
                 :model="form"
                 label-width="80px"
                 style="text-align:left;">
          <el-row :gutter="20">
            <el-col :span="3">
              <el-button type="success"
                         size="small"
                         icon="el-icon-chat-dot-round"
                         @click="saveComment">保存评论</el-button>
            </el-col>
            <el-col :span="21">
              <el-form-item label="评论内容"
                            prop="content">
                <el-input type="textarea"
                          v-model="newComment.content"
                          :autosize="{ minRows: 1, maxRows: 30}"></el-input>
                          <br/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--评论开始-->
        <el-table :data="comments"
                  :border="true"
                  :highlight-current-row="true"
                  :stripe="true"
                  style="width: 100%">
          <el-table-column prop="username"
                           label="评论人"
                           width="100"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="inputTime"
                           label="评论时间"
                           width="160"
                           show-overflow-tooltip></el-table-column>
          <el-table-column prop="content"
                           label="评论内容"></el-table-column>
        </el-table>
        <!--评论结束-->
      </el-tab-pane>
    </el-tabs>
    <!--上传文件对话框-->
    <el-dialog title="上传文件"
               :visible.sync="showUploadFileDialog">
      <uploadFile :uploadFileData="uploadFileData"
                  v-on:upload_file_success="queryUploadFiles"></uploadFile>
    </el-dialog>
  </div>
</template>
<script src="./prc.js"></script>
