<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:8080/uploadFile/uploadFile"
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
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script src="./uploadFile.js"></script>
