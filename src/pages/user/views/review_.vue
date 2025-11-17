<template>
  <div class="container">
    <h1>单词背诵</h1>
    <div v-if="loading">加载中...</div>
    <div v-else>
      <div v-if="countMark.length < 10">
        <el-card v-if="isknow" class="recite_word_card" shadow="hover">
          <h2>{{ current_reciteWord }}</h2>
          <span>{{ current_wordSoundmark }}</span>
        </el-card>
        <el-card v-else class="unknow_word_card">
          <h2>{{ current_reciteWord }}</h2>
          <span>{{ current_wordSoundmark }}</span>
          <p>{{ current_wordTranslation }}</p>
        </el-card>
      </div>
      <div v-else>
        <el-card v-if="isknow" class="recite_word_card" shadow="hover">
          <h2>{{ current_wordTranslation }}</h2>
        </el-card>
        <el-card v-else class="unknow_word_card">
          <h2>{{ current_reciteWord }}</h2>
          <span>{{ current_wordSoundmark }}</span>
          <p>{{ current_wordTranslation }}</p>
        </el-card>
      </div>
      <div class="footer" v-if="countMark.length < 10">
        <div class="option_for_word" @click="handleUnKnow" v-if="isknow && istrue">
          <span>陌生</span>
        </div>
        <div class="option_for_word" @click="handleNextWord" v-else-if="istrue">
          <span>下一个</span>
        </div>
        <div class="option_for_word" v-else @click="handleKnowNo">
          <span>错误</span>
        </div>
        <div class="option_for_word" @click="handleFamiliar" v-if="isknow && istrue">
          <span>熟悉</span>
        </div>
        <div class="option_for_word" @click="handleKnowY" v-if="!isknow && !istrue">
          <span>正确</span>
        </div>
      </div>
      <div class="footer" v-else>
        <div class="option_for_word" @click="handleUnKnow2" v-if="isknow && istrue">
          <span>陌生</span>
        </div>
        <div class="option_for_word" @click="handleNextWordWithSave" v-else-if="istrue">
          <span>下一个</span>
        </div>
        <div class="option_for_word" v-else @click="handleKnowNo2">
          <span>错误</span>
        </div>
        <div class="option_for_word" @click="handleFamiliar" v-if="isknow && istrue">
          <span>熟悉</span>
        </div>
        <div class="option_for_word" @click="handleKnowY2" v-if="!isknow && !istrue">
          <span>正确</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="recite_">
type word = {
  id: string | number
  word: string
  memoryTip?: string
  soundmark?: string
  translation: string
  isLearned?: boolean
  isFavorited?: boolean
  isFamiliar?: boolean
  addedDate?: string
  lastReviewDate?: string
  nextReviewDate?: string
  reviewCount?: number
  correctCount?: number
  easinessFactor?: number
  repetitions?: number
  interval?: number
}

import { useWordStore } from '@/store/dataStore'
import { ref, computed, onMounted } from 'vue'
import wordsDB from '@/utils/db'

const { recite_wordList, set_learnedDailyWords } = useWordStore()
const istrue = ref(true)
const reciteIndex = ref(0)
const loading = ref(true)
const review_wordList = ref<word[]>([])

const reciteWord = computed(
  () =>
    review_wordList.value[reciteIndex.value] || { id: 0, word: '', soundmark: '', translation: '' }
)
const current_reciteWord = computed(() => reciteWord.value.word)
const current_wordSoundmark = computed(() => reciteWord.value.soundmark)
const current_wordTranslation = computed(() => reciteWord.value.translation)
// const current_id = computed(() => reciteWord.value.id)
const isknow = ref(true)
const countMark: string[] = []
// 初始化复习列表
const initializeReviewList = async () => {
  try {
    loading.value = true
    const todayReviewWords = await wordsDB.getTodayReviewWords()
    review_wordList.value = todayReviewWords as word[]
    console.log('复习列表加载完成')
  } catch (error) {
    console.error('加载复习单词列表失败', error)
    // 如果获取今日复习单词失败，使用默认单词列表
    review_wordList.value = recite_wordList
  } finally {
    loading.value = false
  }
}

