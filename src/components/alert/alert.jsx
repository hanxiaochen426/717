import React, {Component} from "react"
import alertCss from "./alert.css"
{/*>*/}
class Alert extends Component {
	constructor(){
		super()
		this.state={
			alertFlag:false,
			flag: false,
			info:""
		}
		this.Cancel = this.Cancel.bind(this);
		this.Confirm = this.Confirm.bind(this);
	}
	render(){
		let {flag,info,alertFlag} = this.state;
		return (
			<div>
				{
					info&&info.code_num==2?  <div id="AlertError" style={{display:alertFlag?"block":"none"}}>
						<div className="err_wrap">
							<div className="err_title">{info.code_info}</div>
							<div className="err_btn">
								<button onClick={this.Cancel}>取消</button>
								<button onClick={this.Confirm}>确定</button>
							</div>
						</div>
					</div> :<div id="AlertSuccess" style={{display:flag?"block":"none"}}>{info.code_info}</div>
				}
			</div>
		)
	}
	componentWillReceiveProps(prevState,nextState){
		this.setState({
			alertFlag:prevState.alertFlag
		})
	}
	Confirm(){
		let urlSrc;
		if(this.state.info.code_info=="确定要退出登陆吗?"){
			urlSrc = "/index/home";
		}else{
			urlSrc = "/login";
		}
		this.props.history.push(urlSrc,{
			from :this.props.from||this.props.history.location.state.from
		})
	}
	Cancel(){
		this.setState({
			alertFlag:false
		})
	}
	update(info){
		this.setState({
			info: info
		})
		let time = 1000;
		if(info.code_time){
			time = info.code_time
		}
		if(info.code_num == 1){
			this.setState({
				flag: true
			})
			setTimeout(()=>{
				this.setState({
					flag: false
				})
			},time)
		}else if(info.code_num == 2){
			this.setState({
				alertFlag: true
			})
		}
	}
}
export default Alert;