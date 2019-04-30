import axios from 'axios';  

export function RegistUser(RegistUserModel){
const url = " /api/user/regist";

axios.post(url, RegistUserModel)
  .then(function (response) {
    console.log(response);
    //response.data
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