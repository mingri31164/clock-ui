<template>
  <div style="background-color: #545c64;">
    <el-aside :width="$store.state.isCollapsed?'64px':'200px'">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
        :collapse="$store.state.isCollapsed"
        :collapse-transition="false"
        :router="true"
        :default-active="router.fullPath"
      >
      <el-menu-item index="/index">
          <el-icon>
            <home-filled />
          </el-icon>
            <span>首页</span>
        </el-menu-item>

        <el-menu-item index="/center">
          <el-icon>
            <avatar/>
          </el-icon>
            <span>个人中心</span>
        </el-menu-item>

        <el-menu-item index="/place">
          <el-icon>
            <home-filled />
          </el-icon>
            <span>位置</span>
        </el-menu-item>

        <el-menu-item index="/rank">
          <el-icon>
            <avatar/>
          </el-icon>
            <span>排行榜</span>
        </el-menu-item>

        <el-menu-item index="/history">
          <el-icon>
            <home-filled />
          </el-icon>
            <span>历史数据</span>
        </el-menu-item>

        <el-menu-item index="/setting">
          <el-icon>
            <avatar/>
          </el-icon>
            <span>设置</span>
        </el-menu-item>
        
    </el-menu>
    </el-aside>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {HomeFilled,Avatar} from '@element-plus/icons-vue'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const qw = store.state.isCollapsed
console.log(qw)
// console.log(store.state.isCollapsed,111)
</script>

<style scoped>
.el-aside{
  height: 100%;
}
</style>