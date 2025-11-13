<template>
  <div class="container">
    <h1>单词背诵</h1>
    <el-card v-if="isknow" class="recite_word_card" shadow="hover">
      <h2>{{ current_reciteWord }}</h2>
      <span>{{ current_wordSoundmark }}</span>
    </el-card>
    <el-card v-else class="unknow_word_card">
      <h2>{{ current_reciteWord }}</h2>
      <span>{{ current_wordSoundmark }}</span>
      <p>{{ current_wordTranslation }}</p>
    </el-card>
    <div class="footer">
      <div class="option_for_word" @click="isknow = false">
        <span>陌生</span>
      </div>
      <div class="option_for_word" @click="nextWordRecite">
        <span v-if="isknow">熟悉</span><span v-else>下一个</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="recite_">
import { useWordStore } from '@/store/dataStore'
import { ref, computed } from 'vue'
const { recite_wordList } = useWordStore()
const reciteIndex = ref(0)
const reciteWord = computed(
  () => recite_wordList[reciteIndex.value] || { word: '', soundmark: '', translation: '' }
)
const current_reciteWord = computed(() => reciteWord.value.word)
const current_wordSoundmark = computed(() => reciteWord.value.soundmark)
const current_wordTranslation = computed(() => reciteWord.value.translation)
const isknow = ref(true)
function nextWordRecite() {
  reciteIndex.value += 1
  isknow.value = true
}
</script>
<style scoped>
div {
  cursor: default;
}
.container {
  padding: 1% 2%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.container > h1 {
  font-size: 28px;
  margin-bottom: 1%;
  color: #4281fb;
}
.recite_word_card,
.unknow_word_card {
  margin: 2% auto;
  text-align: center;
  background-color: #508df7;
  width: 60%;
  border-radius: 25px;
  flex: 1;
}
.recite_word_card {
  padding: 8%;
}
.unknow_word_card {
  padding: 6.7% 8%;
}
.unknow_word_card span,
.recite_word_card span {
  font-size: 25px;
  color: #fff;
}
.recite_word_card h2,
.unknow_word_card h2 {
  font-size: 50px;
  color: #fff;
}
.unknow_word_card p {
  color: #fff;
  margin: 1%;
}
.footer {
  display: flex;
  justify-content: center;
}
.option_for_word {
  margin: 0px 1%;
  width: 10%;
  line-height: 280%;
  border-radius: 18px;
  text-align: center;
  background-color: #f6be1e;
  cursor: pointer;
}
</style>
