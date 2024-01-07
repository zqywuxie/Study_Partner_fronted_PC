// 引入windi css
import '@/plugins/windi.css'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'

// 引入状态管理
import { setupStore } from '@/store'

// 全局组件
import { setupGlobCom } from '@/components'

// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入全局样式
import '@/styles/index.less'
import 'element-plus/dist/index.css'
// 引入动画
import '@/plugins/animate.css'

// 路由
import { setupRouter } from './router'

import { createApp } from 'vue'

import App from './App.vue'

import './permission'
import moment from "moment";
import momentCN from "./plugins/momentCN";

const setupAll = async () => {
  const app = createApp(App)
  moment.locale('zh-cn', momentCN);
  await setupI18n(app)

  setupStore(app)

  setupGlobCom(app)

  setupElementPlus(app)

  setupRouter(app)

  app.mount('#app')
}

setupAll()
