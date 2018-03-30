import React,{Component} from "react";
{/*工具*/}
import $http from "../../utils/http.js"
import {Compute} from "../../utils/utils.js"
{/*Redux*/}
import {connect} from "react-redux"
class Community extends Component{
	render(){
		return (
			<div>社区</div>
		)
	}
	componentDidMount(){
		Compute(document.cookie,this.props)
	}
}
function mapStateToProps(){
	return {}
}
export default  connect(mapStateToProps)(Community)