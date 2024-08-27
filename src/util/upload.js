//封装  文件上传
import axios from 'axios'
function upload(path,userForm){
  const params = new FormData()
  console.log(userForm);
  for(let key in userForm){
    
  if (userForm[key] !== undefined && userForm[key]  !== null) {  
       params.append(key,userForm[key])
    }
   
  }

  return axios.post(path,params,{
    headers:{
     "Content-Type":"multipart/form-data"
    }
  }).then(res=>res.data)
}

export default upload;