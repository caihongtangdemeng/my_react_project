import Count from '../components/Count'
import {connect} from 'react-redux'
import {increment,decrement} from '../redux/actions/count'
export default connect(
  //状态 操作状态
  state => ({count:state}),
  {increment,decrement})(Count)