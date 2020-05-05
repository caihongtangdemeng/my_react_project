import React,{Component} from 'react'
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import logo from '@/assets/images/logo.png'
import './css/left_nav.less'

const { SubMenu } = Menu;


export default class LeftNav extends Component{
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render(){
    return (
      <div className="left_nav">
        <div className="nav_top">
          <img src={logo} alt=""/>
          <span>商品管理系统</span>
        </div>
        
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}