import React, {Component} from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import store from "./store/store"
import App from "./app.jsx"
import fontSet from "./utils/fontSet.js"
import reset from "./static/css/reset.css"
import common from "./static/css/common.css"
import swiperCss from "./static/css/swiper.css"
import swiperJs from "./static/css/swiper.js"
import fontCss from "./static/font/iconfont.css"
ReactDOM.render(<Provider store={store}><App></App></Provider>,document.getElementById("app"))

