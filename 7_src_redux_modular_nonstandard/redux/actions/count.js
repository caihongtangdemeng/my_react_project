//该文件是创建和count相关的action对象{type:'',data:value}

import {INCREMENT,DECREMENT}from '../action_types'
 export const increment =value=>({type:INCREMENT,data:value})
 export const decrement =value=>({type:DECREMENT,data:value})
 export const incrementAsync=(value,time)=>{
   return (dispatch)=>{
     setTimeout(() => {
       dispatch(increment(value))
     }, time);
   }
 }