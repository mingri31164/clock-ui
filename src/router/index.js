import { createRouter, createWebHashHistory } from 'vue-router'
import RoutesConfig from './config'
import store from '@/store'
import UserLogin from '@/views/UserLogin.vue'
import UserRegister from '@/views/UserRegister.vue'

import MyBox from '@/views/MyBox.vue'

  const routes = [
    {
      path: '/',
      redirect: '/login',
    
    },
    {
      path: '/box',
      name: 'box',
      component: MyBox,
    
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin,
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
    },
   
  ]
  const router = createRouter({
    history: createWebHashHistory(),
    routes// 路由规则  
  }) 

   router.beforeEach((to, from, next) => {
    // if (to.path === '/login' || to.path === '/register') {
    //   next()
    // } else {
    //   if (!localStorage.getItem("token")) {
    //     next({
    //       path:"/login"
    //     })
    //   } else {
        if(!store.state.isGetterRouter){

          //移除之前添加的路由
          router.removeRoute("box")
          ConfigRouter()
          next({
            path:to.fullPath
          })
        }else{
          next()
        }
    //   }
    // }
  })

  const ConfigRouter = () =>{
    if(!router.hasRoute("box")){
      router.addRoute({
        path:"/box",
        name:"box",
        component:MyBox
      })
    }
    RoutesConfig.forEach(item => {
    
      router.addRoute("box",item)
    })
    //改变isGetterRoute
    store.commit("changeGetterRouter",true)
  }
  
  export default router