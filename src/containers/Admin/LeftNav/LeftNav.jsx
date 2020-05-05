import React,{Component} from 'react'
import { Menu, Button } from 'antd';
import logo from '@/assets/images/logo.png'
import './css/left_nav.less'
import menus from '@/config/menu_config'

const {Item,SubMenu } = Menu;


export default class LeftNav extends Component{
  //创建菜单函数
  createMenu=(menuArr)=>{
    return menuArr.map((menuObj)=>{
      if(!menuObj.children){
        return (
          <Item key={menuObj.key} icon={<menuObj.icon/>}>
            {menuObj.title}
          </Item>
        )
      }else{
        return (
          <SubMenu key={menuObj.key} icon={<menuObj.icon />} title={menuObj.title}>
            {this.createMenu(menuObj.children)}
          </SubMenu>
        )
      }
    })
  }
  render(){
    return (
      <div className="left_nav">
        <div className="nav_top">
          <img src={logo} alt=""/>
          <span>商品管理系统</span>
        </div>
        
        <Menu
          defaultSelectedKeys={['home']}
          defaultOpenKeys={[]}
          mode="inline"
          theme="dark"
        >
          {this.createMenu(menus)}
        </Menu>
      </div>
    )
  }
}