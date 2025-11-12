import { defineStore } from 'pinia'
import dictionary from '@/data/dictionary_CET6.json'
import allStorys from '@/data/story.json'
import type { Word } from '@/types/index'
const words = dictionary.words
const storys = allStorys.storys
export const useWordStore = defineStore('word', {
  actions: {},
  state() {
    return {
      words: words as Word[]
    }
  },
  getters: {}
})
export const useStoryStore = defineStore('story', {
  actions: {},
  state() {
    return storys
  },
  getters: {}
})
