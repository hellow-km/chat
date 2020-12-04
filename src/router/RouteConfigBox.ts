import { RouteConfig } from 'vue-router'

class RouteConfigBox {
  public routes: RouteConfig[] = []
  constructor() {
    this.routes = [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register.vue')
      },
      {
        path: '/resetPassword',
        name: 'resetPassword',
        component: () => import('@/views/ResetPassword.vue')
      },
      {
        path: '/main',
        name: 'main',
        component: () => import('@/views/Main.vue')
      },
    ] as RouteConfig[]
    this.initialize()
  }

  public add(routes: RouteConfig): void {
    this.routes.push(routes)
  }

  public getRoutes(): RouteConfig[] {
    return this.routes
  }

  public initialize(): void {
    // const routeConfig: RouteConfig = {
    //   path: '/module',
    //   name: 'module',
    //   component: () => import('@/views/Main.vue'),
    //   children: [{
    //     path: 'findUser',
    //     name: 'findUser',
    //     component: () => import('@/views/find/FindUser.vue'),
    //   }, {
    //     path: 'findGroup',
    //     name: 'findGroup',
    //     //component: () => import('@/views/find/FindGroup.vue'),
    //   }, {
    //     path: 'notice',
    //     name: 'notice',
    //     component: () => import('@/views/notice/ApplyHandleNotice.vue')
    //   }]
    // }
    // this.add(routeConfig)
  }
}

export default new RouteConfigBox()