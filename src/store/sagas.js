
import {takeEvery,takeLatest} from "redux-saga";
import {call,put} from "redux-saga/effects";

import {DEL_ADDRESS} from "./action.js"
import $http from "../utils/http.js"
import {getCookie} from "../utils/utils.js"
//每一个saga就是一个generator函数
function* deladdress(action){
	//使用call 去请求数据，call(fn,param) 即fn(param)
	try{
		let res = yield call($http.post,"/delAddress",{token: getCookie("token"),id: action.id})
		//saga代替dispatch来触发action的函数
		console.log(res.data)
		if(res.code_num==1){
			yield put({ 
				type: DEL_ADDRESS, 
				data:res.data
			})
		}
	}
	catch(err){
		yield put({
			type: "DEL_ADDRESS_ERR",
			data:err
		})
	}
}

// watcher
function* watchDeladdress(){
	yield takeEvery(["DEL_ADDRESS_LIST"],deladdress)
}
export default function* rootSaga(){
	yield [watchDeladdress()]
}