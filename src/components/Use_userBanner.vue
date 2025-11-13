<template>
  <div class="header">
    <RouterLink to="/user/home"
      ><div class="logo">
        <span class="iconfont icon-shuba"></span>
        <h1>FUNNING LEARN</h1>
      </div></RouterLink
    >
    <div class="right">
      <div class="dictionaries">
        <span class="iconfont icon-danci"></span>
        <h2 class="cidian">英语六级词典</h2>
        <span class="iconfont icon-xiala-"></span>
      </div>
      <div class="user">
        <RouterLink to="/user/personal_center"
          ><span class="iconfont icon-gerenfill"></span
        ></RouterLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" name="userBanner" setup>
import { RouterLink } from 'vue-router'
</script>
<style scoped>
div {
  cursor: default;
}
.header {
  height: 100%;
  border-bottom: 3px solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;
}
.header .logo {
  display: flex;
  line-height: 60px;
  cursor: pointer;
}
.logo span,
.logo h1 {
  color: #4483ef;
}
* {
  font-size: 25px;
}
.header .icon-shuba {
  font-size: 40px;
  margin-right: 15px;
}
.right {
  display: flex;
  height: 100%;
  align-items: center;
}
.header .dictionaries {
  margin-right: 35px;
  line-height: 45px;
  background-color: #f3f5f8;
  width: 240px;
  height: 45px;
  border-radius: 22px;
  display: flex;
}
.header .dictionaries .icon-danci {
  font-size: 40px;
  margin-left: 10px;
}
.header .dictionaries h2 {
  font-size: 20px;
  font-weight: 400;
  margin-right: 8px;
}
.header .dictionaries .icon-xiala- {
  font-size: 25px;
  cursor: pointer;
}
.header .icon-gerenfill {
  font-size: 45px;
  line-height: 100px;
}
</style>
