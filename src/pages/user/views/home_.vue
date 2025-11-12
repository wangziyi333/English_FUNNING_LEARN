<template>
  <div class="container">
    <div class="top">
      <h1>英语单词记忆之旅</h1>
      <p>通过趣味记忆和文章应用，轻松掌握英语词汇</p>
    </div>
    <div class="main">
      <span class="iconfont icon-peiwangyindao"></span>
      <h1>开启你的学习之旅</h1>
      <p>每天学习<span>10</span>个单词即可完成当日任务</p>
      <div class="study">
        <RouterLink to="/user/memorize"
          ><h2><span class="iconfont icon-ai23"></span>开始今日学习</h2>
        </RouterLink>
      </div>
      <div class="review">
        <RouterLink to="/user/review"
          ><h2><span class="iconfont icon-danxunhuan"></span>复习！</h2></RouterLink
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="home_">
import { RouterLink } from 'vue-router'
</script>
<style scoped>
.container {
  padding-left: 5%;
  padding-top: 1%;
}
.top h1 {
  margin-bottom: 1%;
  font-size: 35px;
  color: #4483ef;
}
.top p {
  font-size: 20px;
  color: #5e616c;
}
.main {
  margin-top: 3%;
  text-align: center;
}
.main .icon-peiwangyindao {
  font-size: 90px;
  color: #4483ef;
}
.main > h1 {
  margin-top: 1.5%;
  margin-bottom: 1%;
  color: #1c2a39;
  font-size: 25px;
}
.main > p {
  color: #464d4d;
  font-size: 20px;
  margin-bottom: 3%;
}
.main .study,
.main .review {
  /* margin-bottom: 28px; */
  width: 50%;
  height: 10%;
  border-radius: 20px;
  box-shadow: 2px 3px 3px 3px rgb(227, 224, 224);
  margin: 1% auto;
  line-height: 420%;
  transition: all 0.3s;
}
.main .icon-danxunhuan,
.main .icon-ai23 {
  font-size: larger;
  margin-right: 2%;
}
.main .study {
  background-color: #4783f6;
}
.main .study h2 {
  font-size: 20px;
  color: #fff;
}
.main .review h2 {
  font-size: 20px;
  color: black;
}
.main .review {
  background-color: #f6be1e;
}
.main .study:hover {
  background-color: #3165eb;
  width: 51%;
}
.main .review:hover {
  background-color: #f4ac0d;
  width: 51%;
}
</style>
