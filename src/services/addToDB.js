import fs from 'fs'
import db from '../utils/db.js'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url) //该文件的地址
const __dirname = path.dirname(__filename) //转化为绝对路径
console.log(__dirname)
const dictionaryPath = path.join(__dirname, '../data/dictionary_CET6.json')
console.log(dictionaryPath)
const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf-8')).words
await db.init()
for (let i = 0; i < dictionary.length; i++) {
  await db.saveWord(dictionary[i])
}
