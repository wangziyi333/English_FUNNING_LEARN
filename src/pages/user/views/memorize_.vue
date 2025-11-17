<template>
  <div class="container">
    <h1>趣味记忆法</h1>
    <p class="logic">通过联想记忆法快速记住单词含义</p>
    <div class="border_">
      <div class="left_"><span class="iconfont icon-brain-2-fill"></span></div>
      <div class="right_">
        <h2>
          单词：<span>{{ currentWord.word }}</span>
        </h2>
        <p class="meaning">
          词义：<span>{{ currentWord.translation }}</span>
        </p>
        <div class="skill">
          <p>
            <strong>记忆技巧：</strong><span>{{ currentWord.memoryTip }}</span>
          </p>
        </div>
        <p class="example-sentence">
          例句：<span
            >His <strong>perseverance</strong> in the face of adversity was truly inspring.</span
          >
        </p>
      </div>
    </div>
    <div class="card_container">
      <el-card v-if="currentIndex > 0" @click="prevWord" shadow="hover" class="toggle"
        ><strong>上一个</strong></el-card
      >
      <el-card class="card">
        <strong>{{ currentWord.word }}</strong>
        <p>{{ currentWord.soundmark }}</p>
        <span class="iconfont icon-laba-xianxing"></span>
      </el-card>
      <el-card v-if="currentIndex < 10" @click="nextWord" shadow="hover" class="toggle"
        ><strong>下一个</strong></el-card
      >
      <el-card v-else @click="beginRecite" shadow="hover" class="toggle"
        ><strong>开始背诵</strong></el-card
      >
    </div>

    <!-- <div class="toggle">
      <div @click="prevWord">上一个</div>
      <div @click="nextWord">下一个</div>
    </div> -->
  </div>
</template>
<script setup lang="ts" name="memorize_">
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useWordStore } from '@/store/dataStore'
const { words, recite_wordList } = useWordStore()
//清空元素
recite_wordList.splice(0, recite_wordList.length)
const currentIndex = ref(0)
const router = useRouter()
const currentWord = computed(
  () =>
    words[currentIndex.value] || {
      id: 0,
      word: '',
      soundmark: '',
      translation: '',
      memoryTip: ''
    }
)
recite_wordList.push({
  word: currentWord.value.word,
  soundmark: currentWord.value.soundmark,
  translation: currentWord.value.translation,
  id: currentWord.value.id
})
function beginRecite() {
  router.push('/user/recite')
}
function nextWord() {
  if (currentIndex.value < 10) {
    currentIndex.value += 1
    const word = currentWord.value.word
    const soundmark = currentWord.value.soundmark
    const translation = currentWord.value.translation
    const id = currentWord.value.id
    if (
      recite_wordList.indexOf({
        word: currentWord.value.word,
        soundmark: currentWord.value.soundmark,
        translation: currentWord.value.translation,
        id: currentWord.value.id
      }) !== 1
    )
      recite_wordList.push({ word, soundmark, translation, id })
  }
}
function prevWord() {
  if (currentIndex.value > 0) currentIndex.value -= 1
}
</script>
<style scoped>
div {
  cursor: default;
}
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
  margin: 1.5% 0px;
}
.card_container {
  display: flex;
  align-items: center;
}
.toggle {
  cursor: pointer;
  border-radius: 10px;
  background-color: #508df7;
  color: #fff;
  width: 10%;
  text-align: center;
  margin: 7%;
}
.toggle strong {
  font-size: 19px;
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
  margin: 3% auto;
}
/* .container .reading {
  display: block;
  width: 11%;
  background-color: #4782f8;
  border-radius: 15px;
  text-align: center;
  line-height: 330%;
  font-weight: 400;
  margin: 2% auto;
} */
</style>
