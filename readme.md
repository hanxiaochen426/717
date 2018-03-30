 # 717商场  类似于淘宝、京东移动端的电商购物网站
 # 功能
    1、首页

    	1) 轮播图
    	2) 商品分类 进入详情
		3) 商品列表 点击购物车图标可以添加到购物车

    2、分类

    	1) 区分不同商品类别

    3、购物车5
    	1) 商品数量的加减、价格计算
    		点击加减可以进行数量的更新
    		只有在商品选中的时候才去进行价格的计算
		2) 单选、全选
		   点击单选、全选可以进行总价的计算
		3) 删除操作
			删除商品需要选中商品
    4、我的

    	1) 设置 => 退出登录   用户在点击退出登录的时候可以弹出一个提示框 让用户确认  防止误操作
    	2) 地址管理
    		  新增地址
				  新增加地址的时候把token 也传到后台，根据token将地址添加到对应的用户下面，给地址添加一个随机id，添加default字段，可以设置新增的地址是否为默认地址
    		  修改地址
				  根据用户名称，id修改对应的地址，并且在修改完成之后更新到页面
    		  删除地址
    		  	· 根据用户名称，id删除对应的地址，并且在删除完成之后更新到页面
    		  设置默认地址
				  修改地址中的default字段 来进行默认地址的选择
    5、登录、注册
       在进入路由的时候，判断用户是否登录，如果登录了在浏览器上进行一个标示，然后进入对应的页面。没有就进入注册页，注册成功可以提示用户是否去进行登录，登录完成后可以进入对应的页面，取消登录就返回某个页面，并限制某些操作

 # 框架
    react redux react-redux redux-saga

 # 辅助工具
 	1、redux react-redux
 	    可以更好帮助我们来管理数据，在进行数据传参的时候可以更好的操作
 	2、redux-saga
 		Redux应用中扮演‘中间件’的角色，主要用来执行数据流中的异步操作。
 		主要通过ES6中的generator函数和yield关键字来以同步的方式实现异步操作。

 		saga可以使用call、fetch等api发起异步操作，操作完成后使用put函数触发action，同步更新state，从而完成整个State的更新。
 	3、react-lazyload
		通过延时加载图片、提高用户在视觉上的体验
 # 模块

    商品列表
    路由
    购物车
    地址管理
    轮播图

 # 封装
    fetch 封装 POST、GET两种方式
    getCookie() 用来获取token字段


