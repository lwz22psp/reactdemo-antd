import axios from 'axios';  
import { message } from 'antd';

export function RegistUser(RegistUserModel){
const url = "/api/user/regist";

axios.post(url, RegistUserModel)
  .then(function (response) {
    console.log(response);
    //response.data
    if(response.data.code==200){
      message.success('注册成功',3);
    }else{
      //msg=response.data.msg;
      message.error(response.data.msg,3)
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const RegistUserModel ={
    userName:"",
    userPwd:"",
    phone:"",
    email:"",
    nickName:"",
    registCode:""
}