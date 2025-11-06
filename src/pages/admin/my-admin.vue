<script setup lang="ts" name="my-admin">
import useNav from '@/components/UseNav.vue'
import useBanner from '@/components/UseBanner.vue'
import './css/base.css'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><useNav /></el-aside>
      <el-container>
        <el-header><useBanner /></el-header>
        <el-main class="body"><RouterView></RouterView></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.common-layout {
  height: 100%;
  width: 100%;
  margin: 0;
}
.body {
  background-color: antiquewhite;
}
* {
  margin: 0px;
}
</style>
