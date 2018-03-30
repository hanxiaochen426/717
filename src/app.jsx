import React, {Component,Fragment} from "react"
import {BrowserRouter,NavLink,Link,Route,Switch,Redirect} from "react-router-dom"
import Router from "./router/router.comfig.js"
import Routers from "./components/router.jsx"
import $http from "./utils/http.js"
class App extends Component{
	render(){
		return (
			<BrowserRouter>
				<Switch>
				<Redirect exact from="/" to="/index/home"></Redirect>
					<Routers Router={Router.routes}></Routers>
				</Switch>
			</BrowserRouter>
		)
	}
}
export default App