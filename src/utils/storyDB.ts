interface story {
  id: number
  words: string | Array<string>
  title: string
  story: string
  title_translation: string
  translation: string
}
class Database {
  db: IDBDatabase | null
  dbName: string
  version: number
  constructor() {
    this.db = null
    this.dbName = 'storyDB'
    this.version = 1
  }
  async init() {
    return new Promise((resolve, reject) => {
      indexedDB = window.indexedDB
      const request = indexedDB.open(this.dbName, this.version)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        console.log('数据库初始化成功')
        resolve(this.db)
      }
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains('storys')) {
          const objectStore = db.createObjectStore('storys', {
            keyPath: 'id'
          })
          objectStore.createIndex('id', 'id', { unique: true })
          console.log('storys表创建成功')
        }
      }
    })
  }
  async addStory(story: story) {
    const store = this.db!.transaction(['storys'], 'readwrite').objectStore('storys')
    return new Promise((resolve, reject) => {
      const request = store.add(story)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  async getStoryById(id: number): Promise<story | undefined> {
    const store = this.db!.transaction(['storys'], 'readonly').objectStore('storys')
    return new Promise((resolve, reject) => {
      const request = store.get(id)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  async getAllStorys(): Promise<story[]> {
    return new Promise((resolve, reject) => {
      const store = this.db!.transaction(['storys'], 'readonly').objectStore('storys')
      const list: story[] = []
      const request = store.openCursor(null, 'prev')
      request.onsuccess = () => {
        const cursor = request.result
        if (cursor) {
          list.push(cursor.value)
          cursor.continue()
        } else {
          console.log('故事获取完毕：')
          resolve(list)
        }
      }
      request.onerror = () => {
        console.log('获取全部故事失败：')
        reject(request.error)
      }
    })
  }
  async getStorysByPage(page: number, pageSize: number) {
    return new Promise((resolve, reject) => {
      const store = this.db!.transaction(['storys'], 'readonly').objectStore('storys')
      let counter = 0
      let advanced = true
      const list: story[] = []
      const request = store.openCursor()
      request.onsuccess = () => {
        const cursor = request.result
        if (page > 1 && advanced) {
          advanced = false
          const pages = (page - 1) * pageSize
          cursor!.advance(pages)
          return
        }
        if (cursor) {
          list.push(cursor.value)
          counter++
          if (counter < pageSize) cursor.continue()
          else {
            console.log(`成功获取第${page}页故事，共${list.length}条`)
            return resolve(list)
          }
        } else {
          console.log(`成功获取第${page}页故事，共${list.length}条`)
          return resolve(list)
        }
      }
      request.onerror = () => reject(request.error)
    })
  }
}
export default new Database()
