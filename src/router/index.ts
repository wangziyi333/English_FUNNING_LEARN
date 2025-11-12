import { createRouter, createWebHistory } from 'vue-router'
import mainConsole from '@/pages/admin/mainConsole.vue'
import admin_ from '@/pages/admin/admin_.vue'
import Msg from '@/pages/admin/myMsg.vue'
import Notice from '@/pages/admin/myNotice.vue'
import Personal_Settings from '@/pages/admin/Personal_Settings.vue'
import System_Settings from '@/pages/admin/System_Settings.vue'
import User_Management from '@/pages/admin/User_Management.vue'
// import MyLogin from '@/pages/myLogin.vue'
import User_Home from '@/pages/user/user_.vue'
import Memorize_ from '@/pages/user/views/memorize_.vue'
import Home_ from '@/pages/user/views/home_.vue'
import Reading_ from '@/pages/user/views/reading_.vue'
import Recite_ from '@/pages/user/views/recite_.vue'
import More_reading from '@/pages/user/views/more_reading.vue'
import Personal_center from '@/pages/user/views/personal_center.vue'
// import MyAdmin from '@/pages/admin/my-admin.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/pages/myLogin.vue'), meta: { title: '登录' } },
    // { path: '/', redirect: '/console' },
    //存在循环依赖问题，采用懒加载
    { path: '/login', component: () => import('@/pages/myLogin.vue'), meta: { title: '登录' } },
    {
      path: '/user',
      component: User_Home,
      meta: {
        title: '首页',
        requiresAuth: true
      },
      redirect: '/user/home',
      children: [
        { path: 'home', component: Home_, meta: { title: '首页' } },
        { path: 'memorize', component: Memorize_, meta: { title: '逻辑记忆' } },
        { path: 'reading', component: Reading_, meta: { title: '阅读' } },
        { path: 'recite', component: Recite_, meta: { title: '背诵' } },
        { path: 'more_reading', component: More_reading, meta: { title: '文章合集' } },
        { path: 'personal_center', component: Personal_center, meta: { title: '个人中心' } }
      ]
    },
    {
      path: '/admin',
      component: admin_,
      meta: {
        title: '管理中心',
        requiresAuth: true,
        requiresAdmin: true
      },
      children: [
        { path: 'console', component: mainConsole, meta: { title: '控制中心' } },
        { path: 'messages', component: Msg, meta: { title: '我的消息' } },
        { path: 'notice', component: Notice, meta: { title: '通知' } },
        { path: 'prs_set', component: Personal_Settings, meta: { title: '个人设置' } },
        { path: 'sys_set', component: System_Settings, meta: { title: '系统设置' } },
        { path: 'user_mag', component: User_Management, meta: { title: '用户管理' } }
      ]
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
