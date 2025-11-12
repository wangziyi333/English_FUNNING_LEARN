<template>
  <div class="container">
    <div class="left-top">
      <h2>学习进度</h2>
      <h3>
        <span>当前词典：<span class="cidian">英语六级词典</span></span
        ><span
          ><span class="progress">{{ (progressHad / all) * 100 }}</span
          >%</span
        >
      </h3>
      <div class="progress-bar"><div class="progress-had-bar"></div></div>
      <h3>
        <span>今日进度</span
        ><span class="daily-progress"
          ><span class="daily-now">{{ progressDailyHad }}</span
          >/<span class="daily-all">{{ dailyGoal }}</span>
        </span>
      </h3>
      <div class="daily-progress-bar"><div class="daily-progress-had-bar"></div></div>
    </div>
    <div class="left-bottom">
      <h2>阅读文章</h2>
      <p>暂无</p>
      <div>
        <RouterLink to="/home/more_reading"
          ><span>查看更多</span><span class="iconfont icon-zhankai"></span
        ></RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Usebanner">
// import { useStoryStore, useWordStore } from '@/store/dataStore'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
// const { words } = useWordStore()
// const { storys } = useStoryStore()
const progressHad = ref(390)
const all = ref(1000)
const progressDailyHad = ref(2)
const dailyGoal = ref(10)
onMounted(() => {
  const phb = document.querySelector('.progress-had-bar')
  const dphb = document.querySelector('.daily-progress-had-bar')
  if (phb instanceof HTMLElement) {
    const width = (progressHad.value / all.value) * 100
    phb.style.width = `${width}%`
  }
  if (dphb instanceof HTMLElement) {
    const width = (progressDailyHad.value / dailyGoal.value) * 100
    dphb.style.width = `${width}%`
  }
})
</script>
<style scoped>
.container {
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container .left-top,
.container .left-bottom {
  padding: 24px 30px;
  border: 1px solid #ecebeb;
  border-radius: 10px;
  margin-bottom: 20px;
}
.container h2 {
  margin-bottom: 18px;
}
.container .left-top {
  max-height: 200px;
}

.container .left-top h3 {
  font-weight: 400;
  display: flex;
  justify-content: space-between;
}
.container .left-top h3 > span {
  display: block;
}
.progress-bar,
.daily-progress-bar {
  margin-top: 7px;
  margin-bottom: 15px;
  width: 100%;
  height: 10px;
  background-color: #f4f5f5;
  border-radius: 5px;
}
.progress-had-bar,
.daily-progress-had-bar {
  height: 100%;
  background-color: #4483ef;
  border-radius: 5px;
}
.container .left-bottom {
  height: 100%;
}
.container .left-bottom div {
  text-align: right;
}
.container .left-bottom span {
  color: rgb(101, 101, 101);
  font-size: smaller;
}
</style>
