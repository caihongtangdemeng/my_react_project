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
  
)



export default axios