import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// import '@/util/axios.config'

import Particles from '@tsparticles/vue3'; 
import { loadSlim } from '@tsparticles/slim';
//引入element plus   
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
.use(store)
.use(router)
.use(ElementPlus)

.use(Particles, {  
  init: async engine => {  
    await loadSlim(engine) },  
  })
.mount('#app')
