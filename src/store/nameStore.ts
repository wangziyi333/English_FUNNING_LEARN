import { defineStore } from 'pinia'
export const useNameStore = defineStore('name', {
  actions: {},
  state() {
    return {
      mainConsole: '主控制台',
      messages: '我的消息',
      user_management: '用户管理',
      notice: '通知公告',
      prs_settings: '个人设置',
      sys_settings: '系统设置',
      Breadcrumbs: ['', ''],
      Control_Panel: '控制面板',
      sys_management: '系统管理',
      data_management: '数据管理'
    }
  },
  getters: {}
})
