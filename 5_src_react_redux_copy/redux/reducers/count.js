import {INCREMENT,DECREMENT} from '../action_types'
let initState=0
export default function countRedecer(preState=initState,action) {
  const {type,data}=action
  let newState
  switch (type) {
    case INCREMENT:
      return newState=preState+data
    case DECREMENT:
      return newState=preState-data
    default:
      return preState;
  }
}