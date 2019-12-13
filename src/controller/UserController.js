import {axiosPost} from "../utils/axiosUtil"
import { message } from 'antd';
import cookie from 'react-cookies'
export function RegistUser(RegistUserModel) {
  const url = "/api/user/regist";

  axiosPost(url, RegistUserModel, (data) => {
    cookie.save("token", data.token);
    message.success('注册成功', 3, location.href = '/application');
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
  axiosPost(url, UserLoginModel, (data) => {
    cookie.save("token", data.token);
    message.success('登陆成功', 3, location.href = '/application');
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
  header: {
    token: ""
  }
}
