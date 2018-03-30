import React,{Component} from "react"
import registerCss from "./register.less"
import $http from "../../utils/http.js"
import Alert from "../../components/alert"
class Register extends Component{
	constructor(){
		super()
		this.state={
			flag:"",
			newInfo:"",
			alertFlag:true,
			from:""
		}
		this.register = this.register.bind(this);
		this.goBack = this.goBack.bind(this);
	}
	render(){
		return (
			<div id="register">
			<Alert from={this.state.from} alertFlag={this.state.alertFlag} flag={this.state.flag} info={this.state.newInfo} history={this.props.history}></Alert>
				<div className="register_tit">
					<span onClick={this.goBack}>{"<"}</span>
					<h1>欢迎来到注册页</h1>
				</div>
				<div className="userlist">
					<div><label>用户名：</label><input type="text" placeholder="请输入用户名" ref="username"/></div>
					<div><label>  密码：</label><input type="password" placeholder="请输入密码" ref="password"/></div>
				</div>
				<button onClick={this.register}>注册</button>
			</div>
		)
	}
	goBack(){
		this.props.history.push("/index/home")
	}
	register(){
		let {username,password} = this.refs;
		$http.post("/register",{
			username:username.value,
			password:password.value
		}).then(res=>{
			if(res.code_num == 2){
				this.setState({
					newInfo:res,
					alertFlag:true
				})
			}else if(res.code_num==1){
				username.value="";
				password.value="";
				this.setState({
					newInfo:res,
					alertFlag:false,
					flag:true
				})
				setTimeout(()=>{
					this.setState({
						flag:false
					})
				},1000)
			}
		})
	}
	componentDidMount(){
		this.setState({
			from: this.props.location.state.from
		})
	}
}
export default Register