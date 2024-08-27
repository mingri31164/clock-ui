<template>
  <div> 
    <el-page-header icon="" title="柳德堡的衣柜" style="padding: 10px;">
    <template #content>
      <span class="text-large font-600 mr-3"> 位置 </span>
    </template>
  </el-page-header>   
  <el-row :gutter="20" class="el-row">
    <el-col :span="16" :offset="1">
      <el-card class="box-card" >
            <div>
               
            <MyMap  :key="componentKey"/>
            </div> 
          </el-card>
    </el-col>

    <el-col :span="6">
      <el-card class="box-card" >
        <template #header>
          <div class="card-header"  style="text-align: center;">
            <span style="font-size: larger;">打卡信息</span>
            </div>
          </template>
            <div>
              <el-form
                ref="cardFormRef"
                style="max-width: 600px;padding: 100px 0;"
                :model="cardForm"
                :rules="cardFomRules"
                label-width="auto"
                class="demo-ruleForm"
                status-icon
                hide-required-asterisk="true"
              >
              

               
                <el-form-item 
                label="打卡地点:"
                 prop="position"
                 style="height: 100px;"
                 >
                 <el-tag :type="success" style="font-size: 20px;">{{store.state.userInfo.point }}</el-tag> 
                </el-form-item>

                <el-form-item>

                 <div id="but">
                  <el-button 
                   id="submit"
                    type="primary" 
                    @click="submitForm()"
                    
                   
                  > 打卡签到 </el-button>
                 </div>
                </el-form-item>

              </el-form>
            </div> 
          </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script setup>
import MyMap from '../components/map/MyMap.vue'
import { ref,reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const cardFormRef = ref()
const cardForm = reactive({
  place: store.state.userInfo.point,
  task:'',
  userid:store.state.userInfo.userid,
})
const componentKey = ref(0);  

//校验规则
const cardFomRules = reactive({
  // position: [
  //   { required: true, message: '请选择你的打卡地点', trigger: 'blur' },
  // ],
  // task: [
  //   { required: true, message: '请输入打卡任务', trigger: 'blur' },
  // ],
  
})



//更新提交
const submitForm = async() => {
  cardFormRef.value.validate(async (valid) => {
    
    if (valid) {
      await componentKey.value++; // 改变key的值，强制Vue重新渲染MyComponent  
      if (store.state.userInfo.isPoint) {
				//在范围内
        if(store.state.userInfo.isPoint === true){
          ElMessage.success('已到打卡地点')
          router.push('/setting')
        }		        
            } else {
              
				//不在范围内
				ElMessage.error(`不在范围内,距离你最近的打卡地点为${store.state.userInfo.point},请重新定位`)
         
            }

    } else {
      console.log('error submit!');
      return false;
    }
  });
};
</script>

<style scoped>
.box-card {
 
  height: 750px;
}
#submit{
  margin-top: 50px;
 
  width: 200px;
  height: 200px; 
  border-radius: 100%;
  font-size: 30px;

}
#but{
  width: 100%;
  margin-top: 50px;
 text-align: center;
}

:deep(.el-form-item__label){
  font-size: 20px;
  line-height: 100px;
}
</style>