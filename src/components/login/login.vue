<template>
  <div>
    <div v-if="needLogin">
      <el-form
        ref="form"
        :model="loginUser"
        label-width="55px"
        style="width:420px;height:280px;padding-top:10px;padding-left:10px;padding-right:10px;position:absolute;left:50%;top:40%;margin-left:-210px;margin-top:-120px;border:2px solid #609EFF;border-radius:5px;"
      >
        <h1>欢迎使用Hello人才系统</h1>
        <el-form-item label="用户名">
          <el-input v-model="loginUser.loginName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginUser.password"></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" size="small" @click="login">登录</el-button>
          <el-button type="primary" size="small" @click="logincancel">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script src="./login.js">
</script>
