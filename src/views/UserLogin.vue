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
    ref="loginFormRef"
    style="max-width: 600px"
    :model="loginForm"
    status-icon
    :rules="loginRules"
    label-width="80px"
    class="loginform"

  >
 <!-- 用户名  -->
    <el-form-item 
        label="用户名" 
        prop="username"
      >
      <el-input 
      v-model="loginForm.username" 
      
      autocomplete="off" 
      />
    </el-form-item>

    <!-- 密码  -->
    <el-form-item 
      label="密码"
      prop="password"
      >
      <el-input 
      v-model="loginForm.password" 
      type="password" 
      autocomplete="off" 
      />
    </el-form-item>

    <!-- 验证码  -->
    <el-form-item 
      label="验证码"
      prop="code"
      >
      <el-input 
      v-model="loginForm.code" 
      type="text" 
      tabindex="3"
       maxlength="5"
      autocomplete="off"
      style="width: 75%" 
      />
    </el-form-item>

    <div
              class="login-code"
              style="
                cursor: pointer;
                width: 30%;
                height: 48px;
                float: right;
                background-color: #f0f1f5;
              "
            >
              <img
                style="
                  height: 48px;
                  width: 100%;
                  border: 1px solid rgba(0, 0, 0, 0.1);
                  border-radius: 5px;
                "
                :src="codeUrl"
                @click="getCode"
              >
            </div>  

    <el-form-item style="margin-left: 30%;">
      <el-button 
        type="primary" 
        @click="submitForm(loginFormRef)"
      >
        登录
      </el-button>
      
    </el-form-item>
    <div class="zc" @click="handleRe()">立即注册</div>
  </el-form>
     </div>             
    
  </div>
</template>

<script setup>

import { reactive,ref,onMounted} from 'vue';
//连接服务器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';
import  options  from '@/util/options'
import {useRouter} from 'vue-router'

import { getCodeImg } from '@/util/login/login'

const router = useRouter()
const store = useStore()
const loginForm = reactive({
  username:"",
  password:"",
  code:"",
  uuid:""

})

const codeUrl = ref("")
const loginFormRef = ref() //表单的引用对象

onMounted(()=>{
  getCode()
})

const getCode = () =>{
  getCodeImg().then(res =>{
    console.log(res)
    codeUrl.value = res.data
    loginForm.uuid = res.id
  })
}

//表单规则
const loginRules = reactive({
    username:[
      {
        required:true, message:"请输入用户名",trigger:"blur"
      }
    ],
    password:[
      {
        required:true, message:"请输入密码",trigger:"blur"
      }
    ],
    code:[
      {
        required:true, message:"请输入验证码",trigger:"blur"
      }
    ]
})

const submitForm = () => {
    //1. 校验表单
    loginFormRef.value.validate((valid)=>{
      console.log(valid)
      
      if(valid){
        // console.log(loginForm)
       
        // 向后端服务器发送请求
        //跨域请求（使用代理）

        axios.post("http://116.205.189.126:8000/api/v1/login",loginForm
        )
        .then(res =>{
         console.log(res)
          if( res.data.code === 200){
            console.log(res.data,111)
            // store.commit("changeUserInfo",res.data.data)
            store.commit("changeUserInfo",{
              token:res.data.token,
              currentAuthority:res.data.currentAuthority
            })
            
            store.commit("changeGetterRouter",false)
            axios.get('http://116.205.189.126:8000/api/v1/getinfo', {
              params: {
                token:store.state.userInfo.token
              }
            }).then(res => {
              store.commit("changeUserInfo",res.data.data)
            }).catch(error => {
              console.error('Error', error);
            })
            router.push("/index")
       }
       else{
        ElMessage.error('用户名或密码错误！')
        getCode()
       }
        })
         .catch(error => {  
        
          console.error("Error fetching data:", error);  
        });
       
      }
    })
    //2.拿到表单内容，提交后台
    //3.设置tokn  localStorage.setItem("token","柳德堡")

}
const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};

const handleRe = () => {
  router.push("/register")
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
  height:300px ;
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