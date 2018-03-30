import $http from "../../utils/http.js"
import {getCookie} from "../../utils/utils.js"
import {GET_ADDRESS,UPDATE_DEFAULTADDRESS,DEL_ADDRESS} from "../../store/action.js"
export default function mapDispatchToProps(dispatch){
    return {
    	fetchAddres(){
    		$http.post("/getAddress",{token: getCookie("token")})
    		.then(res=>{
    			if(res.code_num == 1){
    				dispatch({
    					type: GET_ADDRESS,
    					data: res.address
    				})
    			}
    		})
    	},
        updateDefault(id){
            dispatch({
                type: UPDATE_DEFAULTADDRESS,
                id: id
            })
        },
        delAddress(id){
            dispatch({
                type: "DEL_ADDRESS_LIST",
                id: id
            })
        }
    }
}