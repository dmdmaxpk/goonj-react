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
                name: "01",
                url: "/category/entertainment/page/1",
                class: "carousel-item active"
            },
            {
                name: "02",
                url: "/live-tv",
                class: "carousel-item"
            },
            {
                name: "03",
                url: localStorage.getItem('livePermission') === true ? "/live-tv" : "/paywall/live" ,
                class: "carousel-item"
            },
            {
                name: "04",
                url: "/category/comedy/page/1",
                class: "carousel-item"
            },
            {
                name: "05",
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
                                        <img src={`${config.bannerUrl}/${item.name}.png`} className="d-block w-100 slider_images_all" />
                                    </Link>
                                </div>
                            )

                        }
                    </div>
                    {/* <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a> */}
                </div>
            </div>
        );
    }
}
 
export default PosterSlider;