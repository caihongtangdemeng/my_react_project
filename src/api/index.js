//该文件用于管理项目的ajax请求，每个请求对应一个请求函数
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
import {CITY,WEATHER_AK} from '@/config/index'

export const reqLogin=(loginObj)=>ajax.post('/login',loginObj)
export const reqWeatherData=()=>{
  const URL=`http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`
  return new Promise((resolve)=>{
    jsonp(URL,{
      timeout:2000
    },(err,data)=>{
      if(!err){
        resolve(data.results[0].weather_data[0])
      }else{
        message.error('请求天气信息出错，请联系管理员')
      }
    })
  })
}
export const reqCategoryList=()=>ajax.get('/manage/category/list')