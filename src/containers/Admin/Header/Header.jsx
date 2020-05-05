import React,{Component} from 'react'
import { Button ,Modal} from 'antd';
import {	
  FullscreenOutlined,
	FullscreenExitOutlined,
  ExclamationCircleOutlined 
 } from '@ant-design/icons';
import screenfull from 'screenfull'
import dayjs from 'dayjs'
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
    isFull:false,
    time:dayjs().format('YYYY年MM月DD日 HH:mm:ss ')
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
    //检测屏幕变化
    screenfull.onchange(()=>{
      const {isFull}=this.state
      this.setState({isFull:!isFull})
    })
    //开启定时器
    this.timer=setInterval(()=>{
     this.setState({time:dayjs().format('YYYY年MM月DD日 HH:mm:ss ')}) 
    },1000)
  }
  componentWillUnmount(){
    //清除定时器
    clearInterval(this.timer)
  }
  render(){
    const {username}=this.props
    const {isFull,time}=this.state
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.fullScreen}>
         { isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </Button>
            <span className="username">欢迎，{username}</span>
          <Button type="link" size="small" onClick={this.logout}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">
            <span>首页</span>
          </div>
          <div className="bottom-right">
            <span>{time}</span>
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