import axios from 'axios'
import qs from 'querystring'
import {message as msg} from 'antd' 

axios.defaults.baseURL='http://localhost:3000'
axios.defaults.timeout=2000

axios.interceptors.request.use((config)=>{
  const {method,data}=config
  if(method.toLowerCase()==='post'&&data instanceof Object){
    config.data=qs.stringify(data)
  }
  return config
})

axios.interceptors.response.use(
  response=>{
    return response.data
  },
  err=>{
    let errMsg='未知错误 请联系管理员'
    const {message}=err
    if(message.indexOf('401')!==-1) errMsg='未登录或登录过期，请重新登录'
    else if(message.indexOf('Network Error')!==-1) errMsg='网络出错，请检查网络'
    else if(message.indexOf('timeout')!==-1) errMsg='网络不稳定，连接超时'
    //延时1s
    msg.error(errMsg, 1)
    return new Promise(()=>{})
  }
)



export default axios