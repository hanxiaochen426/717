import React,{Component,Fragment} from "react";
import carouselCss from "./carousel.css"
class Carousel extends Component{
	render(){
		return (
			<Fragment>
				<div className="swiper-container" id="swiper_wrap">
				    <div className="swiper-wrapper">
				        <div className="swiper-slide">
				        	<img src={"/src/static/image/carousel_1.jpg"} />
				        </div>
				        <div className="swiper-slide">
				        	<img src={"/src/static/image/carousel_2.jpg"} />
				        </div>
				        <div className="swiper-slide">
				        	<img src={"/src/static/image/carousel_3.jpg"} />
				        </div>
				        <div className="swiper-slide">
				        	<img src={"/src/static/image/carousel_4.jpg"} />
				        </div>
				        <div className="swiper-slide">
				        	<img src={"/src/static/image/carousel_5.jpg"} />
				        </div>
				    </div>
				    <div className="swiper-pagination"></div>
				</div>
			</Fragment>
		)
	}
	componentDidMount(){
		 var mySwiper = new Swiper ('.swiper-container', {
			    direction: 'horizontal',
			    autoplay : 3000,
			    pagination: '.swiper-pagination',
			    autoplayDisableOnInteraction : false
			  })
	}
}
export default Carousel
