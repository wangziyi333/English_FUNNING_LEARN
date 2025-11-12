// src/types/index.ts
export interface Word {
  id: number | string
  word: string
  soundmark: string
  translation: string
  examples?: string[]
  memoryTip: string
}

export interface WordBook {
  id: string
  name: string
  description: string
  words: Word[]
  articles: Map<number, string> // key是批次号(0-9, 10-19...)
  createdAt: Date
}

export interface StudyProgress {
  wordId: string
  easeFactor: number
  interval: number
  repetitions: number
  nextReviewDate: Date
  lastReviewDate: Date | null
  quality: number // 最后一次评分
}

export interface StudySession {
  date: Date
  wordsStudied: number
  wordsReviewed: number
  accuracy: number
}
