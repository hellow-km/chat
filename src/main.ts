import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/icon/iconfont.css'

Vue.use(ElementUI);
//Vue.config.silent = true
Vue.config.productionTip = false
//Vue.config.devtools = false

Vue.filter('gender', function (v: string) {
  if (!v) return ''
  switch (v) {
    case "1":
      return "男";
    case "2":
      return "女";
    default:
      return "保密";
  }
})

Vue.prototype.$bus = new Vue()

//Vue.config.silent = true
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
