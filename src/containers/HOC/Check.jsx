//该组件是一个高阶组件，用于根据登录状态，检查传递过来的组件，是否可以被看到。
/* 
	规则：
		1.如果没有登录，但是要看是非login，不允许。
		2.如果已经登录，但是要看的是login，不允许。
*/

// 高阶组件是特殊的 高阶函数，
// 接受一个组件，返回一个新组件，
// 特点是：扩展组件功能
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
export default function (ReciveComponent) {
  @connect(
    state=>({isLogin:state.userInfo.isLogin}),
    {}
  )
  class TargetComponent extends Component{
   render(){
      const {isLogin}=this.props
      const {pathname}=this.props.location
      if(!isLogin && pathname!=='/login') return <Redirect to="/login"/>
      if(isLogin && pathname==='/login') return <Redirect to="/admin"/>
     return <ReciveComponent {...this.props}/>
   }
 }
  return TargetComponent
}