import React,{Component} from 'react'
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {saveUserInfo} from '@/redux/actions/login'
import './css/login.less'
import logo from './images/logo.png'
import { reqLogin } from '@/api/index';
import Check from '../HOC/Check';

@connect(
  state=>({isLogin:state.userInfo.isLogin}),
  {saveUserInfo}
)
@Check
 class Login extends Component{
  //校验成功后才能发请求
  onFinish =async values => {
    let result=await reqLogin(values)
    const {status,data,msg}=result //刚才这里单词写错了，是status，不是state
    if(status===0){
      message.success('登录成功',1)
      this.props.saveUserInfo(data)
     
    }else{
      message.error(msg)
    }
  };
  // 自定义校验 返回Promise
  pwdValidator=(_,value="")=>{
    let errMsgArr=[]
    if(!value.trim()) return Promise.reject('密码不能为空！')
    if(value.length<4||value.length>12) errMsgArr.push('密码长度必须大于等于4小于等于12！')
    if(!/^\w+$/.test(value)) errMsgArr.push('密码必须是字母数字下划线！')
    if(errMsgArr.length!==0) return Promise.reject(errMsgArr)
    else return Promise.resolve()
  }
  render(){
    if(this.props.isLogin) return <Redirect to="/admin"/>
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <span className="title">用户登录</span>
            <Form
              className="login-form"
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                //声明式校验
                rules={[
                  {required: true, message: '用户名不能为空!' },
                  {min:4,message:'用户名必须大于等于4位！'},
                  {max:12,message:'用户名必须小于等于12位！'},
                  {pattern:/^\w+$/ ,message:'用户名必须是字母数字下划线组成！'},
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{validator:this.pwdValidator }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
        </section>
      </div>
    )
  }
}

export default Login