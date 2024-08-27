<template>
  <div> 
    <el-page-header icon="" title="柳德堡的衣柜" style="padding: 10px;">
    <template #content>
      <span class="text-large font-600 mr-3"> 首页 </span>
    </template>
  </el-page-header>   
  <el-row :gutter="20" class="el-row">
    <el-col :span="22" :offset="1">
      <el-card class="box-card" >
        <template #header>
          <div class="card-header">
            <span>首页</span>
            </div>
          </template>
            <div style="height: 600px;">
            <div class="time">
               <MyTime/>
            </div>
             <button class="bt" @click="handleOpen()">开始打卡</button>
            </div>
            
             
          </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
import MyTime from '../../components/time/MyTime.vue'

const router = useRouter();
const handleOpen = () => {
  router.push("/place")
}
</script>

<style scoped>
.time{
  width: 800px;
  height:300px ;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  /* background: rgba(0, 0, 0, 0.5); */
  color:white;
  text-align: center;
  padding: 20px;
}

.bt{
  font-size: larger;
  width: 300px;
  height: 80px; 
  text-align: center;
  line-height: 80px;
  position: relative;
  left: 40%;
  top: 80%;
  /* transform: translate(50%,50%); */
}
</style>