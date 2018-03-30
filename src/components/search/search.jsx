import React,{Component} from "react";
import searchCss from "./search.css"
class Search extends Component{
	constructor(){
		super()
		this.state={
			record:[]
		}
		this.toResult = this.toResult.bind(this);
		this.DelStroge = this.DelStroge.bind(this)
	}
	render(){
		return (
			<div id="search">
				<div className="search_top">
					<div className="search_inp">
						<i className="iconfont icon-sousuo" style={{ fontSize:"17px" }}></i>
						<input type="text" placeholder="请输入您要搜索的商品" ref="Inp"/>
					</div>
					<p onClick={this.toResult}>搜索</p>
				</div>
				<div className="record">
					<div className="record_top">
						<span>最近记录</span>
						<i className="iconfont icon-shanchu" onClick={this.DelStroge}></i>
					</div>
					<div className="record_content">
						{
							!this.state.record?<p className="not">暂无搜索记录...</p>:
							<ul className="record_list">
								{
									this.state.record.map((item,index)=>{
										return <li key={index}>{item}</li>
									})
								}
							</ul>
						}
					</div>
					<div className="record_top">
						<span>大家都在搜</span>
					</div>
					<div className="record_content">
						<ul className="record_list">
							<li>粽子</li>
							<li>锅巴</li>
							<li>酱</li>
							<li>小吃</li>
							<li>零食</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.setState({
			record:JSON.parse(localStorage.getItem("record_cot"))
		})
	}
	DelStroge(){
		localStorage.clear()
		this.setState({
			record:''
		})
	}
	toResult(){
		let InpValue = this.refs.Inp.value;
		if(InpValue){
			if(localStorage.getItem("record_cot")){
				let storageValue = JSON.parse(localStorage.getItem("record_cot"))
				if(storageValue.indexOf(InpValue)>-1)return;
				storageValue.push(InpValue)
				localStorage.setItem("record_cot",JSON.stringify(storageValue))
			}else{
				localStorage.setItem("record_cot",JSON.stringify([InpValue]))
			}
			this.props.history.push("/index/result",{
				from: this.props.location.pathname
			})
		}
	}
}
export default Search