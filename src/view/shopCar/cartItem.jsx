import React,{Component} from "react";
{/*工具*/}
import $http from "../../utils/http.js"
import {getCookie} from "../../utils/utils.js"
import {connect} from "react-redux"
import mapDispatchToprops from "./dispatch.js";
class cartItem extends Component{
	constructor(){
		super()
	}
	render(){
		let {item,updataCount,checkList} = this.props;
		let selectName = "cartList_left";
		return (
			<div className="cartList_cot">
				<div className={item.selectd?selectName+" selectOn":selectName+" selectOff"} onClick={()=>{checkList(1-item.selectd,item.goods_id)}}></div>
				<div className="cartList_img">
					<img src={"http://www.lb717.com//"+item.obj_data} />
				</div>
				<div className="cartList_right">
					<p>{item.goods_name}</p>
					<div className="nums">
						<dl>
							<p>x{item.count}</p>
							<p>
								<span>￥</span>
								<b>{item.discount_price}</b>
							</p>
						</dl>
						<b>
							<span onClick={()=>{updataCount(--item.count,item.goods_id)}}>-</span>
							<span>{item.count}</span>
							<span onClick={()=>{updataCount(++item.count,item.goods_id)}}>+</span>
						</b>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	let nums=0;
	state.cart_list.map((item,index)=>{
		if(item.selectd==true){
			nums+=item.count*item.discount_price
		}
	})
	return {
		selectd:state.check_list
	}
}
export default connect(mapStateToProps,mapDispatchToprops,null,{pure:false})(cartItem)