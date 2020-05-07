import React,{Component} from 'react'
import { Card, Button,Table,Modal,Form,Input} from 'antd';
import {connect} from 'react-redux'
import { reqCategoryList } from '@/api';
import {saveCategory} from '@/redux/actions/category'

@connect(
  state=>({categoryList:state.categoryList}),
  {saveCategory}
)
class Category extends Component{
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = ()=> {
    this.setState({ visible: false});
  };

  handleCancel =() => {this.setState({visible: false});
  };
  // state={categoryList:[]} 数据存在自身
  getCategoryList=async()=>{
    let result =await reqCategoryList()
    // console.log(result);
    const {status,data}=result
    if(status===0){
      // this.setState({categoryList:data})
      this.props.saveCategory(data)
    }
  }
  componentDidMount(){
    this.getCategoryList()
  }
  render(){
    const {Item}=Form
    const dataSource = this.props.categoryList;
    
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
            <Button type="primary" onClick={this.showModal}>添加</Button>} 
        >
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            bordered
            rowKey="_id"
            pagination={{pageSize:4}} 
          />;
          <Modal
            title="新增分类"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
          >
            <Form>
              <Item
                name="category"
                rules={[
                  { required: true, message: '分类名必须输入' }
                ]}
              >
                <Input placeholder="请输入分类名"/>
              </Item>
            </Form>
          </Modal>
        </Card>
      </div>
    )
  }
}
export default Category