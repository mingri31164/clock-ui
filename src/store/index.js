import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";//持久化插件
import getters from './getters'
export default createStore({
  state:{
    isGetterRouter:false,
    isCollapsed:true,/*控制侧边栏能否折叠*/
    getters,
    userInfo:{
    
    }
  },
  getters:{

  },
  mutations:{
    changeGetterRouter(state,value){
      state.isGetterRouter = value
    },
    // changeCollapsed(state){
    //   state.isCollapsed = !state.isCollapsed
    // },
    changeUserInfo(state,value){
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state){
      state.userInfo = {}
    }

  },
  actions:{

  },
  modules:{

  },
  plugins: [createPersistedState({
    paths:["isCollapsed","userInfo"]//持久化
  })],
})