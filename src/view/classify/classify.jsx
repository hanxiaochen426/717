import React,{Component} from "react";
import {Link} from "react-router-dom"
{/*组件、样式*/}
import classifyCss from "./classify.css"
import Search from "../../components/search/search.jsx"
import Routers from "../../components/router.jsx"
{/*工具*/}
import {getCookie,Compute} from "../../utils/utils.js"
import $http from "../../utils/http.js"
{/*Redux*/}
import {connect} from "react-redux"
class Classify extends Component{
	constructor(){
		super()
		this.state={
			listId:0,
			num:"",
			listCot:""
		}
	}
	changeBg(index,id){
		this.setState({
			listId:index
		})
		$http.get("/categorySon",{id:id})
		.then(res=>{
			this.setState({
				listCot:res
			})
		})
	}
	toSeacrch(){
		this.props.history.push("/index/search",{
			from: this.props.location.pathname
		})
	}
	render(){
		let {Router} = this.props;
		let {listCot} = this.state;
		return (
			<div id="classify">
				<div className="search">
					<div className="search_ctr">
						<i className="iconfont icon-sousuo" style={{ fontSize:"17px" }}></i>
						<input type="text" placeholder="请输入您要搜索的商品"onFocus={()=>{this.toSeacrch()}} />
					</div>
				</div>
				<div className="classify_list">
					<div className="classify_list_left">
						<ul>
						{
							Router.map((item,index)=>{
								return <li key={index} className={this.state.listId==index?"bgli":""} onClick={()=>{this.changeBg(index,item.id)}}>{item.name}</li>
							})
						}
						</ul>
					</div>
					<div className="classify_list_right">
					{
						listCot&&listCot.classifyData.map((item,index)=>{
								return <Link to="/detail" key={index}>
									<dl>
										<dt><img src={item.imgSrc} /></dt>
										<dd>{item.name}</dd>
									</dl>
								</Link>
							})
					}
					</div>
				</div>
			</div>
		)
	}
	componentDidMount(){
		//分类
		$http.get("/categorySon",{id:"classify_1"})
		.then(res=>{
			this.setState({
				listCot:res
			})
		})
		Compute(document.cookie,this.props)
	}

}
function mapStateToProps(){
	return {}
}
export default  connect(mapStateToProps)(Classify)