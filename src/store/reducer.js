import {combineReducers} from "redux"
import {COMPUTE_NUM,CART_LIST,UPDATA_COUNT,GET_ADDRESS,UPDATE_DEFAULTADDRESS,DEL_ADDRESS} from "./action.js"
import {CHECKED_LIST,CHECKED_ALL,UPDATA_CART_LIST,DELETE_CART_LIST} from "./action.js"
const initialState = {
   cart_list: [],
   address_list: []
}

//计算底部
function compute_num(state=initialState.cart_list,action){
	if(action.type==COMPUTE_NUM){
		return action.data
	}
	return state
}
//购物车列表

//updata_count 更新数量
function cart_list(state=initialState.cart_list,action){
	switch(action.type){
		case CART_LIST:
			let flag=false;
			state.forEach((item,index) => {
				if(item.goods_id == action.data.goods_id){
					++item.count;
					flag = true;
				}
			})
			return flag?[...state]:[...state,action.data]
			break;
		case UPDATA_CART_LIST:
		    return action.data
			break;
		case UPDATA_COUNT:
				let arr = [...state];
				arr.map((item,index)=>{
					if(item.goods_id == action.id){
						item.count = action.data
					}
				})
				return arr
			break;
		case CHECKED_LIST:
				let all = [...state];
				all.map((item,index)=>{
					if(item.goods_id == action.id){
						item.selectd = action.data
					}
				})
				return all
			break;
		case CHECKED_ALL:
				let all2 = [...state];
				let str = action.str;
				all2.map((item,index)=>{
					if(item.goods_id){
						item.selectd = str=="all"?0:1
					}
				})
				return all2
			break;
		default: return state
	}
	return state
}
function address_list(state=initialState.address_list,action){
	switch(action.type){
		case GET_ADDRESS:
			return action.data
			break;
		case UPDATE_DEFAULTADDRESS:
			let dafaultA = [...state];
			dafaultA.map((item,index)=>{
				if(item.id == action.id){
					item.default = true
				}else{
					item.default = false
				}
			})
			return dafaultA
			break;
		case DEL_ADDRESS:
		return action.data
			break;
		default: return state
	}
	return state
}
export default combineReducers({
	compute_num,
	cart_list,
	address_list
})