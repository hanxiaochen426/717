import React,{Component} from "react"
import loginCss from "./login.less"
import $http from "../../utils/http.js"
import Alert from "../../components/alert"
class Login extends Component{
	constructor(){
		super()
		this.state={
			token:"",
			flag:false,
			info:{}
		}
		this.login = this.login.bind(this);
		this.goBack = this.goBack.bind(this);
		this.Register = this.Register.bind(this);
	}
	render(){
		return (
			<div id="login">
				<div className="login_tit">
					<span onClick={this.goBack}>{"<"}</span>
					<h1>欢迎来到登陆页</h1>
				</div>
				<div className="prompt">您需要登录才能继续访问!  &nbsp;(*^__^*) </div>
				<div className="userlist">
					<div><label>用户名：</label><input type="text" placeholder="请输入用户名" ref="username" /></div>
					<div><label>  密码：</label><input type="password" placeholder="请输入密码" ref="password" /></div>
				</div>
				<div className="btn">
					<button onClick={this.login}>登录</button>
				</div>
				<p className="register" onClick={this.Register}>注册</p>
				<Alert flag={this.state.flag} info={this.state.info}></Alert>
			</div>
		)
	}
	goBack(){
		this.props.history.push(this.props.location.state.from);
	}
	Register(){
		console.log(this.props.location.state.from)
		this.props.history.push("/register",{
			from:this.props.location.state.from
		});
	}
	login(){
		let {username,password} = this.refs;
		$http.post("/login",{
			username:username.value,
			password:password.value
		}).then(res=>{
			if(res.code_num==1){
				this.setState({
					token:res.token
				})
				document.cookie="token="+res.token;
				this.props.history.push(this.props.location.state.from,{
					from:this.props.location.state.from
				});
			}else{
				this.setState({
					flag:true,
					info:{
						code_info:"用户还未注册，请注册！",
						code_num:1
					}
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
		console.log(this.props)
	}
	componentWillUnmount(){ 
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
          return;
        };  
    }
}
export default Login