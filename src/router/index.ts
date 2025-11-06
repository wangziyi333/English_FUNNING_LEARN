import { createRouter, createWebHistory } from 'vue-router'
import mainConsole from '@/pages/admin/views/mainConsole.vue'
import Msg from '@/pages/admin/views/myMsg.vue'
import Notice from '@/pages/admin/views/myNotice.vue'
import Personal_Settings from '@/pages/admin/views/Personal_Settings.vue'
import System_Settings from '@/pages/admin/views/System_Settings.vue'
import User_Management from '@/pages/admin/views/User_Management.vue'
import MyLogin from '@/pages/myLogin.vue'
import Home from '@/pages/user/home.vue'
import MyAdmin from '@/pages/admin/my-admin.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/console', component: mainConsole, meta: { title: '控制中心' } },
    { path: '/', redirect: '/console' },
    { path: '/messages', component: Msg, meta: { title: '我的消息' } },
    { path: '/notice', component: Notice, meta: { title: '通知' } },
    { path: '/prs_set', component: Personal_Settings, meta: { title: '个人设置' } },
    { path: '/sys_set', component: System_Settings, meta: { title: '系统设置' } },
    { path: '/user_mag', component: User_Management, meta: { title: '用户管理' } },
    { path: '/login', component: MyLogin, meta: { title: '登录' } },
    {
      path: '/home',
      component: Home,
      meta: {
        title: '首页',
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      component: MyAdmin,
      meta: {
        title: '管理中心',
        requiresAuth: true,
        requiresAdmin: true
      }
    }
  ]
})
//路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
    return
  }
  if (to.meta.requiresAdmin) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    if (userInfo.role !== 'admin') {
      next('/home')
      return
    }
  }
  next()
})
export default router
