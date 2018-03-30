import $http from "./http.js";
import {COMPUTE_NUM} from "../store/action"
export function getCookie(name){
	let cookieStr = document.cookie;
	if(cookieStr.length == 0)return;
	let arr;
	let res=null;
	if(cookieStr.indexOf(";")>-1){
		arr = cookieStr.split("; ");
		arr.forEach((cookie,index)=>{
			let tmp_arr = cookie.split("=");
			if(tmp_arr[0]==name){
				res=tmp_arr[1]
			}
		})
	}else{
		let tmp_arr = cookieStr.split("=");
		if(tmp_arr[0]==name){
			res=tmp_arr[1]
		}
	}
	return res
}
export function loginOut(){
	let t = new Date();
	t.setTime(t.getTime()-1)
	document.cookie = "token="+getCookie('token')+'; expires='+t.toUTCString()
}

//计算
export function Compute(cookie,props){
	if(Object.prototype.toString.call(props)=="[object Object]"){
		if(cookie){
			$http.post("/compute",{token:getCookie("token")})
			.then(res=>{
				if(res.code_num==1){
					props.dispatch({
						type:COMPUTE_NUM,
						data:res.count
					})
				}else{
					props.dispatch({
						type:COMPUTE_NUM,
						data:0
					})
				}
			})
		}else{
			props.dispatch({
				type:COMPUTE_NUM,
				data:0
			})
		}
	}else{
		if(cookie){
			$http.post("/compute",{token:getCookie("token")})
			.then(res=>{
				if(res.code_num==1){
					props({
						type:COMPUTE_NUM,
						data:res.count
					})
				}else{
					props({
						type:COMPUTE_NUM,
						data:0
					})
				}
			})
		}else{
			props({
				type:COMPUTE_NUM,
				data:0
			})
		}
	}

}