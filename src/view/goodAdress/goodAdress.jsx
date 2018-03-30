import React,{Component} from "react";
import goodLess from "./goodAdress.less"
import Header from "../../components/header/header.jsx"
import {connect} from "react-redux"
import mapStateToProps from "./state.js"
import mapDispatchToProps from "./dispatch.js"
class GoodAdress extends Component{
	constructor(){
		super()
		this.toNewAdress = this.toNewAdress.bind(this);
		this.edit = this.edit.bind(this);
	}
	render(){
		let {address,updateDefault,delAddress} = this.props;
		return (
			<div id="goodAdress">
				<Header history={this.props.history}>收货地址</Header>
				<img src="/src/static/loading-svg/svg-loaders/spinning-circles.svg" style={{display:address?"none":"block"}}/>
			    <div className="total" style={{display:address.length<=0?"block":"none"}}>您还没有添加地址噢</div>
			    {
			    	address.map((item,ind)=>{
			    		return <div className="address" key={ind}>
			    			<ul>
			    				<li><h3 className="inline-block">{item.name}</h3><span>{item.phone}</span></li>
			    				<li><span>{item.province}</span><span>{item.city}</span><span>{item.county}</span><span>{item.detailAdress}</span></li>
			    			</ul>
			    			<div className="address_func">
			    				<label className="float-left" onClick={()=>{updateDefault(item.id)}}>
			    					<span className={item.default||address.length==1?"spanBtn active": "spanBtn"} ></span>
			    					<span>设为默认</span>
			    				</label>
			    				<label className="float-right">
			    					<p className="float-right">
			    						<span className="iconfont icon-edit"></span>
			    						<span onClick={()=>{this.edit(item)}}>编辑</span>
			    					</p>
			    					<p className="float-right">
			    						<span className="iconfont icon-shanchu"></span>
			    						<span onClick={()=>{delAddress(ind)}}>删除</span>
			    					</p>
			    				</label>
			    			</div>
			    		</div>
			    	})
			    }
				<p className="newAdress" onClick={this.toNewAdress}>+  新增加地址</p>
			</div>
		)
	}
	toNewAdress(){
		this.props.history.push("/newAdress",{
			from: this.props.location.pathname
		})
	}
	edit(item){
		this.props.history.push("/newAdress",{
			from: this.props.location.pathname,
			item:item
		})
	}
	componentDidMount(){
		this.props.fetchAddres()
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(GoodAdress)