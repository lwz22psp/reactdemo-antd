import axios from 'axios';
import { message } from 'antd';
import cookie from 'react-cookies'
export function RegistUser(RegistUserModel) {
  const url = "/api/user/regist";

  axios.post(url, RegistUserModel)
    .then(function (response) {
      console.log(response);
      //response.data
      if (response.data.code == 200) {
        message.success('注册成功', 3);
        cookie.save("token", response.data.token);
      } else {
        //msg=response.data.msg;
        message.error(response.data.msg, 3)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const RegistUserModel = {
  userName: "",
  userPwd: "",
  phone: "",
  email: "",
  nickName: "",
  registCode: ""
}

export function UserLogin(UserLoginModel) {
  const url = "/api/user/login";

  axios.post(url, UserLoginModel)
    .then(function (response) {
      console.log(response);
      //response.data
      if (response.data.code == 200) {
        cookie.save("token", response.data.token);
        message.success('登陆成功', 3,location.href='/');
      } else {
        //msg=response.data.msg;
        message.error(response.data.msg, 3)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const UserLoginModel = {
  userName: "",
  userPwd: ""
}

export const UserModel = {
  userName: "",
  phone: "",
  email: "",
  nickName: "",
  userId: "",
  header:{
    token:""
  }
}
