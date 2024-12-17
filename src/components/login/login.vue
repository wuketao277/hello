<template>
  <div class="container">
    <div class="background">
      <img :src="backgroundImage"
           width="100%"
           height="100%" />
    </div>
    <div v-if="needLogin"
         class="front">
      <el-form ref="form"
               :model="loginUser"
               label-width="0px"
               class="login-form">
        <h1>Hello System<span style="margin-top:0px;margin-bottom:10px;font-size:5px;">&nbsp;&nbsp;v{{version}}</span>
        </h1>

        <el-form-item style="margin-bottom:20px;">
          <el-input v-model="loginUser.loginName"
                    @keyup.enter.native="login"
                    placeholder="User Name"
                    style="width:380px;"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:20px;">
          <el-input type="password"
                    v-model="loginUser.password"
                    @keyup.enter.native="login"
                    placeholder="Password"
                    style="width:380px;"></el-input>
        </el-form-item>
        <div>
          <el-button type="primary"
                     size="big"
                     @click="login"
                     style="width:200px;">Log&nbsp;in</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script src="./login.js">
</script>
<style>
.container {
  position: relative;
  height: 100vh; /* 使容器占满整个视口高度 */
}

.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

.front {
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-form {
  width: 420px;
  height: 280px;
  border: 2px solid #609eff;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
