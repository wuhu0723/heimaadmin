import Vue from 'vue'
import App from './App.vue'

import router from './router.js'

// 1.引入element-ui
import ElementUI from 'element-ui';
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'
// 3.全局注册组件
Vue.use(ElementUI);

// 设置为开发环境
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
