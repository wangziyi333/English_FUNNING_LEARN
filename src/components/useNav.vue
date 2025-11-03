<script setup lang="ts" name="myNav">
// import {  Menu } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
// import { useRoute } from 'vue-router'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const activeIndex = ref('2')
onMounted(() => {
  activeIndex.value = '1-1'
})
</script>

<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
    :default-active="activeIndex"
  >
    <el-sub-menu index="1">
      <template #title>
        <i class="iconfont icon-kongzhitai"></i>
        <span>控制面板</span>
      </template>
      <el-menu-item index="1-1" style="font-size: large"
        ><RouterLink to="/console" active-class="active">主控制台</RouterLink></el-menu-item
      >
      <el-menu-item index="1-2" style="font-size: large"
        ><RouterLink to="/messages" active-class="active">我的消息</RouterLink></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <i class="iconfont icon-guanli"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item index="2-1" style="font-size: large"
        ><RouterLink to="/user_mag" active-class="active">用户管理</RouterLink></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <i class="iconfont icon-shuju"></i>
        <span>数据管理</span>
      </template>
      <el-menu-item index="3-1" style="font-size: large"
        ><RouterLink to="notice" active-class="active">通知公告</RouterLink></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <i class="iconfont icon-icon_shezhi"></i>
        <span>系统设置</span>
      </template>
      <el-menu-item index="4-1" style="font-size: large"
        ><RouterLink to="/prs_set" active-class="active">个人设置</RouterLink></el-menu-item
      >
      <el-menu-item index="4-2" style="font-size: large"
        ><RouterLink to="/sys_set" active-class="active">系统设置</RouterLink>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical-demo {
  width: 100%;
  height: 100vh;
  border: none;
  margin-left: 0;
}
.el-menu-vertical-demo .iconfont {
  margin-right: 10px;
  font-size: 18px;
}
.active {
  color: orange;
}
</style>
