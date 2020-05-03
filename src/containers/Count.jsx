import Count from '../components/Count'
import {connect} from 'react-redux'
import {increment,decrement,incrementAsync} from '../redux/actions/count'

export default connect(
  state=>({count:state}),
  {increment,decrement,incrementAsync}
)(Count)
