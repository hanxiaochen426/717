const express=require("express");
const bodyParser = require("body-parser");

const app=express();
const api = require("./api.js");
app.use(bodyParser.json());
//设置跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9000");
    res.header("Access-Control-Allow-Headers", "Content-type");
    res.header("Content-type", "application/json;charset=utf-8");
    next();
});
api(app)
//注册

app.listen(8081,function(){
    console.log("express running on http://localhost:8081");
});

