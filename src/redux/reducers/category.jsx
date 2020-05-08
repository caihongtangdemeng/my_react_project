import {SAVE_CATEGORY} from '@/redux/action_types'
let initState=[]
export default function (preState=initState,action) {
  const {type,data}=action
  let newState
  switch (type) {
    case SAVE_CATEGORY:
      newState = [...data].reverse()
      return newState
    default:
      return preState
  }
  
}