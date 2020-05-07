import React,{Component} from 'react'
import { Card, Button,Table } from 'antd';

export default class Category extends Component{
  render(){
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
      },
     
    ];
    
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
            pagination={{pageSize:4}} 
            dataSource={dataSource} 
            columns={columns} 
            bordered
          />;
        </Card>
      </div>
    )
  }
}