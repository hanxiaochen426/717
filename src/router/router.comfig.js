import React from "react";
import Classify from "../view/classify"
import Home from "../view/home"
import Community from "../view/community"
import Shopcar from "../view/shopCar"
import My from "../view/my"
import Index from "../view/index"
import Detail from "../view/detail"
import Login from "../view/login"
import Register from "../view/register"
import Search from "../components/search"
import Result from "../components/result"
import Setting from "../view/setting"
import GoodAdress from "../view/goodAdress";
import NewAdress from "../view/newAdress"
let Router = {
	routes:[
		{
			path:"/index",
			component:Index,
			children:[
				{
					path: "/index/home",
					component: Home
				},
				{
					path: "/index/classify",
					component: Classify,
					children:[
						{
							"id":"classify_1",
							"name":"家乡味道"
						},
						{
							"id":"classify_2",
							"name":"进口食品"
						},
						{
							"id":"classify_3",
							"name":"牛奶乳品"
						},
						{
							"id":"classify_4",
							"name":"休闲零食"
						},
						{
							"id":"classify_5",
							"name":"生鲜果蔬"
						},
						{
							"id":"classify_6",
							"name":"米面粮油"
						},
						{
							"id":"classify_7",
							"name":"调味调料"
						},
						{
							"id":"classify_8",
							"name":"酒水饮料"
						}
					]
				},
				{
					path: "/index/community",
					component: Community
				},
				{
					path: "/index/shopcar",
					component: Shopcar,
					authorization:true
				},
				{
					path: "/index/my",
					component: My,
					authorization:true
				},
				{
					path: "/index/search",
					component: Search
				},
				{
					path: "/index/result",
					component: Result
				}
			]
		},
		{
			path: "/detail",
			component: Detail
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/register",
			component: Register
		},
		{
			path: "/setting",
			component: Setting
		},
		{
			path: "/goodAdress",
			component: GoodAdress
		},
		{
			path: "/newAdress",
			component: NewAdress
		}
	]
}

export default Router