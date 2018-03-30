export default function mapStateToProps(state){
	let nums=0;
	let total = false;
	let botText = "";
	let titText = "";
	if(state.compute_num==0){
		botText = "结算";
		titText = "编辑";
	}
	state.cart_list.map((item,index)=>{
		if(item.selectd==true){
			nums+=(item.count*item.discount_price)
			total = true
		}
		if(item.selectd==false){
			 total=false
		}
	})
	return {
		cartData:state.cart_list,
		botText,
		titText,
		nums,
		total,
		compute_num:state.compute_num
	}
}