// 下一个单词
function nextWordRecite() {
  reciteIndex.value += 1
  isknow.value = true
  istrue.value = true
  if (reciteIndex.value >= review_wordList.value.length - 1) reciteIndex.value = 0
}

// 第一轮学习标记函数
function KnowY() {
  countMark.push('1A')
}

function KnowNo() {
  countMark.push('1B')
}

function unKnow() {
  countMark.push('2')
}

// 第二轮学习标记函数
function KnowNo2() {
  if (reciteIndex.value < countMark.length) {
    countMark[reciteIndex.value] += '1B'
  }
}

function KnowY2() {
  if (reciteIndex.value < countMark.length) {
    countMark[reciteIndex.value] += '1A'
  }
}

function unKnow2() {
  if (reciteIndex.value < countMark.length) {
    countMark[reciteIndex.value] += '2'
  }
}

// 保存单词到数据库
async function setWord() {
  try {
    const currentWord = reciteWord.value
    if (currentWord && currentWord.id !== 0) {
      await wordsDB.saveWord(currentWord)
      set_learnedDailyWords(currentWord)
      console.log('单词保存成功:', currentWord.word)
    }
  } catch (error) {
    console.error('保存单词失败', error)
  }
}

// 收藏单词
async function setfavorited() {
  try {
    const currentWord = reciteWord.value
    if (currentWord && currentWord.id !== 0) {
      await wordsDB.setFavorite(currentWord.id)
      console.log('收藏状态切换成功')
    }
  } catch (error) {
    console.error('收藏失败', error)
  }
}

// 处理复习记录
const processReviewRecords = async () => {
  try {
    for (let i = 0; i < countMark.length; i++) {
      const wordId = review_wordList.value[i]?.id || recite_wordList[i]?.id
      if (!wordId) continue

      switch (countMark[i]) {
        case '1A1A':
          await wordsDB.recordReview(wordId, 5)
          break
        case '1B1A':
          await wordsDB.recordReview(wordId, 4)
          break
        case '1A1B':
          await wordsDB.recordReview(wordId, 4)
          break
        case '1B1B':
          await wordsDB.recordReview(wordId, 3)
          break
        case '1B2':
          await wordsDB.recordReview(wordId, 3)
          break
        case '1A2':
          await wordsDB.recordReview(wordId, 3)
          break
        case '21A':
          await wordsDB.recordReview(wordId, 2)
          break
        case '21B':
          await wordsDB.recordReview(wordId, 1)
          break
        case '22':
          await wordsDB.recordReview(wordId, 0)
          break
      }
    }
    console.log('复习记录处理完成')
  } catch (error) {
    console.error('处理复习记录失败', error)
  }
}

// 第一轮学习处理函数
const handleUnKnow = async () => {
  isknow.value = false
  unKnow()
  await setWord()
}
const handleKnowY = async () => {
  nextWordRecite()
  KnowY()
  await processReviewRecords()
}

const handleKnowNo = async () => {
  nextWordRecite()
  KnowNo()
  await processReviewRecords()
}

const handleFamiliar = () => {
  isknow.value = false
  istrue.value = false
}

// 第二轮学习处理函数
const handleUnKnow2 = async () => {
  isknow.value = false
  unKnow2()
  await setWord()
}

const handleKnowY2 = async () => {
  KnowY2()
  await setWord()
  nextWordRecite()
  await processReviewRecords()
}

const handleKnowNo2 = async () => {
  KnowNo2()
  await setfavorited()
  await setWord()
   nextWordRecite()
  await processReviewRecords()
}

const handleNextWord = async () => {
  nextWordRecite()
}

const handleNextWordWithSave = async () => {
  nextWordRecite()
  await setWord()
  await setfavorited()
}

// 组件挂载时初始化
onMounted(async () => {
  try {
    await wordsDB.init()
    await initializeReviewList()
  } catch (error) {
    console.error('初始化失败:', error)
  }
})
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
