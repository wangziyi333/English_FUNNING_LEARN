import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
const __filename = fileURLToPath(import.meta.url) //该文件的地址
const __dirname = path.dirname(__filename) //转化为绝对路径
const apiKey = process.env.DEEPSEEK_API_KEY
if (!apiKey) {
  console.error('api调取失败')
  exit(1)
} else console.log('apiKey存在')

const openai = new OpenAI({
  apiKey,
  timeout: 60000,
  baseURL: 'https://api.deepseek.com',
  maxRetiries: 3
})
if (!openai) console.log('openai不存在')
else console.log('openai存在')

//读取词典
const dictionaryPath = path.join(__dirname, '../src/data/dictionary_CET6.json')
const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf-8'))
console.log(`词典加载成功！共${dictionary.length}个单词`)
console.log('数据格式示例：', JSON.stringify(dictionary[0], null, 2))

async function generate(word, translation) {
  try {
    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content:
            '你是英语教学助手。把抽象的、无意义的单词，变成生动的、有逻辑的图像和故事，生成一句话的单词记忆逻辑。'
        },
        {
          role: 'user',
          content: `为单词 "${word}" (${translation}) 生成一个记忆逻辑，格式：\n记忆逻辑`
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    })
    const content = response.choices[0].message.content.trim()
    console.log('成功')

    return content || '记忆逻辑生成失败'
  } catch (error) {
    console.log(error.message, `生成"${word}"的记忆逻辑失败`)
    return '记忆逻辑生成失败'
  }
}
async function generateAll() {
  console.log('开始生成...')
  const words = []
  const faild = []
  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i].word
    const translation = dictionary[i].translation
    const soundmark = dictionary[i].soundmark
    const id = dictionary[i].id
    console.log(`[${i + 1}/${dictionary.length}]正在生成...`)
    console.log(`\n[${i + 1}/${dictionary.length}]"${word}"${soundmark}`)
    console.log(`释义：${translation}`)

    const memoryTip = await generate(word, translation)
    if (memoryTip.includes('失败')) {
      faild.push({ word, translation })
    }
    words.push({
      id,
      word,
      translation,
      soundmark,
      memoryTip
    })
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
  const outputPath = path.join(__dirname, '../src/data/dictionary_CET6_new.json')
  fs.writeFileSync(outputPath, JSON.stringify({ words }, null, 2), 'utf-8')
  console.log(`\n 所有例句生成完毕！`)
  console.log(`成功：${words.length - faild.length}个`)
  console.log(`失败：${faild.length}个`)
  console.log(`已保存到：${outputPath}`)
  if (faild.length > 0) {
    console.log(`\n失败列表：`)
    faild.forEach((item) => console.log(`    -  ${item.word}`))
  }
}

generateAll().catch((error) => {
  console.error(`\n 错误！：`, error)
  process.exit(1)
})
