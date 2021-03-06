/* 
	该文件是对axios这个库的二次封装，完成：
		1.配置请求的基础路径
		2.配置超时时间
		3.统一处理post请求json编码问题（对象转为urlencoded）引入querystring
		4.统一返回真正的数据data，而不是response对象
		5.统一处理错误
*/
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