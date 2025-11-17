import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
//引入pinia 实现组件通信
import { createPinia } from 'pinia'
// 引入 iconfont 样式文件
import './iconfont/iconfont.css'

//创建pinia
const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//使用pinia
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
