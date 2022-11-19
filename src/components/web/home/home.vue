<template>
  <div style="padding-top:100px;padding-left:100px;padding-right:100px;">
    <div style="float:left;width:50%;">
      <img :src="backgroundImage"
           width="100%"
           height="100%" /></div>
    <div style="float:left;width:50%;">
      <h1 style="font-size:35px;">HELLO APPLICANT &nbsp;&nbsp;&nbsp;&nbsp;海罗人才</h1>
      <p style="text-align:center;">
        <el-button type="primary"
                   round>加入我们</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary"
                   round>我要找工作</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary"
                   round>我要招聘</el-button>
      </p>
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  name: 'webHome',
  data () {
    return {
      backgroundImage: require('../../../assets/background-1.jpeg')
    }
  }
}
</script>
