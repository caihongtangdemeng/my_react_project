import React,{Component} from 'react'
import {Card, Button,Table,Modal,Form,Input, message} from 'antd';
import {connect} from 'react-redux'
import {PlusCircleOutlined} from '@ant-design/icons'
import {reqCategoryList, reqAddCategory ,reqUpdataCategory} from '@/api';
import {saveCategory} from '@/redux/actions/category'
import {PAGE_SIZE, MESSAGE_TIME } from '@/config';


@connect(
  state=>({categoryList:state.categoryList}),
  {saveCategory}
)
class Category extends Component{
  state = { visible: false };

  showModal = (categoryObj) => {
    const {categoryForm}=this.refs
    this._id=''
    this.name=''
    this.isUpdate=false
    const {_id,name}=categoryObj
    if(_id&&name){
      this._id=_id
      this.name=name
      this.isUpdate=true
    }
    if(categoryForm) categoryForm.setFieldsValue({name:this.name})
    this.setState({visible: true,});
  };

  handleOk =async()=> {
    const {categoryForm}=this.refs
    const {name}=categoryForm.getFieldsValue()
    // console.log(name);
    if(!name || !name.trim()){
      message.error('分类名不能为空',MESSAGE_TIME)
    }else{
      let result
      if(this.isUpdate) result=await reqUpdataCategory(this._id,name)
      else result=await reqAddCategory(name)
      const {status,msg}=result
      if(status===0){
        message.success(this.isUpdate? '修改分类成功':'添加成功',MESSAGE_TIME)
        this.props.saveCategory()
        this.setState({ visible: false});
        categoryForm.resetFields()
      }else{
        message.error(msg,MESSAGE_TIME)
      }
    }

  };

  handleCancel =() => {
    const {categoryForm}=this.refs
    this.setState({visible: false});
    categoryForm.resetFields()
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
        render:(categoryObj)=>
                <Button 
                  onClick={()=>{this.showModal(categoryObj)}}
                  type="link">修改分类
                </Button>, //生成复杂数据的渲染函数
        width:'20%',
        align:'center',
        key: 'age',
      },
  
    ];
    return (
      <div>
        <Card  
          extra={
            <Button type="primary" onClick={this.showModal}>
              <PlusCircleOutlined />添加
            </Button>} 
        >
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            bordered
            rowKey="_id"
            pagination={{pageSize:PAGE_SIZE}} 
          />;
        </Card>
          <Modal
            title={this.isUpdate? '修改分类' : '新增分类'}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
          >
            <Form ref="categoryForm" initialValues={{name:this.name}}>
              <Item
                name="name"
                rules={[
                  { required: true, message: '分类名必须输入' }
                ]}
              >
                <Input placeholder="请输入分类名"/>
              </Item>
            </Form>
          </Modal>
      </div>
    )
  }
}
export default Category