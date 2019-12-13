import axios from 'axios';
import { message } from 'antd';
import cookie from 'react-cookies'

function getToken(){
    return cookie.load("token");
}

function setToken(tokenValue){
    cookie.save("token", tokenValue);
}

export function axiosPost(url,data,callback){
    axios.post(url, data,{header:{"Authorization":getToken()}})
    .then(function (response) {
      console.log(response);
      //response.data
      if (response.data.code == 200) {

        if (callback && typeof callback === 'function'){
            callback(response.data);//返回response中的该条信息详细数据
        }
      } else {
        message.error(response.data.msg, 3)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}