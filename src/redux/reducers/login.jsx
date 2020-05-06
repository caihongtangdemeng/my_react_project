import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'
//从Localstorage中读取user,token
let _user
try {
  _user=JSON.parse(localStorage.getItem('user'))
} catch (error) {
  _user=null
}
let _token=localStorage.getItem('token')

let initState={
  user:_user || {},
  token:_token || '',
  isLogin:_user&& _token ? true : false
}
//initstate 有两种情况：空 local中的数据
export default function (preState=initState,action) {
  let newState
  const {type,data}=action
  switch (type) {
    case SAVE_USERINFO:
      newState={...data,isLogin:true}
      return newState;

    case DELETE_USERINFO:
      newState={user:{},token:'',isLogin:false}
      return newState;
  
    default:
      return preState;
  }  
}