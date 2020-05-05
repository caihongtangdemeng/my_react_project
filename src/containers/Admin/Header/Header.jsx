import React,{Component} from 'react'
import { Button ,Modal} from 'antd';
import {	
  FullscreenOutlined,
	FullscreenExitOutlined,
  ExclamationCircleOutlined 
 } from '@ant-design/icons';
import screenfull from 'screenfull'
import './css/header.less'
import demo from './demo.jpg'
import { connect } from 'react-redux';
import {deleteUserInfo} from '@/redux/actions/login'

const { confirm } = Modal;
@connect(
  state=>({username:state.userInfo.user.username}),
  {deleteUserInfo}
)
 class Header extends Component{
  state={
    isFull:false
  }
  //退出登录
  logout=()=>{
    confirm({
      title: '确定退出登录吗？',
      icon: <ExclamationCircleOutlined />,
      content: '退出后需重新登陆',
      onOk:()=> {
        this.props.deleteUserInfo();
      },
      
    });
  }
  fullScreen=()=>{
    screenfull.toggle() //切换
  }
  componentDidMount(){
    screenfull.onchange(()=>{
      const {isFull}=this.state
      this.setState({isFull:!isFull})
    })
  }
  render(){
    const {username}=this.props
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.fullScreen}>
         { this.state.isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </Button>
    <span className="username">欢迎，{username}</span>
          <Button type="link" size="small" onClick={this.logout}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">
            <span>首页</span>
          </div>
          <div className="bottom-right">
            <span>2020年5月4日 00：00：00</span>
            <img src={demo} alt=""/>
            <span>多云转晴</span>
            <span>温度：0~20℃</span>
          </div>
        </div>
      </div>
    )
  }
}
export default Header