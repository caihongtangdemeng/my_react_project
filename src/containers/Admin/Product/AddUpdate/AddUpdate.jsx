import React,{Component} from 'react'
import { Card, Button,Form,Select,Input  } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {saveCategory} from '@/redux/actions/category'
import PictureWall from './PictureWall/PictureWall'

const {Item} = Form
const {Option}=Select
@connect(
  state=>({categoryList:state.categoryList}),
  {saveCategory}
)
class AddUpdate extends Component{
  render(){
    return (
        <Card title={
          <div>
            <Button type="link" onClick={this.props.history.goBack}>
              <ArrowLeftOutlined/>返回
            </Button>
            <span>添加商品</span>
          </div>
        } bordered={false} >
          <Form initialValues={{categoryId:''}} onFinish={this.onFinish}>
            <Item
              name="name"
              rule={[{required:true,message:'商品名称必须输入'}]}
              label="商品名称"
              wrapperCol={{span:6}}
            >
              <Input placeholder="商品名称"/>
            </Item>
            <Item
              name="desc"
              rule={[{required:true,message:'商品描述必须输入'}]}
              label="商品描述"
              wrapperCol={{span:6}}
            >
              <Input placeholder="商品描述"/>
            </Item>
            <Item
              name="price"
              rule={[{required:true,message:'商品价格必须输入'}]}
              label="商品价格"
              wrapperCol={{span:6}}
            >
              <Input 
                type="number"
                prefix="￥"
                addonAfter="元"
                placeholder="商品价格"
              />
            </Item>
            <Item
              name="categoryId"
              rule={[{required:true,message:'必须选择一个分类'}]}
              label="所属分类"
              wrapperCol={{span:6}}
            >
              <Select>
                <Option value="">请选择分类</Option>
                {this.props.categoryList.map((categoryObj)=>{
                  return <Option key={categoryObj.id}/>
                })}
              </Select>
            </Item>
            <Item
              label="商品图片"
              wrapperCol={{span:6}}
            >
              <PictureWall />
            </Item>
            <Item
              name="商品详情"
              wrapperCol={{span:6}}
            >
             此处放置富文本编辑器
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">提交</Button>
            </Item>
          </Form>
        </Card>
      
    )
  }
}
export default AddUpdate