import React,{Component} from "react"
import {Route,Redirect} from "react-router-dom"
import {getCookie} from "../utils/utils"
function idLogin(){
  return !!getCookie("token")
}
class Routes extends Component{
    render(){
        let {Router}=this.props;//从app.jsx中Routes组件上传过来的数据
        return (
            Router.map((item,index)=>{
						return <Route key={index} path={item.path} render={(router)=>{
              console.log(router)
                   			return item.authorization&&!idLogin()?
                        <Redirect to={{pathname:"/login",state:{from:item.path}}}></Redirect>
                        :
                        <item.component {...router} Router={item.children}></item.component>
                   		}}></Route>
					})
        )
    }
}
export default Routes