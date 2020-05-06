import React,{Component} from 'react'
import { Menu, Button } from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveTitle} from '@/redux/actions/title'
import logo from '@/assets/images/logo.png'
import './css/left_nav.less'
import menus from '@/config/menu_config'

const {Item,SubMenu } = Menu;
@connect(
  ()=>({}),
  {saveTitle}
)
@withRouter
 class LeftNav extends Component{
   save_Title=(title)=>{
     this.props.saveTitle(title)
   }
  //创建菜单函数
  createMenu=(menuArr)=>{
    return menuArr.map((menuObj)=>{
      if(!menuObj.children){
        return (
          <Item key={menuObj.key} onClick={()=>{this.save_Title(menuObj.title)}}>
            <Link to={menuObj.path}>
              <menuObj.icon/>
              {menuObj.title}
            </Link>
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
  //计算 title 解决刷新title丢失问题
  calculateTitle=()=>{
    const {pathname}=this.props.location
    let currentKey=pathname.split('/').slice(-1)[0]
    if(currentKey==='admin') currentKey='home'
    let title=''
    menus.forEach((menuObj)=>{
      if(menuObj.children instanceof Array){
        let result=menuObj.children.find((childObj)=>{
          return childObj.key===currentKey
        })
        if(result) title=result.title
      }else{
        if(menuObj.key===currentKey) title=menuObj.title
      }
    })
    this.props.saveTitle(title)
  }
  componentDidMount(){
    this.calculateTitle()
  }
  render(){
    const {pathname}=this.props.location
    const openedkey=pathname.split('/')
    const checkedkey=openedkey.slice(-1)
    // console.log(checkedkey);
    return (
      <div className="left_nav">
        <div className="nav_top">
          <img src={logo} alt=""/>
          <span>商品管理系统</span>
        </div>
        
        <Menu
          selectedKeys={checkedkey} //defaultSelectedKeys默认选中项（刷新才显示首页） selectedKeys 多次以最后一次为准 （登录后默认显示首页）
          defaultOpenKeys={openedkey} //默认展开项
          mode="inline"
          theme="dark"
        >
          {this.createMenu(menus)}
        </Menu>
      </div>
    )
  }
}
export default LeftNav