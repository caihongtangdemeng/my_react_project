import {connect} from 'react-redux'
import {addPerson} from '../redux/actions/person'
import {v4 as uuidv4} from 'uuid'
import React,{Component} from 'react'
 class Person extends Component{
 add=()=>{
   const {nameNode,ageNode}=this.refs
   if(!nameNode.value||!ageNode.value){
     alert('输入内容不能为空')
     return 
   }
   this.props.addPerson({
     id:uuidv4(),
     name:nameNode.value,
     age:ageNode.value
   })
   nameNode.value=''
   ageNode.value=''
 }
 
  render(){
    const {persons,shu} =this.props
    return (
      <div>
        <h1>当前总人数是：{persons.length} ，上面组件总数是：{shu}</h1>
        <input ref="nameNode" type="text" placeholder="请输入名字"/> &nbsp;
        <input ref="ageNode" type="text" placeholder="请输入年龄"/> &nbsp;
        <button onClick={this.add}>添加</button>

        <ul>
          {
            persons.map((personObj)=>{
            return <li key={personObj.id}>姓名：{personObj.name},年龄：{personObj.age}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
export default connect(
    state=>({
      persons:state.persons,
      shu:state.number
    }),
  {addPerson}
)(Person)