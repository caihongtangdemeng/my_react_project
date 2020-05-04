import {SAVE_USERINFO,DELETE_USERINFO} from '@/action_types'
let initState={
  user:_user || {},
  token:_token || '',
  isLogin:_user&& _token ? true : false
}
export default function (preState=initState,action) {
  let newState
  const {type,data}=action
  switch (type) {
    case SAVE_USERINFO:
      return newState={...data,isLogin:true}
     
  
    default:
      return preState;
  }  
}