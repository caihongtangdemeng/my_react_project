/* 
	该文件是Count的UI组件
		1.UI的外侧应该包裹一个容器组件，他们是父子关系。
		2.UI组件中不能使用任何redux的api。
		3.会通过props接到容器组件传过来的：状态、操作状态的方法。
*/
import React,{Component} from 'react'
export default class Count extends Component{

  increment = ()=>{
    const {value}=this.refs.user_selected
    this.props.increment(value*1)
  }
  decrement = ()=>{
    const {value}=this.refs.user_selected
    this.props.decrement(value*1)
  }
  incrementIfOdd = ()=>{
    const {value}=this.refs.user_selected
    const {count} =this.props
   if(count%2===1){
    this.props.increment(value*1)
   }
    
  }
  incrementAsync = ()=>{
    const {value}=this.refs.user_selected
     this.props.incrementAsync(value*1,500)
  
  }
  render(){
    const {count,personCount}=this.props
    return (
      <div>
        <h2>当前求和为:{count},下面组件的总人数是:{personCount}</h2>
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