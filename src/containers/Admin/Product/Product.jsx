import React,{Component} from 'react'
import { Card, Button, Select,Input,Table, message } from 'antd';
import {PlusCircleOutlined,SearchOutlined} from '@ant-design/icons';
import {reqProductList} from '@/api/index'
import { PAGE_SIZE } from '@/config';

const { Option } = Select;
export default class Product extends Component{
  state={
    productList:[],
    total:0,
    pageNum:0,
    searchType:'productName',
    keyword:'',
    isLoading:false
  }
  // changeStatus=(_id,status)=>{
  //   if(currentStatus===1) currentStatus=2
  //   else currentStatus=1

  // }
  getProductList=async(pageNumber=1)=>{
    this.setState({isLoading:true})
    let result=await reqProductList(pageNumber,PAGE_SIZE)
    const {status,data,msg}=result
    if(status===0){
      const {total,list,pageNum}=data
      console.log(data);
      this.setState({productList:list,total,pageNum,isLoading:false})
    }else{
      message.error(msg)
    }
  }
  componentDidMount(){
    this.getProductList()
  }
  render(){
    const {isLoading,total,pageNum}=this.state
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    const dataSource = this.state.productList ;
    
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        align:'center',
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render:(price)=>'￥'+price
      },
      {
        title: '状态',
        // dataIndex: 'status',
        align:'center',
        key: 'status',
        render:(productObj)=>{
          const {_id,status}=productObj
          return (
            <div>
              <Button 
                // onClick={()=>{this.changeStatus(_id,status)}} 
                type={status===1 ? 'danger':'primary'}>
                {status===1 ? '下架' : '上架'}
              </Button>
              <span>{status===1 ? '在售' : '售罄'}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        // dataIndex: 'price',
        key: 'action',
        align:'center',
        render:()=>(
          <div>
            <Button type="link">详情</Button><br/>
            <Button type="link">修改</Button>
          </div>
        )
      }
    ];
    return (
      <Card
         title={
           <div>
             <Select defaultValue="productName"  onChange={handleChange}>
               <Option value="productName">按名称搜索</Option>
               <Option value="productDesc">按描述搜索</Option>
             </Select>
             <Input  
                placeholder="请输入搜索关键字" 
                style={{margin:'10px',width:'20%'}}
             />
              <Button type="primary"><SearchOutlined /> 搜索</Button>
           </div>
         }
         extra={
         <Button type="primary" >
           <PlusCircleOutlined />添加商品
          </Button>
        }>
         <Table 
         dataSource={dataSource} 
         columns={columns}
         loading={isLoading}
         bordered
         rowKey="_id"
         pagination={{
           total,
           pageSize:PAGE_SIZE,
           current:pageNum,
           onChange:(pageNumber)=>{
             this.getProductList(pageNumber)
           }
         }}

         
         />
      </Card>
    )
  }
}