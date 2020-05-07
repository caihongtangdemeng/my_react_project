import React,{Component} from 'react'
import { Card, Button,Table } from 'antd';
import { reqCategoryList } from '@/api';

export default class Category extends Component{
  state={categoryList:[]}
  getCategoryList=async()=>{
    let result =await reqCategoryList()
    console.log(result);
    const {status,data}=result
    if(status===0){
      this.setState({categoryList:data})
    }
  }
  componentDidMount(){
    this.getCategoryList()
  }
  render(){
    const dataSource = this.state.categoryList;
    
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        render:()=><Button type="link">修改分类</Button>, //生成复杂数据的渲染函数
        width:'20%',
        align:'center',
        key: 'age',
      },
  
    ];
    return (
      <div>
        <Card  
          extra={
            <Button type="primary">添加</Button>} 
        >
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            bordered
            rowKey="_id"
            pagination={{pageSize:4}} 
          />;
        </Card>
      </div>
    )
  }
}