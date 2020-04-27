import React,{Component} from 'react'
import {Button} from 'antd'

export default class App extends Component{
  render(){
    return (
      <div>
        <h2 style={{color:'pink'}}>App</h2>
        <Button type="primary">Button</Button>
      </div>
    )
  }
}