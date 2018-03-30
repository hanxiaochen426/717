import React,{Component} from "react";
import newLess from "./newAdress.less"
import Header from "../../components/header/header.jsx"
import $http from  "../../utils/http.js"
import {getCookie} from "../../utils/utils.js"
import Alert from "../../components/alert"
class Input extends Component{
	constructor(){
		super()
		this.getVal = this.getVal.bind(this);
	}
	render(){
		return (
			<input type="text" placeholder={this.props.placeholder} ref="inp" onChange={this.getVal}/>
		)
	}
	getVal(e){
		this.props.onChange(this.refs.inp.value)
	}
	componentDidMount(){
		if(this.props.value){
			this.refs.inp.value = this.props.value;
		}else{
			this.refs.inp.value = "";
		}
		this.props.onChange(this.props.value);
	}
}
class Select extends Component{
	constructor(){
		super()
		this.getVal = this.getVal.bind(this);
	}
	render(){
		return (
			<select onChange={this.getVal} ref="selects">
				<option value="请选择">请选择</option>
				<option value="北京">北京</option>
				<option value="上海">上海</option>
				<option value="广州">广州</option>
				<option value="深圳">深圳</option>
			</select>
		)
	}
	getVal(e){
		this.props.onChange(this.refs.selects.value)
	}
	componentDidMount(){
		if(this.props.value){
			this.refs.selects.value = this.props.value;
		}else{
			this.refs.selects.value = "请选择"
		}
		this.props.onChange(this.refs.selects.value)
	}
}
class NewAdress extends Component{
	constructor(){
		super()
		this.state = {
			flag: true,
			editData:{}
		}
		this.Save = this.Save.bind(this);
		this.Change = this.Change.bind(this);
		this.regChange = this.regChange.bind(this);
		this.RndNum = this.RndNum.bind(this);
		this.name = "";
		this.phone  = "";
		this.province  = "";
		this.city  = "";
		this.county  = "";
		this.detailAdress  = "";
	}
	render(){
		let {flag,editData} = this.state;
		return (
			<div id="newAdress">
				<Header history={this.props.history}>{editData?"修改收货地址":"收货人"}</Header>
				<div className="from">
					<Input placeholder={"收货人姓名"} value={editData&&editData.name} onChange={(val)=>{this.Change("name" ,val)}}></Input>
					<Input placeholder={"手机号"} value={editData&&editData.phone} onChange={(val)=>{this.Change("phone" ,val)}}></Input>
					<div className="selects">
						<Select onChange={(val)=>{this.Change("province" ,val)}} value={editData&&editData.province} >></Select>
						<Select onChange={(val)=>{this.Change("city" ,val)}} value={editData&&editData.city} >></Select>
						<Select onChange={(val)=>{this.Change("county" ,val)}} value={editData&&editData.county} >></Select>
					</div>
					<Input placeholder={"详细地址"} value={editData&&editData.detailAdress}  onChange={(val)=>{this.Change("detailAdress" ,val)}}></Input>
				</div>
				<div className="default" onClick={()=>{
					this.setState({
						flag: flag?false:true
					});
				}}><p className={flag==true?"active":""} ref="defaP"></p>设置为默认地址</div>
				<div className="save" onClick={this.Save}>保存</div>
				<Alert ref="alert"></Alert>
			</div>
		)
	}
	Change(a,b){
		this[a] = b;
	}
	regChange(info){
		//提示框
		this.refs.alert.update({
			code_num: 1,
			code_info: info
		})
    }
    RndNum(n){
        var rnd="";
        for(var i=0; i<n; i++)
            rnd+=Math.floor(Math.random()*10);
        return rnd;
    }
	Save(){
		let reg_name = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
		let reg_phone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
		if(!reg_name.test(this.name)){
			this.regChange("用户名含有非法字符!")
			return ;
		}else if(this.name.length<3){
			this.regChange("用户名过短!")
			return ;
		}
		if(reg_phone.test(this.phone)==false){
			this.regChange("手机号码输入有误!")
			return ;
		}
		if(!this.province || !this.city || !this.county){
			this.regChange("省市区不能为空!")
			return;
		}
		if(this.detailAdress == ""){
			this.regChange("地址不能为空!")
			return;
		}else if(this.detailAdress.length < 6){
			this.regChange("地址长度不能小于6位!")
			return;
		}
		let new_address = {
			name: this.name,
			phone: this.phone,
			province: this.province ,
			city: this.city,
			county: this.county,
			detailAdress: this.detailAdress,
			default: this.state.flag,
			id: this.state.editData ? this.state.editData.id:this.RndNum(4)
		}
		$http.post("/addAddress",{
			token: getCookie("token"),
			new_address:new_address
		}).then(res=>{
			if(res.code_num == 1){
				this.regChange(res.code_info)
				setTimeout(()=>{
					this.props.history.push(this.props.history.location.state.from)
				},1000)
			}
		})
	}
	componentWillMount(){
		this.setState({
			editData:this.props.history.location.state.item
		})
	}
}
export default NewAdress