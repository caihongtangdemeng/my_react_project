/* 
	该文件是专门用于创建和Count组件相关的action,
	即有两种action：
				1.加的action {type:'increment',data:???}
				2.减的action {type:'decrement',data:???}
*/
import {INCREMENT,DECREMENT}from './action_types'
export const createIncreatementAction=value=>({type:INCREMENT,data:value})
export const createDecreatementAction=value=>({type:DECREMENT,data:value})