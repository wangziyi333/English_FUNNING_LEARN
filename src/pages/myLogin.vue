<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>系统登陆</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username"
          ><el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password"
          ><el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
          <el-button>重置</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts" setup name="myLogin">
import { ref, reactive } from 'vue'
import { login } from '../api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const loginFormRef = ref()
const loading = ref(false)
const router = useRouter()
const loginForm = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const handleLogin = async () => {
  try {
    await loginFormRef.value.validate()
    loading.value = true
    const res = await login(loginForm)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
    const role = res.data.userInfo.role
    if (role === 'admin') {
      router.push('/admin')
      ElMessage.success('欢迎管理员！')
    } else {
      router.push('/home')
      ElMessage.success('登录成功！')
    }
  } catch (error) {
    if (error instanceof Error) ElMessage.error(error.message)
    else ElMessage.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>
<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 400px;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}
</style>
