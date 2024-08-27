
// import MuM from "@/views/MuM.vue"
import MyHistory from "@/views/MyHistory.vue"
import MyPlace from "@/views/MyPlace.vue"
import MyRank from "@/views/MyRank.vue"
import MySet from "@/views/MySet.vue"
import CenterSet from "@/views/center/CenterSet.vue"
import MyCenter from "@/views/center/MyCenter.vue"
import MyHome from '@/views/home/MyHome.vue'
const routes = [
  {
    path: '/',
    redirect: '/index',
  
  },
  {
    path: '/index',
    name: 'home',
    component:MyHome
  },
  {
    path: '/center',
    name: 'center',
    component:MyCenter
  },
  {
    path: '/place',
    name: 'place',
    component:MyPlace
  },
  {
    path: '/rank',
    name: 'rank',
    component:MyRank
  },
  {
    path: '/history',
    name: 'history',
    component:MyHistory
  },
  {
    path: '/setting',
    name: 'MySet',
    component:MySet
  },
  {
    path: '/centerset',
    name: 'censet',
    component:CenterSet
  },
  // {
  //   path: '/mnb',
  //   name: 'mnb',
  //   component:MuM
  // },
]

export default routes