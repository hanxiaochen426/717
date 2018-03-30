import React,{Component} from "react"
import goodlistLess from "./goodlist.less"
import {Link} from "react-router-dom"
{/*工具*/}
import $http from "../../utils/http.js"
import {getCookie,Compute} from "../../utils/utils.js"
{/*Redux*/}
import {connect} from "react-redux"
import {CART_LIST} from "../../store/action.js";
{/*组件*/}
import Alert from "../../components/alert"
import LazyLoad from "react-lazyload"
class Placeholder extends Component{
	render(){
		return (
			<img src="/src/static/image/load.gif" />
		)
	}
}
class Goodlist extends Component{
	constructor(){
		super()
		this.toDetail = this.toDetail.bind(this)
	}
	render(){
		let {data} = this.props;
		return (
			<div id="good_list">
				<Alert from={this.props.history.location.pathname}   history={this.props.history} ref="alert"></Alert>
				{
					data.map((data1,index)=>{
						return 	<div className="good_cot" key={index}>
							<div className="good_cot_tit">
								<h3>{data1.title}</h3>
								<p>更多></p>
							</div>
							<div className="good_cot_ctr">
								{
									data1.children.map((item,idx)=>{
										return  <dl onClick={()=>{this.toDetail(item.goods_id)}} key={idx}>
											<dt><LazyLoad overflow placeholder={<Placeholder />} height={"100%"}  debounce={200}><img src={"http://www.lb717.com//"+item.obj_data} /></LazyLoad></dt>
											<dd>
												<p>{item.goods_name}</p>
												<p>
													<span>￥<label>{item.discount_price}</label></span>
													<i className="iconfont icon-gouwuche" onClick={(ev)=>{this.addCart(ev,item)}}></i>
												</p>
											</dd>
										</dl>
									})
								}
							</div>
						</div>
					})
				}
			</div>
		)
	}
	toDetail(goods_id){
		this.props.history.push("/detail?goods_id="+goods_id,{
			goods_id:goods_id
		})
	}
	addCart(ev,item){
		ev.stopPropagation();
		if(document.cookie){
			//添加购物车
			$http.post("/addCart",{
				info:item,
				token:getCookie("token")
			}).then(res=>{
				if(res.code_num==1){
					//提示框
					this.refs.alert.update(res)
					//添加购物车
					this.props.dispatch({
						type:CART_LIST,
						data:{
							...item,
							count:1,
							selectd:0
						}
					})
					//计算底部数量
					Compute(document.cookie,this.props)
				}
			})
		}else{
			//提示框
			this.refs.alert.update({
				code_info:"登录超时，请重新登录！",
				code_num:2
			})
		}
	}
}
function mapStateToProps(){
	return {}
}
export default  connect(mapStateToProps)(Goodlist)