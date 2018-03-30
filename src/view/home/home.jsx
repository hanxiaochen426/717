import React,{Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import homeCs from "./home.css"
import $http from "../../utils/http.js"
import Search from "../../components/search/search.jsx"
import Carousel from "../../components/carousel/carousel.jsx"
import Goodlist from "../goodlist/goodlist.jsx"
class Home extends Component{
	constructor(){
		super()
		this.state={
			data:[],
			id:1,
			channel_id:2,
			eFlag:true,
			arr:["家乡味道","进口食品","牛奶乳品","休闲零食","生鲜果蔬","米面粮油","调味调料","酒水饮料"]
		}
		this.changeTop = this.changeTop.bind(this)
	}
	render(){
		return (
			<div id="home" onScroll={this.changeTop} ref="home">
				<div ref="doc">
					<div className="search">
						<div className="search_left" >
							<img src={"/src/static/image/logo.jpg"} />
						</div>
						<div className="search_ctr">
							<i className="iconfont icon-sousuo" style={{ fontSize:"17px" }}></i>
							<input type="text" placeholder="请输入您要搜索的商品" onFocus={()=>{this.toSeacrch()}}/>
						</div>
						<div className="search_right" >
							<dl>
								<dt><i className="iconfont icon-shop" style={{ fontSize:".36rem" }}></i></dt>
								<dd>我的店铺</dd>
							</dl>
						</div>
						{/*<Search flag={this.state.flag}></Search>*/}
					</div>
					<div className="home-content">
						<Carousel></Carousel>
						<div className="cagetory">
							<Link to="/detail" >
								<dl>
									<dt><img src={"/src/static/image/jia3@2x.png"} /></dt>
									<dd>家乡味道</dd>
								</dl>
							</Link>
							<Link to="/detail" >
								<dl>
									<dt><img src={"/src/static/image/jin1@2x.png"} /></dt>
									<dd>进口食品</dd>
								</dl>
							</Link>
							<Link to="/detail" >
								<dl>
									<dt><img src={"/src/static/image/niu1@2x.png"} /></dt>
									<dd>牛奶乳品</dd>
								</dl>
							</Link>
							<Link to="/detail" >
								<dl>
									<dt><img src={"/src/static/image/xiu1@2x.png"} /></dt>
									<dd>休闲零食</dd>
								</dl>
							</Link>
							<Link to="/detail" >
								<dl>
									<dt><img src={"/src/static/image/shen3@2x.png"} /></dt>
									<dd>生鲜果蔬</dd>
								</dl>
							</Link>
							<Link to="/detail" >
								<dl>
									<dt><img src={"/src/static/image/mi3@2x.png"} /></dt>
									<dd>米面粮油</dd>
								</dl>
							</Link>
							<Link to="/detail" >
								<dl>
									<dt><img src={"/src/static/image/tiao1@2x.png"} /></dt>
									<dd>调味调料</dd>
								</dl>
							</Link>
							<Link to="/detail" >
								<dl>
									<dt><img src={"/src/static/image/jiu1@2x.png"} /></dt>
									<dd>酒水饮料</dd>
								</dl>
							</Link>
						</div>
						<div className="cagetoryList">
						<Goodlist data={this.state.data} history={this.props.history}></Goodlist>
							{
								/*arr.map((item,index)=>{
									return  <div className="homeList" key={index}>
												<div className="title">
													<h3>{item}</h3>
													<p>更多></p>
												</div>
											</div>
								})*/
							}
						</div>
					</div>
					<div className="botm">我也是有底线的...</div>
				</div>
			</div>
		)
	}
	changeTop(){
		if(this.state.channel_id>8)return;
		if(!this.state.eFlag)return;
		let {home,doc} = this.refs
		let homeT = home.scrollTop;
		let homeH = home.offsetHeight;
		let docH = doc.offsetHeight;
		if(docH-(homeT+homeH) < 70){
			this.setState({
				eFlag:false,
				channel_id:++this.state.channel_id
			})
			$http.post("/mall/index/getGoodsChannel",{
				channel_id:this.state.channel_id
			}).then(res=>{
				this.setState({
					data:[...this.state.data,{
						"title":this.state.arr[this.state.channel_id-2],
						"children":JSON.parse(res).data.data
					}],
					eFlag:true
				})
			})
		}
	}
	toSeacrch(){
		this.props.history.push("/index/search",{
			from: this.props.location.pathname
		})
	}
	componentDidMount(){
		$http.post("/mall/index/getGoodsChannel",{channel_id:2}).then(res=>{
			this.setState({
				data:[{
					"title":this.state.arr[0],
					"children":JSON.parse(res).data.data
				}]
			})
		})
	}
}
export default Home