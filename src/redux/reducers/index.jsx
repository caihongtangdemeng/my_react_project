import {combineReducers} from 'redux'
import loginReducer from './login'
import titleReducer from './title'
export default combineReducers({
  userInfo:loginReducer,
  title:titleReducer
})