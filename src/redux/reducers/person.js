import {ADD_PERSON} from '../action_types'
let initState=[
  {id:'001',name:'小红',age:12},
  {id:'002',name:'小蓝',age:13}
]
export default function addPerson(preState=initState,action) {
  let {type,data}=action
  let newState
  switch (type) {
    case ADD_PERSON:
      return newState=[data,...preState]
    default:
      return preState;
  }
}