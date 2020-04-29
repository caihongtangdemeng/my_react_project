
export default function countReducer(preState=0,action) {
  let newState
  const {type,data}=action
  switch (type) {
    case 'increment':
      return newState=preState+data;
    case 'decrement' :
      return newState=preState-data;
    default:
      return preState
  }
}