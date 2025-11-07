<template>
  <div class="common-layout">
    <el-container>
      <el-header><useBanner /></el-header>
      <el-container>
        <el-aside width="200px"><useNav /></el-aside>
        <el-main><RouterView></RouterView></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" name="admin_" setup>
import useBanner from '@/components/UseBanner.vue'
import useNav from '@/components/UseNav.vue'
import { RouterView } from 'vue-router'
</script>
<style></style>
