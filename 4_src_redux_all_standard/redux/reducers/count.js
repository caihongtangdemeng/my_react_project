import {INCREMENT,DECREMENT}from '../action_types'

export default function countReducer(preState=0,action) {
  const {type,data}=action
  
  let newState
  switch (type) {
    case INCREMENT:
      return newState=preState+data;
    case DECREMENT:
      return newState=preState-data;
    default:
      return preState
  }
}