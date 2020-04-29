import React,{Component} from 'react'

export default class Count extends Component{
  state={
    count:0
  }
  increment=()=>{
    const {value}=this.refs.user_selected
    let {count}=this.state
    count += value*1
    this.setState({count})
  }
  decrement=()=>{
    const {value}=this.refs.user_selected
    let {count}=this.state
    count -= value*1
    this.setState({count})
  }
  incrementIfOdd=()=>{
    const {value}=this.refs.user_selected
    let {count}=this.state
    if(count%2===1){
      count += value*1
      this.setState({count})
    }
  }
  incrementAsync=()=>{
    const {value}=this.refs.user_selected
    let {count}=this.state
    count += value*1
    setTimeout(() => {
      this.setState({count})
    }, 600);
  }
  render(){
    return (
      <div>
        <h2>当前求和为：{this.state.count}</h2>
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