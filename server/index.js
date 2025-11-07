// server/index.js

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
const PORT = 3000
const SECRET_KEY = 'your-secret-key-change-this-in-production'

// 中间件
app.use(cors())
app.use(bodyParser.json())

// ============================================
// 模拟数据库
// ============================================
const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('123456', 10),
    email: 'admin@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    role: 'admin'
  },
  {
    id: 2,
    username: 'test',
    password: bcrypt.hashSync('123456', 10),
    email: 'test@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    role: 'user'
  }
]

// ============================================
// 登录接口
// ============================================
app.post('/user/login', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      code: 400,
      message: '用户名和密码不能为空',
      data: null
    })
  }

  const user = users.find((u) => u.username === username)

  if (!user) {
    return res.status(401).json({
      code: 401,
      message: '用户名或密码错误',
      data: null
    })
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password)

  if (!isPasswordValid) {
    return res.status(401).json({
      code: 401,
      message: '用户名或密码错误',
      data: null
    })
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' })

  res.json({
    code: 200,
    message: '登录成功',
    data: {
      token,
      userInfo: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    }
  })
})

// ============================================
// 获取用户信息接口
// ============================================
app.get('/user/info', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: '未登录',
      data: null
    })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    const user = users.find((u) => u.id === decoded.id)

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        data: null
      })
    }

    res.json({
      code: 200,
      message: '获取成功',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    })
  } catch (error) {
    console.log(error)

    res.status(401).json({
      code: 401,
      message: 'Token 无效或已过期',
      data: null
    })
  }
})

// ============================================
// 登出接口
// ============================================
app.post('/user/logout', (req, res) => {
  res.json({
    code: 200,
    message: '登出成功',
    data: null
  })
})

// ============================================
// 注册接口
// ============================================
app.post('/user/register', (req, res) => {
  const { username, password, email } = req.body

  if (!username || !password) {
    return res.status(400).json({
      code: 400,
      message: '用户名和密码不能为空',
      data: null
    })
  }

  const existingUser = users.find((u) => u.username === username)

  if (existingUser) {
    return res.status(409).json({
      code: 409,
      message: '用户名已存在',
      data: null
    })
  }

  const newUser = {
    id: users.length + 1,
    username,
    password: bcrypt.hashSync(password, 10),
    email: email || '',
    avatar: `https://avatars.githubusercontent.com/u/${users.length + 1}?v=4`
  }

  users.push(newUser)

  res.json({
    code: 200,
    message: '注册成功',
    data: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }
  })
})

// ============================================
// 测试接口
// ============================================
app.get('/user/test', (req, res) => {
  res.json({
    code: 200,
    message: '后端服务正常运行',
    data: {
      timestamp: new Date().toISOString(),
      users: users.map((u) => ({ id: u.id, username: u.username }))
    }
  })
})

// ============================================
// 启动服务器
// ============================================
app.listen(PORT, () => {
  console.log(`
  ========================================
  🚀 后端服务启动成功！
  ========================================
  服务地址: http://localhost:${PORT}
  测试接口: http://localhost:${PORT}/user/test

  测试账号:
  - 用户名: admin  密码: 123456
  - 用户名: test   密码: 123456
  ========================================
  `)
})
