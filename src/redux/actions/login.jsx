import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'
export const saveUserInfo=userObj=>{
  //将用户登录信息保存到localstorage,key:value字符串形式
  const {user,token}=userObj
  localStorage.setItem('user',JSON.stringify(user))
  localStorage.setItem('token',token)
  
  return {type:SAVE_USERINFO,data:userObj}
}

export const deleteUserInfo=()=>{
  localStorage.clear()
  return {type:DELETE_USERINFO}
}