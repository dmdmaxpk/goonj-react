import React, { Component } from 'react';
import AxiosInstance from "../../Utils/AxiosInstance";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import config from '../../Utils/config';
import { Link } from 'react-router-dom';
import Heading from '../HomeSections/Heading';
import './ListSections.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ChannelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    componentDidMount(){
        AxiosInstance.get('/live')
        .then(res =>{
            this.setState({data: res.data})
        })
    }
    handleRedirect(item){
        let permission = localStorage.getItem('livePermission');
        // let url = permission ? `/channel/${item.slug}` : `${config.hepage}?slug=${item.slug}`;
        let url = permission ? `/channel/${item.slug}` : `/paywall/live?slug=${item.slug}`;
        return url;
    }
    render() {
        // const responsive = {
        //     desktop: {
        //       breakpoint: { max: 4000, min: 1024 },
        //       items: 6,
        //       slidesToSlide: 2, // optional, default to 1.
        //       partialVisibilityGutter: 0
        //     },
        //     tablet: {
        //       breakpoint: { max: 1024, min: 464 },
        //       items: 2,
        //       slidesToSlide: 2 // optional, default to 1.
        //     },
        //     mobile: {
        //       breakpoint: { max: 464, min: 0 },
        //       items: 1,
        //       slidesToSlide: 1 // optional, default to 1.
        //     }
        // };
        var settings = {
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1600,
                  settings: {
                    slidesToShow: 8,
                    slidesToScroll: 3,
                    infinite: true,
                    arrow: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                    
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    arrows: true
                  }
                }
            ]
          };

        return (
            <div>
                <Heading heading="Live Channels" url="/live-tv" />
                <div className="channelListContainer channelContainerMargin">
                        {/* <Carousel
                            className="channelListCarousel"
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            autoPlay={false}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            focusOnSelect={true}
                            centerMode={true}
                            transitionDuration={0}
                            containerClass="carousel-container"
                            deviceType={this.props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding"
                            // customTransition="all 1"
                            // removeArrowOnDeviceType={["tablet", "mobile"]}
                        >
                            {this.state.data.length > 1 ?
                                this.state.data.map(item =>
                                    <div className="channelListDiv" key={item.slug}>
                                        <a href={this.handleRedirect(item)}>
                                            <img className="channelListImg" src={`${config.channelLogoUrl}/${item.thumbnail}`} />
                                            <p className="channelListName">{item.name}</p>
                                        </a>
                                    </div>
                                )
                                : ""
                            }
                        </Carousel> */}
                        <Slider className="channelSlider" {...settings}>
                            {this.state.data.length > 1 ?
                                this.state.data.map(item =>
                                    <div className="channelListDiv" key={item.slug}>
                                        <a href={this.handleRedirect(item)}>
                                            <img className="channelListImg" src={`${config.channelLogoUrl}/${item.thumbnail}`} />
                                            <p className="channelListName">{item.name}</p>
                                        </a>
                                    </div>
                                )
                                : ""
                            }
                         </Slider>
                </div>
            </div>
        );
    }
}
 
export default ChannelList;