<template>
  <div class="container">
    <div class="top">
      <h1>英语单词记忆之旅</h1>
      <p>通过趣味记忆和文章应用，轻松掌握英语词汇</p>
    </div>
    <div class="body">
      <span class="iconfont icon-peiwangyindao"></span>
      <h1>开启你的学习之旅</h1>
      <p>每天学习<span>10</span>个单词即可完成当日任务</p>
      <div class="study">
        <RouterLink to="/home/memorize"
          ><h2><span class="iconfont icon-ai23"></span>开始今日学习</h2>
        </RouterLink>
      </div>
      <div class="review">
        <RouterLink to="home/review"
          ><h2><span class="iconfont icon-danxunhuan"></span>复习！</h2></RouterLink
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="home_">
import { RouterLink } from 'vue-router'
</script>
<style scoped></style>
