<template>
  <div>
    <span>是否包含敏感信息：</span>
    <template>
      <el-radio v-model="uploadFileData.hasSensitiveInfomation" label="Y">是</el-radio>
      <el-radio v-model="uploadFileData.hasSensitiveInfomation" label="N">否</el-radio>
    </template>
    <p/>
    <el-upload
      class="upload-demo"
      action="http://www.helloapplicant.com/uploadFile/uploadFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :data="uploadFileData"
      :file-list="fileList"
      :on-success="uploadFileSuccess"
      style="display:inline;"
    >
      <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script src="./uploadFile.js"></script>
