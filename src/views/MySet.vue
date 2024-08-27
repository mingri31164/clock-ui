<template>
  <el-page-header icon="" title="柳德堡的衣柜" style="padding: 10px;">
    <template #content>
      <span class="text-large font-600 mr-3"> 设置 </span>
    </template>
  </el-page-header> 
  
  <el-row :gutter="20" class="el-row">
    
    <el-col :span="14" :offset="1">
      <el-card class="box-card" >
        <template #header>
          <div class="card-header">
            <span>首页</span>
            </div>
          </template>
            <div style="height: 600px;">

              <el-progress
               type="circle" 
               :percentage="value1" 
               :stroke-width="10"
               width="300"
               >
               <el-countdown 
                width="30"
                
                :format="'mm:ss'"
                :value="value"
                
                />
              </el-progress>
            
             

              <el-dialog v-model="centerDialogVisible" title="德宝哥哥提醒你" width="500" center>
                <span>
                 本次学习任务已经完成！
                </span>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">
                      确定
                    </el-button>
                  </div>
                </template>
              </el-dialog>
            
             
               

              <el-dialog v-model="Editbox" title="代办编辑" width="500" center>

                <el-form
                  ref="SetFormRef"
                  style="max-width: 600px"
                  :model="SetForm"
                  status-icon
                  :rules="SetRules"
                  label-width="auto"
                  class="loginform"

                >
              
                  <el-form-item 
                      label="学习任务" 
                      prop="task"
                    >
                    <el-input 
                    v-model="SetForm.task"    
                    autocomplete="off" 
                    />
                  </el-form-item>

               
                  <el-form-item 
                    label="学习时长"
                    prop="time"
                    >
                    
                    <el-input-number
                     v-model="SetForm.time" 
                     :min="1" 
                     :max="999" 
                      />
                  </el-form-item>

                  
                  <el-form-item>
                    <el-button
                     type="primary"
                      @click="submitForm(ruleFormRef)"
                      >
                      提交
                    </el-button>
                   
                  </el-form-item>
                  
                </el-form>


                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">
                      确定
                    </el-button>
                  </div>
                </template>
              </el-dialog>
            </div>
            
             
          </el-card>
    </el-col>

    <el-col :span="8" >
      <el-card class="box-card" >
        <template #header>
          <div class="card-header">
            <span>首页</span>
            </div>
          </template>
            <div style="height: 600px;">
            
              <ul
               v-infinite-scroll="load" 
               class="infinite-list" 
               style="overflow: auto"
               infinite-scroll-immediate:false
               >
                <li v-for=" i  in count" :key="i" class="infinite-list-item">
                 <!-- <span style="">{{ i.Name }}</span> -->
                 <div class="common-layout" style="width: 100%; height: 100%;">
                    <el-container>
                      <el-container>
                        <el-header style="padding: 10px;font-size: 20px;color:black">{{ i.name }}</el-header>
                        <el-main style="padding: 10px;">
                           
                          <el-button 
                                circle
                                :icon="Edit"
                                size="small" 
                                @click="handleEdit(i)"
                                :disabled="disabled"
                              ></el-button>
                              
                              <el-popconfirm title="你确定要删除吗?"
                              confirmButtonText="确定" 
                                cancelButtonText="取消"  
                              @confirm="handleDelete(i)"
                              
                              >
                                <template #reference>
                              <el-button 
                                circle
                                :icon="Delete"
                                size="small" 
                                type="danger"
                                :disabled="disabled"
                              ></el-button>
                            </template>
                            </el-popconfirm>

                        </el-main>
                      </el-container>
                      <el-aside >

                        
                        <el-button  
                         type="primary" 
                         round 
                         size="large"
                         style="width: 130px;
                         height: 50px;
                         margin-top: 20px;
                         margin-left: 130px;" 
                         @click="handleOpen(i)"
                         :disabled="disabled"
                         >开始</el-button>
                        
                      </el-aside>
                    </el-container>
                  </div>

              </li>
              </ul>
             
            </div>
            
               
          </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue'
import axios from 'axios'
import store from '@/store';
import { Edit,Delete} from '@element-plus/icons-vue'

const Editbox = ref(false)
const time = ref(0)
const value = ref(0)
const timing = ref()
const value1 = ref(100)
const centerDialogVisible = ref(false)
let timer = 0

const count = ref(0)
const load = () => {
  count.value += 2
}

//开始倒计时
const handleSart = (clock) => {
 if(timer){
  clearInterval(timer);
 }
   timer = setInterval(() => {  
  timing.value = timing.value - 1 
 value1.value = timing.value/(60 * time.value)*100
 console.log(timing.value)
 if(timing.value<=0){
  clearInterval(timer);
  centerDialogVisible.value = true
  axios.post('http://116.205.189.126:8000/clock/start',{
   clockid:clock
  })
 }
}, 1000);
}


const cardList = ref()
onMounted(()=>{
  getTableData()
})

const getTableData = async ()=>{
  const res = await axios.get("http://116.205.189.126:8000/todo/list",{
  params:{
    userid:store.state.userInfo.userId
  }})
  console.log(res)
  console.log(res.data.data)
  console.log(res.data.code === 200)
 if(res.data.code === 200){
  cardList.value = res.data.data
  count.value = res.data.data
  
 }
}

const SetFormRef = ref() //表单的引用对象

const SetForm = reactive({
  task:"",
  time:"",
  age:"",
})
//表单规则
const SetRules = reactive({
    task:[
      {
        required:true, message:"请创建学习任务",trigger:"blur"
      }
    ],
    // time:[
    //   {
    //     required:true, message:"请输入学习时长",trigger:"blur"
    //   }
    // ]
})


const submitForm = () => {
    //1. 校验表单
    SetFormRef.value.validate((valid)=>{
      console.log(valid)
      
      if(valid){
        console.log(SetForm)
        
      }

    })
}

const handleEdit = (row) => {
  console.log(row)
  SetForm.task = row.name
  SetForm.time = row.loop
  Editbox.value = true
}

const handleDelete = async(row) => {
  console.log(row)
  const m = JSON.parse(JSON.stringify(row))
  await axios.delete("http://116.205.189.126:8000/todo/delete",{
    params:{
      ids:m.Id,
      userid:store.state.userInfo.userId
    }
  })
  await getTableData()
}

const disabled = ref(false)
const handleOpen = (i) => {
console.log(i)
  const m = JSON.parse(JSON.stringify(i))
  console.log(m.Loop)

  time.value = Number(m.Loop)
  
  if(time.value>1&&time.value<=999){
    value.value = Date.now()+1000* 60 * time.value
   timing.value = 60 * time.value - 1
   handleSart(m.Id)
   disabled.value = true
   axios.post("http://116.205.189.126:8000/clock/start",{
    todoid:m.Id,
    userid:store.state.userInfo.userId,
    place:store.state.userInfo.point,
  }).then(res=>{
    console.log(res)
  })
}
}
</script>

<style scoped>
:deep(.card){
  height: 300px;
}

:deep(.el-statistic__number){
  font-size: 56px;
}

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
  height: 100px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
  box-shadow: 5px 0px 5px grey;
  border-radius: 10px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}


</style>