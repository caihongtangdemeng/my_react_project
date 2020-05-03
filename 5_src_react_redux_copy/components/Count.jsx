import React,{Component} from 'react'

export default class Count extends Component{
  increment=()=>{
    const {value}=this.refs.user_selected
    this.props.increment(value*1)
  }
  decrement=()=>{
    const {value}=this.refs.user_selected
    this.props.decrement(value*1)
  }
  incrementIfOdd=()=>{
    const {value}=this.refs.user_selected
    const {count} =this.props
    if(count%2===1){
      this.props.increment(value*1)
    }
  }
  increment_async=()=>{
    const {value}=this.refs.user_selected
    setTimeout(() => {
      this.props.increment(value*1)
    }, 500);
  }
  render(){
    return (
      <div>
        <h1>总数是：{this.props.count}</h1>
        <select ref="user_selected">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
        <button onClick={this.incrementIfOdd}>incrementIfOdd</button>
        <button onClick={this.increment_async}>increment_async</button>
      </div>
    )
  }
}