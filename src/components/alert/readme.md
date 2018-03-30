 # import Alert from "...."
	<Alert from={} ref="alert" ></Alert>
	1、from 传当前组件的 路径  方便后面返回
	2、通过this.refs.alert 调用Alert组件的update方法
		this.refs.alert.update({
			code_num:  1||2 ,  提示信息为1   确定取消为2,
			code_info:, "" 传递的信息 字符串
			code_time: 时间       提示框显示的时长
		})
	3、history 需要从父组件传递