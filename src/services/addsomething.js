import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
// 读取 JSON 文件
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '../data/new.json')
function updateJsonFile(filePath) {
  try {
    // 读取文件
    const data = fs.readFileSync(filePath, 'utf8')
    const jsonData = JSON.parse(data)

    // 检查 words 数组是否存在
    if (jsonData.words && Array.isArray(jsonData.words)) {
      // 遍历 words 数组,给每个对象添加新属性
      jsonData.words.forEach((word) => {
        word.isLearned = false
      })
      // 将修改后的数据写回文件
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8')
      console.log('JSON 文件更新成功!')
    } else {
      console.log('错误: 未找到 words 数组')
    }
  } catch (error) {
    console.error('处理文件时出错:', error)
  }
}

// 使用示例
updateJsonFile(filePath)
