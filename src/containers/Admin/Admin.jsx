import React,{Component} from 'react'
import {connect} from 'react-redux'

 class Admin extends Component{
  render(){
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
// {this.props.userInfo.user.username}