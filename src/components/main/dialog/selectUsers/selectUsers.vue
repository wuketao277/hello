<template>
  <div>
    <el-row>
      <el-col :span="10"></el-col>
      <el-col :span="4">
        <el-button @click="select">选 中</el-button>
        <el-button @click="cancelSelect">取 消</el-button>
      </el-col>
      <el-col :span="10"></el-col>
    </el-row>
  </div>
</template>
<script src="./selectUsers.js">
</script>
