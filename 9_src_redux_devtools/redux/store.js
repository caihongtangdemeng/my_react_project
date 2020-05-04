import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import allReducer from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))