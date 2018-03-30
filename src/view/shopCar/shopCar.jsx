import React,{Component} from "react";
import {Link} from "react-router-dom";
import CartItem from "./cartItem.jsx"
{/*样式*/}
import carLess from "./shopCar.less"
{/*工具*/}
import $http from "../../utils/http.js"
import {Compute,getCookie} from "../../utils/utils.js"
{/*Redux*/}
import {connect} from "react-redux"
import {CHECKED_ALL} from "../../store/action.js"
import mapStateToProps from "./state.js"
import mapDispatchToprops from "./dispatch.js"
class Shopcar extends Component{
	constructor(){
		super()
		this.state={
			arr:"热门推荐",
			str:"none",
			titText:"编辑",
			botText:"结算"
		}
		this.changText = this.changText.bind(this);
		this.delAssett = this.delAssett.bind(this);
	}
	render(){
		let {checkAll, total,cartData} = this.props;
		return (
			<div id="shopCar">
				<div className="shopCar_tit">
					<h3>购物车</h3>
					<span onClick={this.changText}>{this.props.titText || this.state.titText}</span>
				</div>
				<div className="shopCar_cot">
					<div className="shopNull" style={{display:this.props.compute_num>0?"none":"block"}}>
						<img src="/src/static/image/shopNull.png" />
						<p>购物车为空</p>
						<Link className="goBtn" to="/index/home">去逛逛</Link>
					</div>
					<div className="cartList">
					{
						cartData.map((item,index)=>{
							return <CartItem item={item} key={index}></CartItem>
						})
					}
					</div>
				</div>
				<div className="shopCar_bot">
					<ul>
						<li>
							<span className={ total?"selectOn":""} onClick={()=>{
								this.setState({
									str:this.state.str=="all"?"none":"all"
								});
								checkAll(this.state.str)}}></span>
							<span>全选</span>
						</li>
						<li>
							<span>合计:</span>
							<span>￥</span>
							<b>{this.props.nums.toFixed(2)}</b>
						</li>
						<li>
							<p onClick={this.delAssett} ref="botBtn">{this.props.botText || this.state.botText}</p>
						</li>
					</ul>
				</div>
			</div>
		)
	}
	//改变文本
	changText(){
		this.setState({
			titText:this.state.titText == "编辑"?"完成":"编辑",
			botText:this.state.botText == "结算"?"删除":"结算"
		})
	}
	//删除
	delAssett(){
		if(this.refs.botBtn.innerText == "删除"){
			let daleteId = [];
			this.props.cartData.map((item,index)=>{
				if(item.selectd == 1){
					daleteId.push(item.goods_id)
				}
			})
			this.props.deleteGoods(daleteId)
		}
	}
	componentDidMount(){
		//更新购物车
		this.props.fetchCart()
	}
}

export default  connect(mapStateToProps,mapDispatchToprops)(Shopcar)