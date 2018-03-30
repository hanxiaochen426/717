const jwt = require('jsonwebtoken');
const fs = require("fs");
const http = require('http');
const querystring = require('querystring')
const _ = require("lodash")
module.exports = function(app) {
    //注册
    function register(body, userData, res) {
        userData.push(body);
        fs.writeFile("user.json", JSON.stringify(userData), (err) => {
            if (err) throw err;
            res.end(JSON.stringify({
                "code_num": 2,
                "code_info": "注册成功，请登录"
            }));
        });
    }
    app.post('/register', function(req, res, next) {
        const body = req.body;
        // const tokens = jwt.sign(req.body, 'shhhhh');//加密
        const userData = JSON.parse(fs.readFileSync("./user.json", { encoding: "utf-8" })) //获取用户文件
        if (userData.length == 0) {
            register(body, userData, res);
        } else {
            userData.forEach((item, i) => {
                if (item.username != body.username && i >= userData.length - 1) {
                    register(body, userData, res);
                    return false;
                } else if (item.username == body.username) {
                    res.end(JSON.stringify({
                        "code_num": 1,
                        "code_info": "用户名已经注册，请重新输入！"
                    }));
                }
            })
        }
    })

    //登陆
    app.post('/login', function(req, res, next) {
        const body = req.body;
        const userData = JSON.parse(fs.readFileSync("./user.json", { encoding: "utf-8" })) //获取用户文件
        let resInfo = {
            code_num: 2,
            code_info: "用户名或密码错误",
            token: ""
        }
        userData.forEach(user => {
            if (user.username == body.username && user.password == body.password) {
                resInfo.code_num = 1;
                resInfo.code_info = "登陆成功";
            }
        })
        // const tokens = jwt.sign(req.body, 'shhhhh');//加密
        if (resInfo.code_num == 1) {
            resInfo.token = jwt.sign(body, 'hanxiaochen1');
        }
        res.end(JSON.stringify(resInfo));
    })

    //添加商品 到购物车
    app.post("/addCart", function(req, res, next) {
        jwt.verify(req.body.token, "hanxiaochen1", (err, decoded) => {
            if (err) {
                res.json(err)
            } else {
                let cartInfo = JSON.parse(fs.readFileSync("./addCart.json", { encoding: "utf-8" }))
                if (cartInfo[decoded.username]) {
                    let cartName = cartInfo[decoded.username];
                    let flag = false;
                    // cartInfo[decoded.username].push(req.body.info)
                    cartName.forEach((item,index)=>{
                        if(item.goods_id == req.body.info.goods_id){
                            ++item.count;
                            flag = true;
                        }
                    })
                    if(!flag){
                            req.body.info.count = 1;
                            req.body.info.selectd = 0;
                            cartName.push(req.body.info)
                        }
                } else {
                    req.body.info.count = 1;
                    req.body.info.selectd = 0;
                    cartInfo[decoded.username] = [req.body.info]
                }
                fs.writeFile("./addCart.json", JSON.stringify(cartInfo), function(err) {
                    if (err) return;
                    res.end(JSON.stringify({
                        code_num: 1,
                        code_info: "已成功添加到购物车"
                    }))
                })
            }
        })
    })
    //分类
    app.get("/categorySon", function(req, res, next) {
        let body = req.query;
        let cartInfo = JSON.parse(fs.readFileSync("./classify.json", { encoding: "utf-8" }));
        cartInfo.map((item, index) => {
            if (item.id == body.id) {
                res.end(JSON.stringify(item))
            }
        })
    })
    //计算底部数量
    app.post("/compute", function(req, res, next) {
        let body = req.body;
        jwt.verify(body.token, "hanxiaochen1", (err, decoded) => {
            if (err) {
                res.json(err)
            } else {
                let cartInfo = JSON.parse(fs.readFileSync("./addCart.json", { encoding: "utf-8" }));
                if (cartInfo[decoded.username]) {
                    // let count = 0;
                    // .map((item,index)=>{
                    //     count += item.count
                    // })
                    res.end(JSON.stringify({
                        code_num: 1,
                        count: cartInfo[decoded.username].length
                    }))
                }else{
                    res.end(JSON.stringify({
                        code_num: 2,
                        count: 0
                    }))
                }
            }
        })
    })
    //home商品列表
    const options = {
        hostname: 'www.lb717.com',
        port: 80,
        path: '/mall/index/getGoodsChannel',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    };
    app.post('/mall/index/getGoodsChannel', function(req, res) {
        let data = "";
        let request = http.request(options, (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk;

            });
            console.log(data)
            response.on('end', () => {
                res.end(JSON.stringify(data));
            });
        })
        request.write(querystring.stringify(req.body))
        request.end()

    })
    //获取购物车列表 渲染购物车
    app.post("/countCart",function(req, res){
        let body = req.body;
        jwt.verify(body.token, "hanxiaochen1", (err, decoded) => {
            if (err) {
                res.json(err)
            } else {
                let cartInfo = JSON.parse(fs.readFileSync("./addCart.json", { encoding: "utf-8" }));
                if (cartInfo[decoded.username]) {
                    res.end(JSON.stringify(cartInfo[decoded.username]))
                }
            }
        })
    })
    //根据用户名称和商品id删除对应的商品
    app.post("/deleteGoods",function(req, res){
        let body = req.body;
        let cartInfo = JSON.parse(fs.readFileSync("./addCart.json", { encoding: "utf-8" }));
        jwt.verify(body.token, "hanxiaochen1", (err, decoded) => {
            if (err) {
                res.json(err)
            } else {
                let cartList = cartInfo[decoded.username];

                let delGoods = _.remove(cartList,function(item){
                    return body.daleteId.indexOf(item.goods_id)>-1
                })
                cartInfo[decoded.username] = cartList;
                fs.writeFile("./addCart.json",JSON.stringify(cartInfo),function(){
                    res.json({
                        code_info:"删除成功",
                        code_num:1,
                        deGoods:delGoods,
                        leftGoods:cartList
                    })
                })
            }
        })
    })
    //添加地址
    app.post("/addAddress",function(req, res){
        let body = req.body;
         jwt.verify(body.token, "hanxiaochen1", (err, decoded) => {
            if (err) {
                res.json(err)
            } else {
                let cartInfo = JSON.parse(fs.readFileSync("./user_address.json", { encoding: "utf-8" }))
                if (cartInfo[decoded.username]) {
                    let cartName = cartInfo[decoded.username];
                    let flag = false;
                    cartName.map((item,ind)=>{
                        if(body.new_address.default == true){
                            item.default = false
                        }
                        if(item.id == body.new_address.id){
                            cartName[ind] = body.new_address
                            flag = true
                        }
                    })
                    if(!flag){
                        cartName.push(body.new_address)
                    }
                } else {
                    cartInfo[decoded.username] = [body.new_address]
                }
                fs.writeFile("./user_address.json", JSON.stringify(cartInfo), function(err) {
                    if (err) return;
                    res.end(JSON.stringify({
                        code_num: 1,
                        code_info: "保存成功"
                    }))
                })
            }
        })
    })
    //获取地址
    app.post("/getAddress",function(req, res){
         jwt.verify(req.body.token, "hanxiaochen1", (err, decoded) => {
            if (err) {
                res.json(err)
            } else {
                let cartInfo = JSON.parse(fs.readFileSync("./user_address.json", { encoding: "utf-8" }))
                if (cartInfo[decoded.username]) {
                    res.end(JSON.stringify({
                        code_num:1,
                        code_info: "获取成功",
                        address:cartInfo[decoded.username]
                    }))
                }
            }
        })
    })
    //删除地址
    app.post("/delAddress",function(req, res){
        let body = req.body;
         jwt.verify(body.token, "hanxiaochen1", (err, decoded) => {
            if (err) {
                res.json(err)
            } else {
                let cartInfo = JSON.parse(fs.readFileSync("./user_address.json", { encoding: "utf-8" }))
                let cartInfoName = cartInfo[decoded.username]
                cartInfoName.splice(body.index,1)
                cartInfo[decoded.username] = cartInfoName
                fs.writeFile("./user_address.json", JSON.stringify(cartInfo), function(err) {
                    if (err) return;
                    res.end(JSON.stringify({
                        code_num: 1,
                        code_info: "保存成功",
                        data: cartInfo[decoded.username]
                    }))
                })
            }
        })
    })
    app.get("/getArea",function(req, res){
        
    })
}