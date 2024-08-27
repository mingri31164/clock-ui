
import axios from "axios";


axios.interceptors.request.use(function (config) {

  //取出token
  const token = localStorage.getItem("token");

  //使用了Bearer令牌类型进行认证
  config.headers.Authorization = `Bearer ${token}`;

  return config;
}, function (error) {
  return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
 
//登录成功后将token保存到本地
  console.log(response.headers);
  const { authorization } = response.headers;
  authorization && localStorage.setItem("token", authorization);
  return response;
}, function (error) {

  const { status } = error.response;
  if (status === 401) {
    //跳转到登录页面
    window.location.href = "/#/login";
  }
  return Promise.reject(error);
});