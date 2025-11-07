import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
// 实例axios
const service = axios.create({
  baseURL: import.meta.env.BITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000
})
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    console.error('请求错误', error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      if (res.code === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        router.push('/login')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  (error) => {
    console.error('响应错误', error)
    let message = '请求失败'
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录'
          localStorage.clear()
          router.push('/login')
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求地址不存在'
          break
        case 500:
          message = '服务器错误'
          break
        default:
          message = error.response.data.message || '请求失败'
      }
    } else if (error.request) {
      message = '网络错误，请检查网络连接'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  }
)
export default service
