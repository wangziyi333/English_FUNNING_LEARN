import dictionary from '../data/dictionary_CET6.json'
interface WordData {
  id: string | number
  word: string
  memoryTip?: string
  soundmark?: string
  translation?: string
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

// 定义字典数据结构接口
// interface DictionaryData {
//   words: WordData[]
// }

class Database {
  db: IDBDatabase | null
  dbName: string
  version: number
  constructor() {
    this.db = null
    this.dbName = 'VocabularyDB'
    this.version = 1
  }
  //初始化
  async init(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      indexedDB = window.indexedDB
      const request = indexedDB.open(this.dbName, this.version)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        console.log('数据库初始化成功')
        resolve(this.db)
      }
      //数据库升级|创建
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result
        //创建
        if (!db.objectStoreNames.contains('words')) {
          const objectStore = db.createObjectStore('words', {
            keyPath: 'id'
          })
          objectStore.createIndex('word', 'word', { unique: false })
          objectStore.createIndex('isLearned', 'isLearned', { unique: false })
          objectStore.createIndex('isFavorited', 'isFavorited', { unique: false })
          objectStore.createIndex('isFamiliar', 'isFamiliar', { unique: false })
          objectStore.createIndex('lastReviewDate', 'lastReviewDate', { unique: false })
          objectStore.createIndex('addedDate', 'addedDate', { unique: false })
          objectStore.createIndex('easinessFactor', 'easinessFactor', { unique: false })
          objectStore.createIndex('repetitions', 'repetitions', { unique: false })
          console.log('words表创建成功')
        }
      }
    })
  }
  //添加|更新单词
  async saveWord(wordData: WordData): Promise<IDBValidKey> {
    const transaction = this.db!.transaction(['words'], 'readwrite')
    const store = transaction.objectStore('words')
    //添加默认字段
    const word = {
      ...wordData,
      addedDate: wordData.addedDate || new Date().toISOString().split('T')[0],
      reviewCount: wordData.reviewCount || 0,
      correctCount: wordData.correctCount || 0,
      easinessFactor: wordData.easinessFactor || 2.5,
      repetitions: wordData.repetitions || 0,
      interval: wordData.interval || 1
    }
    return new Promise((resolve, reject) => {
      const request = store.put(word)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  async getById(storeName: string, id: string | number): Promise<WordData | undefined> {
    const transaction = this.db!.transaction([storeName], 'readonly')
    const store = transaction.objectStore(storeName)

    return new Promise((resolve, reject) => {
      const request = store.get(id)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  async update(storeName: string, data: WordData): Promise<IDBValidKey> {
    const transaction = this.db!.transaction([storeName], 'readwrite')
    const store = transaction.objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.put(data)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  //标记为收藏
  async setFavorite(id: number | string) {
    const word = await this.getById('words', id)
    if (word) {
      word.isFavorited = true
      await this.update('words', word)
    }
  }
  async toggleFavorite(id: number | string) {
    const word = await this.getById('words', id)
    if (word) {
      word.isFavorited = !word.isFavorited
      await this.update('words', word)
    }
  }
  //标记为熟悉---放进垃圾桶
  async markAsFamiliar(id: number | string) {
    const word = await this.getById('words', id)
    if (word) {
      word.isFamiliar = true
      await this.update('words', word)
    }
  }
  //获取收藏的单词
  async getFavoritedWords() {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['words'], 'readonly')
      const store = transaction.objectStore('words')
      const request = store.getAll()
      request.onsuccess = () => {
        const words = request.result.filter((word: WordData) => word.isFavorited)
        resolve(words)
      }
      request.onerror = () => reject(request.error)
    })
  }
  // 检查数据库连接并返回事务
  private getTransaction(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBTransaction {
    if (!this.db) {
      throw new Error('数据库未初始化，请先调用init()方法')
    }

    // 明确指定返回类型
    return this.db.transaction([storeName], mode)
  }
  // 获取所有单词
  async getAllWords(): Promise<WordData[]> {
    const transaction = this.getTransaction('words', 'readonly')
    const store = transaction.objectStore('words')

    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  async getFamiliarWords(): Promise<WordData[]> {
    const allWords = await this.getAllWords()
    return allWords.filter((word) => word.isFamiliar)
  }
  // 获取学习进度
  async getProgress(): Promise<string> {
    const allWords = await this.getAllWords()
    const learnedWords = allWords.filter((word) => word.isLearned)
    const totalWords = dictionary.words.length
    const progress = (learnedWords.length / totalWords) * 100
    return `${progress.toFixed(1)}%`
  }
  //记录学习
  async recordReview(id: number | string, quality: number) {
    // quality: 0-5的评分，5=完美回忆，4=犹豫后正确，3=困难但正确，2=错误但有印象，1=错误，0=完全不记得
    const word = await this.getById('words', id)
    if (word) {
      word.reviewCount = (word.reviewCount || 0) + 1

      // 初始化SM-2参数
      let easinessFactor = word.easinessFactor || 2.5
      let repetitions = word.repetitions || 0
      let interval = word.interval || 1

      // SM-2算法核心
      if (quality >= 3) {
        // 回答正确
        word.correctCount = (word.correctCount || 0) + 1

        if (repetitions === 0) {
          interval = 1
        } else if (repetitions === 1) {
          interval = 6
        } else {
          interval = Math.round(interval * easinessFactor)
        }
        repetitions += 1
      } else {
        // 回答错误，重置
        repetitions = 0
        interval = 1
      }

      // 更新难度系数 EF
      easinessFactor = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

      // EF最小值为1.3
      if (easinessFactor < 1.3) {
        easinessFactor = 1.3
      }

      // 保存更新后的数据
      word.easinessFactor = easinessFactor
      word.repetitions = repetitions
      word.interval = interval
      word.lastReviewDate = new Date().toISOString().split('T')[0]

      // 计算下次复习日期
      const nextDate = new Date()
      nextDate.setDate(nextDate.getDate() + interval)
      word.nextReviewDate = nextDate.toISOString().split('T')[0]
      await this.update('words', word)
    }
  }
  //获取今日需要复习的单词
  async getTodayReviewWords() {
    return new Promise((resolve, reject) => {
      const today = new Date().toISOString().split('T')[0] || 0
      const transaction = this.db!.transaction(['words'], 'readonly')
      const store = transaction.objectStore('words')
      const request = store.getAll()
      request.onsuccess = () => {
        const words = request.result.filter(
          (word: WordData) => word.nextReviewDate && word.nextReviewDate <= today
        )
        resolve(words)
      }
      request.onerror = () => reject(request.error)
    })
  }
}
export default new Database()
