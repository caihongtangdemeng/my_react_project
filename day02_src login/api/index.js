//该文件用于管理项目的ajax请求，每个请求对应一个请求函数
import ajax from './ajax'

export const reqLogin=(loginObj)=>ajax.post('/login',loginObj)