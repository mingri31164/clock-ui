<!--个人中心-->
<template>
  <div >
    <el-page-header :icon="ArrowLeft" style="padding: 10px">
    <template #content>
      <span class="text-large font-600 mr-3"> 个人信息 </span>
    </template>
  </el-page-header>

  <el-row :gutter="20" class="el-row">
    <el-col :span="4">
       <el-card class="box-card">
            <el-avatar :size="100" :src="avatarUrl" />
            <h3>{{ store.state.userInfo.username }}</h3>
            <!-- <h5>{{ options2[store.state.userInfo.role]  }}</h5> -->
      </el-card> 
     
    </el-col>
    <el-col :span="20">
          <el-card class="box-card" >
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
            </div>
          </template>
              <el-form
                ref="userFormRef"
                style="max-width: 600px"
                :model="userForm"
                :rules="userFomRules"
                label-width="auto"
                class="demo-ruleForm"
                status-icon
              >
               
              <el-form-item 
                  label="头像"
                  prop="avatar"
                 >
                <UserUpload 
                :avatar="userForm.avatar"
                @change="handleChange"/>
                </el-form-item>

                <el-form-item 
                label="用户名"
                 prop="username"
                 >
                  <el-input v-model="userForm.username" />
                </el-form-item>

               
                <el-form-item 
                  label="性别"
                  prop="gender"
                 >
                   <el-select
                    v-model="userForm.gender"
                    placeholder="Select"
                    
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item 
                  label="组别"
                  prop="group"
                 >
                   <el-select
                    v-model="userForm.group"
                    placeholder="Select"
                    
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
               
                <el-form-item 
                label="个人简介"
                 prop="introduction"
                 >
                  <el-input v-model="userForm.introduction" 
                  type="textarea"
                  />
                </el-form-item>


                


                <el-form-item>
                  <el-button 
                    type="primary" 
                    @click="submitForm()"
                  > 更新 </el-button>
                </el-form-item>

              </el-form>
          </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script setup>
import { computed,ref,reactive } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import UserUpload from '@/components/upload/UserUpload.vue'
import upload from '../../util/upload'
  const store = useStore()
  const avatarUrl = computed(()=>{
  return store.state.userInfo.avatar ? 
  store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`;
})


const { username,gender,introduction,avatar,group } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  group,
  file:null
})
//校验规则
const userFomRules = reactive({
  username: [
    { required: true, message: '请输入你的名字', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' },
  ],
  group: [
    { required: true, message: '请选择组别', trigger: 'blur' },
  ],
})

//性别选择
const options = [
  {
    value: 1,
    label: '男',
  },
  {
    value: 2,
    label: '女',
  },
  {
    value: 0,
    label: '保密',
  },
]

//组别选择
const options1 = [
  {
    value: 1,
    label: 'Ai组',
  },
  {
    value: 2,
    label: '安卓组',
  },
  {
    value: 3,
    label: 'web组',
  },
  {
    value: 4 ,
    label: '游戏组',
  },
  {
    value: 5,
    label: '硬件',
  },
]

const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
  
}

//更新提交
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      
      const res = await upload("/adminapi/user/upload",userForm)
        if(res.ActionType === "OK"){
          store.commit('changeUserInfo',res.data)
          ElMessage.success('更新成功')
        }
      
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
</script>

<style scoped>
.el-row{
  margin-top: 20px;
  .box-card{
    text-align: center;
  }
}

</style>