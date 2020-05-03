/* 
	该文件是Count的UI组件
		1.UI的外侧应该包裹一个容器组件，他们是父子关系。
		2.UI组件中不能使用任何redux的api。
		3.会通过props接到容器组件传过来的：状态、操作状态的方法。
*/
import React,{Component} from 'react'
import store from '../../redux/store'
import {createIncrementAction,createDecrementAction}
from '../../redux/Count_action_creator'
export default class Count  extends Component{
  increment=()=>{
    const {value}=this.refs.user_selected
    store.dispatch(createIncrementAction(value*1))
  }
  decrement=()=>{
    const {value}=this.refs.user_selected
    store.dispatch(createDecrementAction(value*1))
  }
  incrementIfOdd=()=>{
    const {value}=this.refs.user_selected
    let  count =store.getState()
    if(count%2===1){
      store.dispatch(createIncrementAction(value*1))
    }
  }
  async_increment=()=>{
    const {value}=this.refs.user_selected
    setTimeout(() => {
      store.dispatch(createIncrementAction(value*1))
    }, 500);
  }
  render(){
    return (
      <div>
        <h2>总数是：{store.getState()}</h2>
        <select ref="user_selected">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
        <button onClick={this.incrementIfOdd}>incrementIfOdd</button>
        <button onClick={this.async_increment}>async_increment</button>
      </div>
    )
  }
}