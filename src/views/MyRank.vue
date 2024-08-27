<template>
  <div> 
    <el-page-header icon="" title="柳德堡的衣柜" style="padding: 10px;">
    <template #content>
      <span class="text-large font-600 mr-3"> 排行榜 </span>
    </template>
  </el-page-header>   
  <el-row :gutter="20" class="el-row" style="margin-top:20px ;">
    <el-col :span="16" :offset="1" >
      <el-card class="box-card" >
        <template #header>
          <div class="card-header">
           <h1 style="text-align: center;">排行榜</h1>
            </div>
          </template>
            <div style="height: 600px;">
              <el-table :data="tableData" style="width: 100%">
                  <el-table-column label="排名" type="index" :index="indexMethod" width="100"/>
                  <el-table-column  label="头像" width="200" style="text-align: center;" ><el-avatar :size="50" :src="avatarUrl" /></el-table-column>
                  <el-table-column prop="username" label="昵称" width="180" />
                  
                  <el-table-column prop="min" label="今日活跃时长（分钟）" width="280"/>
                  <el-table-column prop="isOpen" label="当前状态" width="180"/>

              </el-table>
            </div>
            
          </el-card>
    </el-col>

    <el-col :span="6" >
      <el-card class="box-card" >
        <template #header>
          <div class="card-header">
           <h1 style="text-align: center;">当前信息</h1>
            </div>
          </template>
            <div style="height: 600px;">
              <div style="text-align: center; padding-top: 50px;">
            <el-avatar :size="150" :src="avatarUrl" />
            <h3>{{ store.state.userInfo.username }}</h3>
            <el-tag :type="success">{{ store.state.userInfo.roles[0]}}</el-tag>
            
              </div> 
              <div style="padding: 30px;font-size: 20px; text-align: center;">
                <div style="padding: 10px ;">排名：</div>
                <div style="padding: 10px ;">活跃时长：</div>

                <button class="bt" @click="handleOpen()">开始打卡</button>
              </div>
            </div>
            
             
          </el-card>
    </el-col>

  </el-row>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed,ref,onMounted } from 'vue'
import { useRouter } from 'vue-router';
// import axios from 'axios';
const router = useRouter();
const store = useStore()
const avatarUrl = computed(()=>{
  return store.state.userInfo.avatar ?
  store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`;
})
const tableData = ref([])

onMounted(()=>{
  //  axios.get()
  //  .then(res=>{
  //    console.log(res)
  //    if(res.data.code === 200){
  //      tableData.value = res.data.data
  //    }
  //  })
  //  .catch(err=>{
  //    console.log(err)
  //  })
   
})
const indexMethod = (index) => {
  return index +1
}



const handleOpen = () => {
  router.push("/place")
}
</script>

<style scoped>
.infinite-list {
  height: 600px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.bt{
  margin-top: 40px;
  font-size: larger;
  width: 200px;
  height: 80px; 
  text-align: center;
  line-height: 80px;
}
</style>