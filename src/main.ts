import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './iconfont/iconfont.css' // 引入 iconfont 样式文件

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
