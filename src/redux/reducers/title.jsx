import {SAVE_TITLE} from '@/redux/action_types'
const initTitle=''
export default function (preState=initTitle,action) {
  let newState
  const {type,data}=action
  switch (type) {
    case SAVE_TITLE:
      newState=data
      return newState
    default:
      return preState;
  }
}