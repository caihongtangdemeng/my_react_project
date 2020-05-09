import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
import { Layout} from 'antd';
import Header from './Header/Header'
import LeftNav from './LeftNav/LeftNav'
import './css/admin.less'
import Check from '../HOC/Check';
import Category from './Category/Category';
import Product from './Product/Product';
import Home from './Home/Home'
import User from './User/User'
import Role from './Role/Role'
import Bar from './Bar/Bar'
import Line from './Line/Line'
import Pie from './Pie/Pie'

const { Footer, Sider, Content } = Layout;

@connect(
  state=>({isLogin:state.userInfo.isLogin}),
  {}
)
@Check
 class Admin extends Component{
  render(){
    if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
        <Layout className="admin-container">
          <Sider><LeftNav /></Sider>
          <Layout>
            <Header />
            <Content className="admin-content">
              <Switch>
                <Route path="/admin/home" component={Home}></Route>
                <Route path="/admin/prod_about/category" component={Category}></Route>
                <Route path="/admin/prod_about/product" component={Product}></Route>
                <Route path="/admin/user" component={User}></Route>
                <Route path="/admin/role" component={Role}></Route>
                <Route path="/admin/charts/bar" component={Bar}></Route>
                <Route path="/admin/charts/line" component={Line}></Route>
                <Route path="/admin/charts/pie" component={Pie}></Route>
                <Redirect to="/admin/home"/>
              </Switch>
            </Content>
            <Footer className="admin-footer">推荐使用谷歌浏览器，获取最佳用户体验</Footer>
          </Layout>
    </Layout>
     
    )
  }
}
export default Admin
