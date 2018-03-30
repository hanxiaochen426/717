let src = "";
if(process.env == "development"){
	src = "http://localhost:8081"
}

let $http={
	get(url,data){
		if(Object.prototype.toString.call(data)!="[object Object]"){
			return {
				then(callback){
					callback("GET请求入参格式不正确，需要传object")
					return {
						catch(err){
							err(new Error("入参格式不正确"))
						}
					}
				}
			}
		}
		let qureyString = "?";
		for(let i in data){
			qureyString+=(i+"="+data[i]+"&")
		}
		url = encodeURI(url+qureyString.slice(0,-1));
		return fetch(src+url,{
			"headers":{
				"Content-Type":"application/json;charset=utf-8",
			}
		}).then(res=>res.json())
	},
	post(url,data){
		if(Object.prototype.toString.call(data)!="[object Object]"){
			return {
				then(callback){
					callback("GET请求入参格式不正确，需要传object")
					return {
						catch(err){
							err(new Error("入参格式不正确"))
						}
					}
				}
			}
		}
		return fetch(src+url,{
			"body":JSON.stringify(data),
			"headers":{
				"Content-Type":"application/json;charset=utf-8",
			},
			"method":"POST"
		}).then(res=>res.json())
	}
}

export default $http