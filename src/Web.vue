<template>
  <div id="app"
       style="background-color:#481363;">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ebeff3;
  background-color: #261151;
  height: 100%;
}
.toolbar {
  text-align: left;
  margin-top: 5px;
  margin-bottom: 5px;
}
.el-table__body tr.current-row > td {
  background: rgb(241, 219, 119) !important;
}
</style>
