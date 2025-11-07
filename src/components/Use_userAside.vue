<template>
  <div class="container">
    <div class="left-top">
      <h2>学习进度</h2>
      <h3>
        <span>当前词典：<span class="cidian">英语六级词典</span></span
        ><span><span class="progress">35</span>%</span>
      </h3>
      <div class="progress-bar"></div>
      <h3>
        <span>今日进度</span
        ><span class="daily-progress"
          ><span class="daily-now">2</span>/<span class="daily-all">10</span>
        </span>
      </h3>
      <div class="daily-progress-bar"></div>
    </div>
    <div class="left-bottom">
      <h2>阅读文章</h2>
      <p>暂无</p>
      <div>
        <a href="#">查看更多<span class="iconfont icon-zhankai"></span></a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Usebanner"></script>
<style scoped>
.container {
  padding: 20px;
}
.container .left-top,
.container .left-bottom {
  background-color: #fff;
  padding: 24px 28px;
  border: 1px solid #faf8f8;
  border-radius: 10px;
  margin-bottom: 20px;
}
.container h2 {
  margin-bottom: 18px;
}
.container .left-top {
  height: 200px;
}

.container .left-top h3 {
  font-weight: 400;
  display: flex;
  justify-content: space-between;
}
.container .left-top h3 > span {
  display: block;
}
.container .left-top .progress-bar,
.container .left-top .daily-progress-bar {
  margin-top: 7px;
  margin-bottom: 15px;
  width: 300px;
  height: 10px;
  background-color: #f4f5f5;
  border-radius: 5px;
}
.container .left-bottom {
  height: 468px;
  /* background-color: #fff; */
}
.container .left-bottom div {
  text-align: right;
}
.container .left-bottom a {
  font-size: smaller;
}
</style>
