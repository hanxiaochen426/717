import React,{Component} from "react";
import myLess from "./my.less";
{/*工具*/}
import $http from "../../utils/http.js"
import {Compute} from "../../utils/utils.js"
{/*Redux*/}
import {connect} from "react-redux"

class My extends Component{
	constructor(){
		super()
		this.state={}
		this.toSetting = this.toSetting.bind(this);
		this.toGoodAdress = this.toGoodAdress.bind(this);
	}
	render(){
		return (
			<div id="mine">
				<div className="mine_tit">
					<i className="iconfont icon-shezhi" onClick={this.toSetting}></i>
					<h3>我的717商城</h3>
				</div>
				<div className="mine_picture">
					<div className="mine_img">
					</div>
					<p>71712431693</p>
				</div>
				<div className="mine_store">
					<p>
						<i className="iconfont icon-shop"></i>
						<span>我的店铺</span>
					</p>
					<p>></p>
				</div>
				<ul className="waiting_list">
					<li>
						<dl>
							<dt><i className="iconfont icon-unie64c"></i></dt>
							<dd>待付款</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt><i className="iconfont icon-icon-test"></i></dt>
							<dd>待发货</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt><i className="iconfont icon-daishouhuo"></i></dt>
							<dd>待收货</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt><i className="iconfont icon-tuikuanshouhou"></i></dt>
							<dd>售后</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt><i className="iconfont icon-weibiaoti104"></i></dt>
							<dd>我的订单<span className="iconfont icon-iconfontjiantou2"></span></dd>
						</dl>
					</li>
				</ul>
				<ol className="mine_func">
					<li>
						<dl>
							<dt><i className="iconfont icon-loufang01"></i></dt>
							<dd>我的社区</dd>
						</dl>
						<p><span className="iconfont icon-iconfontjiantou2"></span></p>
					</li>
					<li>
						<dl>
							<dt><i className="iconfont icon-zhanghuyue"></i></dt>
							<dd>账户余额</dd>
						</dl>
						<p><span className="iconfont icon-iconfontjiantou2"></span></p>
					</li>
					<li onClick={this.toGoodAdress}>
						<dl>
							<dt><i className="iconfont icon-4"></i></dt>
							<dd>地址管理</dd>
						</dl>
						<p><span className="iconfont icon-iconfontjiantou2"></span></p>
					</li>
				</ol>
			</div>
		)
	}
	toSetting(){
		this.props.history.push("/setting",{
			from: this.props.history.location.pathname
		})
	}
	toGoodAdress(){
		this.props.history.push("/goodAdress",{
			from: this.props.history.location.pathname
		})
	}
	componentDidMount(){
		Compute(document.cookie,this.props)
	}
}
function mapStateToProps(){
	return {}
}
export default  connect(mapStateToProps)(My)