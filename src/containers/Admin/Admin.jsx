import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

 class Admin extends Component{
  render(){
    if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <div>
        <span>欢迎，</span>
      </div>
    )
  }
}
export default connect(
  state=>({
    isLogin:state.userInfo.isLogin
  }),
  {}
)(Admin)
