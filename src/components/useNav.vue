<script setup lang="ts" name="myNav">
// import {  Menu } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { useNameStore } from '@/store/nameStore'
const {
  Control_Panel,
  sys_management,
  data_management,
  mainConsole,
  messages,
  user_management,
  notice,
  prs_settings,
  sys_settings
} = useNameStore()
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
    :default-active="activeIndex"
  >
    <el-sub-menu index="1">
      <template #title>
        <i class="iconfont icon-kongzhitai"></i>
        <span>{{ Control_Panel }}</span>
      </template>
      <el-menu-item style="font-size: large"
        ><RouterLink to="/admin/console" active-class="active" index="1-1">{{
          mainConsole
        }}</RouterLink></el-menu-item
      >
      <el-menu-item style="font-size: large"
        ><RouterLink to="/admin/messages" active-class="active" index="1-2">{{
          messages
        }}</RouterLink></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <i class="iconfont icon-guanli"></i>
        <span>{{ sys_management }}</span>
      </template>
      <el-menu-item style="font-size: large"
        ><RouterLink to="/admin/user_mag" active-class="active" index="2-1">{{
          user_management
        }}</RouterLink></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <i class="iconfont icon-shuju"></i>
        <span>{{ data_management }}</span>
      </template>
      <el-menu-item style="font-size: large"
        ><RouterLink to="/admin/notice" active-class="active" index="3-1">{{
          notice
        }}</RouterLink></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <i class="iconfont icon-icon_shezhi"></i>
        <span>{{ sys_settings }}</span>
      </template>
      <el-menu-item style="font-size: large"
        ><RouterLink to="/admin/prs_set" active-class="active" index="4-1">{{
          prs_settings
        }}</RouterLink></el-menu-item
      >
      <el-menu-item style="font-size: large"
        ><RouterLink to="/admin/sys_set" active-class="active" index="4-2">{{
          sys_settings
        }}</RouterLink>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
* {
  color: aliceblue;
}
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
