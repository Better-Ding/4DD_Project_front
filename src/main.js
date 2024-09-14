import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/index.scss' // global css
// import { download } from '@/utils/request'
Vue.use(Element);
// Vue.use(download)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
