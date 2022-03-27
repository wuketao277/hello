<template>
  <div>
    <div class="background">
      <img :src="backgroundImage" width="100%" height="100%"/>
    </div>
    <div v-if="needLogin" class="front">
      <el-form
        ref="form"
        :model="loginUser"
        label-width="0px"
        style="width:420px;height:280px;position:absolute;left:500px;top:150px;border:2px solid #609EFF;border-radius:10px;background-color:rgba(255,255,255,0.5);"
      >
        <h1>Hello System</h1>
        <el-form-item style="margin-bottom:20px;">
          <el-input
            v-model="loginUser.loginName"
            @keyup.enter.native="login"
            placeholder="User Name"
            style="width:380px;"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:20px;">
          <el-input
            type="password"
            v-model="loginUser.password"
            @keyup.enter.native="login"
            placeholder="Password"
            style="width:380px;"
          ></el-input>
        </el-form-item>
        <div>
          <el-button
            type="primary"
            size="big"
            @click="login"
            style="width:200px;"
          >Log&nbsp;in</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script src="./login.js">
</script>
<style>
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}
.front {
  z-index: 1;
  position: absolute;
}
</style>
