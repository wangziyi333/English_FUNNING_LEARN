<template>
  <div class="container">
    <h1>趣味记忆法</h1>
    <p class="logic">通过联想记忆法快速记住单词含义</p>
    <div class="border_">
      <div class="left_"><span class="iconfont icon-brain-2-fill"></span></div>
      <div class="right_">
        <h2>
          单词：<span>{{ word }}</span>
        </h2>
        <p class="meaning">
          词义：<span>{{ translation }}</span>
        </p>
        <div class="skill">
          <p>
            <strong>记忆技巧：</strong><span>{{ memoryTip }}</span>
          </p>
        </div>
        <p class="example-sentence">
          例句：<span
            >His <strong>perseverance</strong> in the face of adversity was truly inspring.</span
          >
        </p>
      </div>
    </div>
    <el-card class="card">
      <strong>{{ word }}</strong>
      <p>{{ soundmark }}</p>
      <span class="iconfont icon-laba-xianxing"></span>
    </el-card>
    <div class="reading">
      <RouterLink to="/user/reading">
        <h3>阅读文章</h3>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts" name="memorize_">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useWordStore } from '@/store/dataStore'
const { words } = useWordStore()
const currentIndex = ref(0)
const currentWord = words[currentIndex.value] || {
  word: '',
  soundmark: '',
  translation: '',
  memoryTip: ''
}
const word = currentWord.word
const translation = currentWord.translation
const memoryTip = currentWord.memoryTip
const soundmark = currentWord.soundmark
</script>
<style scoped>
.container {
  padding: 1% 2%;
}
.container h1 {
  font-size: 28px;
  margin-bottom: 1%;
  color: #4281fb;
}
.container .logic {
  margin-bottom: 3%;
  font-size: large;
  color: #7a818b;
}
.container .border_ {
  display: flex;
}
.container .border_ .left_ {
  width: 16%;
  height: 800%;
  /* line-height: 800%; */
  background-color: #dcf0fd;
  border-radius: 20px;
  text-align: center;
  padding: 2%;
  margin-right: 30px;
}
.container .border_ .icon-brain-2-fill {
  font-size: 120px;
  color: #4783f6;
}
.container .right_ h2,
.right_ h2 > span {
  font-size: 25px;
}
.container .meaning {
  margin-bottom: 1%;
}
.container .skill {
  width: 85%;
  background-color: #fdfce8;
  border-left: 5px solid #e2b200;
  padding: 1.5% 3%;
  margin-bottom: 1%;
}
.card {
  width: 50%;
  background-color: #508df7;
  text-align: center;
  border-radius: 30px;
  color: #fff;
  margin: 2% auto;
  padding-top: 1%;
  transition: all 0.3s;
}
.card:hover {
  box-shadow: 2px 4px 4px 2px #ccd4e3;
}
.container .card strong {
  font-size: 45px;
}
.container .card p {
  margin-top: 1%;
}
.container .card .icon-laba-xianxing {
  width: 7%;
  height: 8%;
  border-radius: 50%;
  display: block;
  background-color: #78abfa;
  font-size: 25px;
  padding: 5px;
  margin: 1% auto;
}
.container .reading {
  display: block;
  width: 11%;
  background-color: #4782f8;
  border-radius: 15px;
  text-align: center;
  line-height: 330%;
  font-weight: 400;
  margin: 2% auto;
}
.reading h3 {
  font-size: 19px;
  color: #fff;
}
</style>
