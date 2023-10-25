<template>
  <div style="margin-left:100px;margin-top:100px;margin-right:100px;">
    <div style="overflow:auto;height:90%;">
      <div style="float:left;width:50%;">
        <img :src="backgroundImage"
             width="100%"
             height="100%" /></div>
      <div style="float:left;width:50%;">
        <p style="font-size:35px;margin-bottom:0px;"><b>HELLO APPLICANT GROUP</b></p>
        <p style="font-size:75px;margin-top:0px;"><b>海罗人才集团</b></p>
        <p style="text-align:center;">
          <el-button class="purple-button"
                     round>加入我们 ></el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button class="purple-button"
                     round>心动的offer ></el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
      </div>
    </div>
    <br /><br /><br />
    <p style="text-align:center;color:white;">全国办公室：上海 / 北京 / 南京 / 沈阳 / 武汉</p>
  </div>
</template>
<style>
.purple-button {
  background-color: #390453;
  border: none;
  color: white;
  font-weight: 600;
}
</style>
<script>
export default {
  name: 'webHome',
  data () {
    return {
      backgroundImage: require('../../../assets/background.jpg')
    }
  }
}
</script>
