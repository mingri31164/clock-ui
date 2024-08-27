<!-- 登录界面 -->
<template>
  <div>
  <vue-particles id="tsparticles" @particles-loaded="particlesLoaded"  class="bac"/>
    <vue-particles
            id="tsparticles"
           
            :options="options"
        />

     
    <div class="fromContainer">
      <h3>海澜之家</h3>
      <el-form
    ref="registerFormRef"
    style="max-width: 600px"
    :model="registerForm"
    status-icon
    :rules="registerRules"
    label-width="80px"
    class="loginform"

  >
 <!-- 用户名  -->
    <el-form-item 
        label="用户名" 
        prop="username"
      >
      <el-input 
      v-model="registerForm.username" 
      
      autocomplete="off" 
      />
    </el-form-item>

    <el-form-item 
      label="邮箱"
      prop="email"
      >
      <el-input 
      v-model="registerForm.email" 
      type="email" 
      autocomplete="off" 
      />
      
        <el-button type="primary" size="mini" @click="handleGet()">发送验证码</el-button>
      
    </el-form-item>

    <!-- 密码  -->
    <el-form-item 
      label="密码"
      prop="password"
      >
      <el-input 
      v-model="registerForm.password" 
      type="password" 
      autocomplete="off" 
      />
    </el-form-item>

    <!-- 验证码  -->
    <el-form-item 
      label="验证码"
      prop="emailcode"
      
      >
      <el-input 
      v-model="registerForm.emailcode" 
      type="password" 
      autocomplete="off" 
      />
    </el-form-item>

    
    <el-form-item style="margin-left: 30%;">
      <el-button 
        type="primary" 
        @click="submitForm(registerFormRef)"
      >
        注册
      </el-button>
      
    </el-form-item>
    <div class="zc" @click="handleLo()">返回登录</div>
  </el-form>
     </div>             
    
  </div>
</template>

<script setup>
import router from '@/router';
import { reactive,ref } from 'vue';
//连接服务器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import  options  from '@/util/options'
const code = ref("")



const registerForm = reactive({
  username:"",
  password:"",
  email:"",
  emailcode:""
})


const registerFormRef = ref() //表单的引用对象


//表单规则
const registerRules = reactive({
    username:[
      {
        required:true, message:"请输入用户名",trigger:"blur"
      }
    ],
    email:[
      {
        required:true, message:"请输入邮箱",trigger:"blur"
      }
    ],
    password:[
      {
        required:true, message:"请输入密码",trigger:"blur"
      }
    ],
    emailcode:[
      {
        required:true, message:"请输入验证码",trigger:"blur"
      }
    ]
})

const submitForm = () => {
    //1. 校验表单
    registerFormRef.value.validate((valid) => {
        if (valid) { //valid成功为true，失败为false
          let formData ={
            'username':registerForm.username,
            'email':registerForm.email,
            'password':registerForm.password,
            'emailcode': registerForm.emailcode
          }
         
          axios.post('http://116.205.189.126:8000/user/register',formData).then(res => { 
            console.log(formData)
            console.log(res)
          console.log(res.data,1) 
          if (res.data.code === 200) {  
            ElMessage.success('注册成功！');  
            router.push("/login");  
          } else {  
            ElMessage.error('注册失败！');  
          }  
        }).catch(error => {  
          console.error('Error', error);  
      
        if (error.response) {  
          const { status } = error.response;  
          if (status === 404) {  
            console.error('Not found');  
          } else if (status === 401) {  
            console.error('Unauthorized');  
          } else {  
            console.error('Error', status);  
          }  
        } else if (error.request) {  
          // 处理请求发送时的问题  
          console.error('No response received', error.request);  
        } else {  
          // 设置错误消息，可能是网络错误等  
          // console.error('Error', error.message);  
        }  
      });
       
      }
    })
   

}
const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};

const handleLo = () => {
  router.push("/login")
}

const handleGet = () => {
  axios.get('http://116.205.189.126:8000/public/getcode', {
    params: {
      email: registerForm.email
    }
  }).then(res => {
    console.log(res.data)
    code.value = res.data.data;
    ElMessage.success('验证码发送成功！');
  }).catch(error => {
    console.error('Error', error);
  });
}

</script>

<style  scoped>
.zc{
  position: relative;
  width: 100px;
  color: white;
  left: 400px;
  bottom: 0;
  cursor: pointer;

}
.zc:hover{
  color: rgb(156,220,254);
}
:deep(canvas){
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../assets/home.jpg");
}
/* 渲染表单 */
.fromContainer{
  width: 500px;
  height:400px ;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background: rgba(0, 0, 0, 0.5);
  color:white;
  text-align: center;
  padding: 20px;
  h3{
   font-size: 30px; 
  }
  .loginform{
    margin-top:20px ;
  }
}

/* 深度选择（组件） */
:deep(.el-form-item__label){
  color: white;
}
</style>