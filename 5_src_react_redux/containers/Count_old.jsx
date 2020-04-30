import Count from '../components/Count'
import {connect} from 'react-redux'
import {increment,decrement} from '../redux/actions'

 function mapStateToProps(state) {
   return {count:state}
 }
 function mapDispatchToProps(dispatch) {
   return {
     increment:value =>{dispatch(increment(value))},
     decrement:value =>{dispatch(decrement(value))}
   }
 }
export default connect(mapStateToProps,mapDispatchToProps)(Count)