import React,{Component} from 'react'
import store from '../../redux/store'
export default class Count extends Component{

  increment=()=>{
    const {value}=this.refs.user_selected
    store.dispatch({type:'increment',data:value*1})
  }
  decrement=()=>{
    const {value}=this.refs.user_selected
    store.dispatch({type:'decrement',data:value*1})
  }
  incrementIfOdd=()=>{
    const {value}=this.refs.user_selected
   let count =store.getState()
   if(count%2===1){
     store.dispatch({type:'increment',data:value*1})
   }
    
  }
  incrementAsync=()=>{
    const {value}=this.refs.user_selected
   setTimeout(() => {
     store.dispatch({type:'increment',data:value*1})
   }, 600);
  }
  render(){
    return (
      <div>
        <h2>当前求和为：{store.getState()}</h2>
        <select ref="user_selected">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>incrementIfOdd</button>&nbsp;
        <button onClick={this.incrementAsync}>async increment</button>
      </div>
    )
  }
}