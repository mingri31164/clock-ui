<!--顶部导航栏-->
<template>
  <el-header>
    <div class="left">
      <span style="margin-left: 10px;">海澜之家</span>
    </div>
    <div class="right">
      <span>欢迎 回来</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon :size="30" color="white">
              <User />
            </el-icon>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
              <el-dropdown-item @click="handleLogin">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
    </div>

  </el-header>
</template>

<script setup>
//使用vuex进行全局的数据交流
import {useStore} from 'vuex'
//引入的element组件要导入（头像等）
//导入路由
import { useRouter } from 'vue-router';
import {User } from '@element-plus/icons-vue'
const store = useStore()

const router = useRouter()
//路由跳转功能
//个人中心
const handleCenter = () =>{
router.push("/center")
}
//退出
const handleLogin = () =>{
localStorage.removeItem("token")
store.commit("clearUserInfo")
router.push("/login")
} 
/* 管理侧边栏是否折叠 */
// const handleCollapsed = ()=>{
// store.commit("changeCollapsed")
// } 
</script>

<style scoped>
.el-header{
background-color: #2d3a4b;
color: white;
width: 100%;
height: 60px;
line-height: 60px;
display: flex;
justify-content: space-between;
align-items: center;
}
.left,.right{
display: flex;
}

.left{
i{
  margin: auto ;
  cursor: pointer;
}
}
.right{
.el-dropdown{
  margin: auto;
}
}
</style>