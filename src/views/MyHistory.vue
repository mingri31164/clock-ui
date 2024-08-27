<template>
  <div> 
    <el-page-header icon="" title="柳德堡的衣柜" style="padding: 10px;">
    <template #content>
      <span class="text-large font-600 mr-3"> 历史数据 </span>
    </template>
  </el-page-header>   
  <el-row :gutter="20" class="el-row">
    <el-col :span="22" :offset="1">
      <el-card class="box-card" >
    
            <div style="height: 700px;">
              <el-tabs
               v-model="activeName" 
               class="demo-tabs" 
               @tab-click="handleClick"
               >
                <el-tab-pane label="日" name="first">
                <MyBing :data="bingForm.data"/>
  
                </el-tab-pane>
                <el-tab-pane label="周" name="second">
                  <MyXian :data="xianForm.data"/>
                </el-tab-pane>
                <el-tab-pane label="月" name="three">
                  <MyTiao :data="tiaoForm.data"/>
                </el-tab-pane>
              </el-tabs>
            </div>
            
             
          </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import MyBing from './state/MyBing.vue'
import MyTiao from './state/MyTiao.vue';
import MyXian from './state/MyXian.vue'
// import axios from 'axios';

const bingForm = ref({
  data: []
})

const xianForm = ref({
  data: []
})

const tiaoForm = ref({
  data: []
})

const activeName = ref('first');  
  
tiaoForm.value.data = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1]
xianForm.value.data = [820, 932, 901, 934, 1290, 1330, 1320]
bingForm.value.data = [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
                { value: 300, name: 'Vio Ads' }

              ]

onMounted(() => {  
   
//   axios.get()
//   .then(res => {

// }
// )



});  






</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>