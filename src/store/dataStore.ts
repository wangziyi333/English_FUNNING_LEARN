import { defineStore } from 'pinia'
import dictionary from '@/data/dictionary_CET6.json'
import allStorys from '@/data/story.json'
import type { Word } from '@/types/index'
import { ref } from 'vue'
interface story {
  id: number
  words: string | Array<string>
  title: string
  story: string
  title_translation: string
  translation: string
}
const words = dictionary.words
const storys = allStorys.storys
const dailyGoal = ref(10)
const currentStory = ref<story>({
  id: 0,
  words: '',
  title: '',
  story: '',
  title_translation: '',
  translation: ''
})
type recite = {
  id: number | string
  word: string
  soundmark: string
  example?: string
  translation: string
}
type words = {
  id: number | string
  word: string
  soundmark?: string
  translation: string
  exmaple?: string
  memoryTip?: string
}
export const useWordStore = defineStore('word', {
  actions: {
    set_dailygoal(goal: number) {
      this.dailyGoal = goal
    },
    set_learnedDailyWords(word: words) {
      this.learnedDailyWords.push(word)
    },
    clear_learnedDailyWords() {
      this.learnedDailyWords.splice(0, this.learnedDailyWords.length)
    }
  },
  state() {
    return {
      words: words as Word[],
      recite_wordList: [] as recite[],
      dailyGoal,
      learnedDailyWords: [] as words[]
    }
  },
  getters: {},
  persist: true
})
export const useStoryStore = defineStore('story', {
  actions: {},
  state() {
    return { storys, currentStory }
  },
  getters: {},
  persist: true
})
