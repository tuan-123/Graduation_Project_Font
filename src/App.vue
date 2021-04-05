<template>
  <div id="app">
    <!-- 根据 .vue的name属性-->
    <keep-alive :include="['Idle','MyIdle']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
