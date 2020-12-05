import Vue from 'vue'
import VueRouter, { RouteConfig, RouterOptions } from 'vue-router'
import RouteConfigBox from './RouteConfigBox'
import Auth from '@/app/common/auth/Auth';
import { Dictionary } from 'vue-router/types/router';
import Prompt from '@/components/common/Prompt';
Vue.use(VueRouter)

const options: RouterOptions = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: RouteConfigBox.getRoutes()
}

const router = new VueRouter(options)
const whiteList = ['login', 'register', 'resetPassword']

router.beforeEach((to, from, next) => {
  //const isLogin=Auth.isLogin()
  const isLogin = true
  const token = Auth.getToken()
  const name: string = to.name || ''
  const isWhiteList = whiteList.includes(name)
  if (!isWhiteList) {
    const data: Dictionary<string> = { to: to.name + '', from: from.name + '' };
    const route = { name: 'login', params: data };
    if (isLogin) {
      if (token) {
        next()
      } else {
        // Prompt.notice('没有权限', '警告', 'warn')
        // next(route);
        next()
      }
    } else {
      next(route);
    }
  } else {
    next()
  }
})
export default router
