import React,{Component} from "react";
import headerLess from "./header.less"
class Header extends Component{
	constructor(){
		super()
		this.goBack = this.goBack.bind(this);
		this.goHome = this.goHome.bind(this);
	}
	render(){
		return (
			<div id="header">
				<p onClick={this.goBack}><i className="iconfont icon-zuojiantou"></i></p>
				<p>{this.props.children}</p>
				<p onClick={this.goHome}><i className="iconfont icon-home"></i></p>
			</div>
		)
	}
	goBack(){
		if(this.props.children=="收货地址"){
			this.props.history.push("/index/my")
		}else{
			this.props.history.push(this.props.history.location.state.from)
		}
	}
	goHome(){
		console.log(1)
		this.props.history.push("/index/home")
	}
}
export default Header