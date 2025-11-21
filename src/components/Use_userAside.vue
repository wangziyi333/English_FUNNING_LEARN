<template>
  <div class="container">
    <div v-if="loading">加载中...</div>
    <div v-else class="left-top">
      <h2>学习进度</h2>
      <h3>
        <span>当前词典：<span class="cidian">英语六级词典</span></span
        ><span class="progress">{{ progressHad }}/{{ words.length }}</span>
      </h3>
      <div class="progress-bar"><div class="progress-had-bar"></div></div>
      <h3>
        <span>今日进度</span
        ><span class="daily-progress"
          ><span class="daily-now">{{ learnedDailyWords.length }}</span
          >/<span class="daily-all">{{ dailyGoal }}</span>
        </span>
      </h3>
      <div class="daily-progress-bar"><div class="daily-progress-had-bar"></div></div>
    </div>
    <div class="left-bottom">
      <h2>阅读文章</h2>
      <div v-if="faceStorys.filter((story) => story === defaultStory).length < 5">
        <p v-for="(story, id) in faceStorys" :key="id" @click="changeCurrentStory(story)">
          <RouterLink to="/user/reading" :currentStory="story">{{ story.title }}</RouterLink>
        </p>
      </div>
      <div v-else>
        <p>暂无</p>
      </div>
      <div>
        <RouterLink to="/user/more_reading"
          ><span>查看更多</span><span class="iconfont icon-zhankai"></span
        ></RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Usebanner">
interface story {
  id: number
  words: string | Array<string>
  title: string
  story: string
  title_translation: string
  translation: string
}
import { useStoryStore } from '@/store/dataStore'
import { useWordStore } from '@/store/dataStore'
import { reactive, ref, nextTick } from 'vue'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import wordsDB from '@/utils/db'
import storysDB from '@/utils/storyDB'
// const { words } = useWordStore()
// const { storys } = useStoryStore()
const changeCurrentStory = useStoryStore().changeCurrentStory
const loading = ref(true)
localStorage.setItem('date', JSON.stringify(new Date().toISOString().split('T')[0]))
const today = new Date().toISOString().split('T')[0]
const date = localStorage.getItem('date')
const { words, dailyGoal, learnedDailyWords, clear_learnedDailyWords } = useWordStore()
// const defaultWord = {
//   id: '',
//   word: '',
//   translation: ''
// }
const defaultStory = reactive<story>({
  id: 0,
  words: '',
  title: '',
  story: '',
  title_translation: '',
  translation: ''
})
const faceStorys = reactive<Array<story>>([
  defaultStory,
  defaultStory,
  defaultStory,
  defaultStory,
  defaultStory
])
const progressHad = ref(0)
async function useStoryDB() {
  await wordsDB.init()
  const storysAll: Array<story> = await storysDB.getAllStorys()
  if (storysAll.length > 0)
    for (let i = 0; i < 5; i++) {
      if (storysAll[i]) faceStorys[i] = storysAll[i] || defaultStory
    }
  if (faceStorys.filter((story) => story === defaultStory).length < 5) {
    Object.assign(
      faceStorys,
      faceStorys.filter((story) => story !== defaultStory)
    )
  }
  // faceStorys.forEach((story) =>
  //   console.log(story, '///', defaultStory, '///', story == defaultStory)
  // )
  // console.log(faceStorys.filter((story) => story === defaultStory).length)
}
async function useDB() {
  await wordsDB.init()
  // wordsDB.saveWord(words[0] || defaultWord)
  const learnedWords = await wordsDB.getAllWords()
  if (date !== today || date === null) {
    localStorage.setItem('date', JSON.stringify(today))
    clear_learnedDailyWords()
  }
  progressHad.value = learnedWords.length
  await nextTick()
  const phb = document.querySelector('.progress-had-bar') as HTMLElement
  const dphb = document.querySelector('.daily-progress-had-bar') as HTMLElement
  if (phb) {
    const width = Math.min((progressHad.value / words.length) * 100, 100)
    console.log(`总进度为：${progressHad.value * 100}/${words.length}%`)
    phb.style.width = `${width}%`
  }

  if (dphb) {
    const width = Math.min((learnedDailyWords.length / dailyGoal) * 100, 100)
    console.log(`日进度为：${learnedDailyWords.length * 100}/${dailyGoal}%`)
    dphb.style.width = `${width}%`
  }
}
onMounted(() => {
  try {
    useDB()
    useStoryDB()
  } catch (error) {
    console.error('初始化失败', error)
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
.container .left-bottom p {
  margin: 8px 0;
  text-align: left;
}
</style>
