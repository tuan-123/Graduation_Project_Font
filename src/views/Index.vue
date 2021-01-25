<template>
  <el-container>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>

</template>

<script>

    export default{
        name:'Index'
    }
</script>

<style scoped>
  .el-container{
    height: 100%;

    overflow-x: hidden;
    overflow-y: hidden;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 1200px;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 130px;
  }

</style>
