import { createRouter, createWebHistory } from 'vue-router'
import mainConsole from '@/pages/mainConsole.vue'
import Msg from '@/pages/myMsg.vue'
import Notice from '@/pages/myNotice.vue'
import Personal_Settings from '@/pages/Personal_Settings.vue'
import System_Settings from '@/pages/System_Settings.vue'
import User_Management from '@/pages/User_Management.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/console', component: mainConsole },
    { path: '/messages', component: Msg },
    { path: '/notice', component: Notice },
    { path: '/prs_set', component: Personal_Settings },
    { path: '/sys_set', component: System_Settings },
    { path: '/user_mag', component: User_Management }
  ]
})
export default router
