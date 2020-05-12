import React,{Component} from 'react'
import { Card, Button, Select,Input,Table, message } from 'antd';
import {PlusCircleOutlined,SearchOutlined} from '@ant-design/icons';
import {reqProductList,reqSearchProduct, reqUpdateProductStatus} from '@/api/index'
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
  //上架或下架
  changeStatus=async(_id,currentStatus)=>{
    if(currentStatus===1) currentStatus=2
    else currentStatus=1
    let result=await reqUpdateProductStatus(_id,currentStatus)
    const {status,msg}=result
    if(status===0){
      message.success(currentStatus===1? '上架成功': '下架成功')
      this.getProductList(this.state.pageNum)
    }else{
      message.error(msg)
    }
  }
  //请求商品数据（分页）
  getProductList=async(pageNumber=1)=>{
    this.setState({isLoading:true})
    let result
    if(this.isSearch){
      //搜索
      const {searchType,keyword}=this.state
      result=await reqSearchProduct(searchType,keyword,pageNumber,PAGE_SIZE)
    }else{
      //初始化
      result=await reqProductList(pageNumber,PAGE_SIZE)
    }
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
                onClick={()=>{this.changeStatus(_id,status)}} 
                type={status===1 ? 'danger':'primary'}>
                {status===1 ? '下架' : '上架'}
              </Button><br/>
              <span>{status===1 ? '在售' : '售罄'}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: 'action',
        align:'center',
        render:(id)=>(
          <div>
            <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${id}`)}}>详情</Button><br/>
            <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/update/${id}`)}}>修改</Button>
          </div>
        )
      }
    ];
    return (
      <Card
         title={
           <div>
             <Select 
                defaultValue="productName"  
                onChange={value=>this.setState({searchType:value})}>
               <Option value="productName">按名称搜索</Option>
               <Option value="productDesc">按描述搜索</Option>
             </Select> 
             <Input  
                placeholder="请输入搜索关键字" 
                style={{margin:'10px',width:'20%'}}
                onChange={event=>this.setState({keyword:event.target.value})}
             />
              <Button type="primary" 
                onClick={()=>{
                  this.isSearch=true
                  this.getProductList()}}>
                <SearchOutlined /> 搜索
              </Button>
           </div>
         }
         extra={
         <Button type="primary" onClick={()=>{this.props.history.push('/admin/prod_about/product/add')}}>
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