import {connect} from 'react-redux'
import {increment,decrement,incrementAsync} from '../redux/actions/count'

import React,{Component} from 'react'
 class Count extends Component{

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
export default connect(
  state=>({
    count:state.number,
    personCount:state.persons.length
  }),
  {increment,decrement,incrementAsync}
)(Count)
