import React,{Component} from "react";
import {BrowserRouter,NavLink,Link,Route,Switch,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import index from "./index.css"
import Routers from "../../components/router.jsx"
import $http from "../../utils/http.js"
import {getCookie,Compute} from "../../utils/utils.js"
import Count from "./count.jsx"
class Index extends Component{
	constructor(){
		super()
		this.state={
			countz:0
		}
	}
	render(){
		let {Router,compute_num} = this.props
		return (
			<div id="index">
				<div className="footerList">
					<NavLink  to="/index/home" activeClassName="active">
							<dl >
								<dt><i className="iconfont icon-shouye"></i></dt>
								<dd>首页</dd>
							</dl>
					</NavLink>
					<NavLink  to="/index/classify" activeClassName="active">
							<dl >
								<dt><i className="iconfont icon-fenlei"></i></dt>
								<dd>分类</dd>
							</dl>
					</NavLink>
					<NavLink  to="/index/community" activeClassName="active">
							<dl >
								<dt><i className="iconfont icon-shequ"></i></dt>
								<dd>社区</dd>
							</dl>
					</NavLink>
					<NavLink  to="/index/shopcar"activeClassName="active">
							<Count>{this.state.countz}</Count>
							<dl >
								<dt><i className="iconfont icon-gouwuche"></i></dt>
								<dd>购物车</dd>
							</dl>
					</NavLink>
					<NavLink  to="/index/my" activeClassName="active">
							<dl >
								<dt><i className="iconfont icon-wode"></i></dt>
								<dd>我的</dd>
							</dl>
					</NavLink>
				</div>
				<Routers Router={Router}></Routers>
			</div>
		)
	}
	componentWillReceiveProps(prevProps,nextState){
		this.setState({
			countz:prevProps.compute_num
		})
	}
	componentDidMount(){
		Compute(document.cookie,this.props)
	}
}
function mapStateToProps(state){
	return {
		compute_num:state.compute_num
	}
}
export default connect(mapStateToProps)(Index)