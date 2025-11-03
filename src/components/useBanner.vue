<template>
  <div class="banner">
    <el-breadcrumb class="banner-left" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">promotion management</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="banner-right">
      <span class="iconfont icon-sousuo"></span>
      <RouterLink to="/notice" class="iconfont icon-tongzhilingdang"></RouterLink>
      <div class="demo-type">
        <RouterLink to="./prs_set"
          ><el-avatar
            class="iconfont"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        /></RouterLink>
      </div>
      <RouterLink to="/prs_set" class="iconfont icon-icon_shezhi"></RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts" name="myBanner"></script>
<style>
.banner {
  justify-content: space-between;
  display: flex;
  height: 60px; /* 给容器一个明确的高度 */
  padding: 0 20px;
}
.banner-left {
  display: flex;
  align-items: center;
  height: 100%;
}
.banner-right {
  display: flex;
  align-items: center;
}
.banner .iconfont {
  margin-left: 15px;
  font-size: larger;
  color: rgb(58, 58, 58);
}
.banner .icon-sousuo {
  transition: all 0.8s;
  padding: 5px;
}
.banner .icon-sousuo:hover {
  display: block;
  width: 150px;
  text-align: right;
  line-height: 26px;
  height: 26px;
  border-radius: 18px;
  background-color: antiquewhite;
}
</style>
