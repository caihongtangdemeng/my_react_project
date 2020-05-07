import {combineReducers} from 'redux'
import loginReducer from './login'
import titleReducer from './title'
import categoryReducer from './category'
export default combineReducers({
  userInfo:loginReducer,
  title:titleReducer,
  categoryList:categoryReducer
})