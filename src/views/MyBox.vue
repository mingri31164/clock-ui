<template>
  <div class="common-layout">
    <el-container direction="vertical" >
      <MyHeader/>
      <el-container>
        <MyAside />
        <el-main style="min-width: 700px;">
          
            
              <keep-alive :include="['MySet']">
              <router-view></router-view>
              </keep-alive>
           

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import MyHeader from '@/components/home/MyHeader.vue'
import MyAside from '@/components/home/MyAside.vue'


</script>

<style scoped> 
.el-main{
  overflow: auto;
  height: calc(100vh - 60px);
  padding: 0;
}
</style>