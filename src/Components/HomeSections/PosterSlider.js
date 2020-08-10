import React, { Component } from 'react';
import config from '../../Utils/config';
import { Link } from 'react-router-dom';


class PosterSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
    }
    render(){
        let banners = [
            {
                name: "banner01",
                url: "/category/entertainment/page/1",
                class: "carousel-item active"
            },
            {
                name: "banner02",
                url: "/live-tv",
                class: "carousel-item"
            },
            {
                name: "banner-02A",
                url: localStorage.getItem('livePermission') === true ? "/live-tv" : "/paywall/live" ,
                class: "carousel-item"
            },
            {
                name: "banner03",
                url: "/category/comedy/page/1",
                class: "carousel-item"
            },
            {
                name: "banner04",
                url: "/category/entertainment/page/1",
                class: "carousel-item"
            },
        ]
        return(
            <div className="posterSlider">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                    </ol>
                    <div className="carousel-inner carouselDiv">
                        {
                            banners.map(item =>
                                <div className={item.class} key={item.name}>
                                    <Link to={item.url}>
                                        <img src={`${config.bannerUrl}/${item.name}.jpg`} className="d-block w-100 slider_images_all" />
                                    </Link>
                                </div>
                            )

                        }
                    </div>
                </div>
            </div>
        );
    }
}
 
export default PosterSlider;