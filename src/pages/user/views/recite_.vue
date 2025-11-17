<template>
  <div class="container">
    <h1>单词背诵</h1>

    <!-- 添加加载状态 -->
    <div v-if="loading" class="loading">加载中...</div>

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
import { useWordStore } from '@/store/dataStore'
import { ref, computed, onMounted } from 'vue'
import wordsDB from '@/utils/db'
import storysDB from '@/utils/storyDB'
import storysJSON from '@/data/story.json'
import wordsJSON from '@/data/dictionary_CET6.json'
import { ElMessageBox } from 'element-plus'
const { recite_wordList, set_learnedDailyWords } = useWordStore()
const istrue = ref(true)
const reciteIndex = ref(0)
const loading = ref(false)

const reciteWord = computed(
  () => recite_wordList[reciteIndex.value] || { id: 0, word: '', soundmark: '', translation: '' }
)

const current_reciteWord = computed(() => reciteWord.value.word)
const current_wordSoundmark = computed(() => reciteWord.value.soundmark)
const current_wordTranslation = computed(() => reciteWord.value.translation)
// const current_id = computed(() => reciteWord.value.id)
const isknow = ref(true)

// 异步处理函数
async function nextWordRecite() {
  reciteIndex.value += 1
  isknow.value = true
  istrue.value = true
  if (reciteIndex.value >= 9) reciteIndex.value = 0
}

const countMark: string[] = []

// 第一轮学习函数
function KnowY() {
  countMark.push('1A')
}

function KnowNo() {
  countMark.push('1B')
}

function unKnow() {
  countMark.push('2')
}

// 第二轮学习函数
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

// 异步保存单词
async function setWord() {
  try {
    const currentWord = recite_wordList[reciteIndex.value]
    if (currentWord) {
      await wordsDB.saveWord(currentWord)
      set_learnedDailyWords(currentWord)
      console.log('单词保存成功:', currentWord.word)
    }
  } catch (error) {
    console.error('保存单词失败:', error)
  }
}

// 异步收藏单词
async function setfavorited() {
  try {
    const currentWord = recite_wordList[reciteIndex.value]
    if (currentWord) {
      await wordsDB.toggleFavorite(currentWord.id)
      console.log('收藏状态切换成功')
    }
  } catch (error) {
    console.error('切换收藏状态失败:', error)
  }
}

// 处理复习记录
async function processReviewRecords() {
  try {
    for (let i = 0; i < countMark.length; i++) {
      const wordId = recite_wordList[i]?.id
      if (!wordId) continue

      switch (countMark[i]) {
        case '1A1A':
          await wordsDB.recordReview(wordId, 5)
          break
        case '1B1A':
        case '1A1B':
          await wordsDB.recordReview(wordId, 4)
          break
        case '1B1B':
        case '1B2':
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
    console.error('处理复习记录失败:', error)
  }
}

// 第一轮学习处理函数
const handleUnKnow = async () => {
  isknow.value = false
  unKnow()
  await setWord()
}

const handleKnowY = async () => {
  await nextWordRecite()
  KnowY()
  await processReviewRecords()
}

const handleKnowNo = async () => {
  await nextWordRecite()
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
  await nextWordRecite()
  await processReviewRecords()
}

const handleKnowNo2 = async () => {
  KnowNo2()
  await setfavorited()
  await setWord()
  await nextWordRecite()
  await processReviewRecords()
}

const handleNextWord = async () => {
  await nextWordRecite()
}

const handleNextWordWithSave = async () => {
  await nextWordRecite()
  await setWord()
  await setfavorited()
}
interface story {
  id: number
  words: string | Array<string>
  title: string
  story: string
  title_translation: string
  translation: string
}
const test = async () => {
  const words = await wordsDB.getAllWords()
  const storys: story[] = await storysDB.getAllStorys()
  if (storys.length * 25 - words.length >= 25) {
    const n = storys.length
    ElMessageBox.alert('新的故事已经生成，请到文章中心查看！')
    await storysDB.addStory(
      storysJSON.storys[n] || {
        id: 0,
        words: [''],
        title: '',
        title_translation: '',
        story: '',
        translation: ''
      }
    )
  } else if (words.length === wordsJSON.words.length) {
    await storysDB.addStory(
      storysJSON.storys[storysJSON.storys.length - 1] || {
        id: 0,
        words: [''],
        title: '',
        story: '',
        title_translation: '',
        translation: ''
      }
    )
  }
}
test()
// 初始化数据库
onMounted(async () => {
  try {
    loading.value = true
    await wordsDB.init()
    await storysDB.init()
    console.log('数据库初始化成功')
  } catch (error) {
    console.error('数据库初始化失败:', error)
  } finally {
    loading.value = false
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
.loading {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
}
</style>
