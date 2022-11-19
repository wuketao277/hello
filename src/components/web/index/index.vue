<template>
  <el-container style="height:100%;min-width:1400px;padding:10px;">
    <el-header style="height:60px;padding:0px;text-align:left;font-size:25px;color:#fff;">
      <div style="float:left;height:100%;text-align:left;padding-left:10px;padding-top:5px;">
        <img src="/static/white-logo.png"
             style="width:120px;height:60px;">
      </div>
      <div style="float:left;height:100%;text-align:left;padding-left:10px;padding-top:5px;">
        <el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 active-text-color="#ffd04b"
                 style="background-color:transparent;border-bottom:solid 1px transparent;"
                 :router="true">
          <el-menu-item index="/"
                        style="width:200px;text-align:center;font-size:20px;color:white;">首页</el-menu-item>
          <el-menu-item index="/us"
                        style="width:200px;text-align:center;font-size:20px;color:white;">关于我们</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer style="height:100px;padding-top:5px;">
      <p>
        <el-link type="success"
                 target="_blank"
                 style="color:white;width:200px;text-align:center;">隐私政策</el-link>
        <el-link type="success"
                 target="_blank"
                 style="color:white;width:200px;text-align:center;">公司资质/商业执照</el-link>
        <el-link type="success"
                 target="_blank"
                 style="color:white;width:200px;text-align:center;">除名查询</el-link>
        <el-link type="success"
                 target="_blank"
                 href="https://beian.miit.gov.cn"
                 class="fontstype"
                 style="color:white;width:200px;text-align:center;">备案号</el-link>
      </p>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  name: 'webIndex',
  data () {
    return {
      activeIndex: '/'
    }
  }
}
</script>
<style>
</style>
