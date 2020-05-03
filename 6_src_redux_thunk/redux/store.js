import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import countReducer from './reducers/count'
export default createStore(countReducer,applyMiddleware(thunk))