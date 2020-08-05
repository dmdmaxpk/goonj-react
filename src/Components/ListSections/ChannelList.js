import React, { Component } from 'react';
import PaywallInstance from "../../Utils/PaywallInstance";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import config from '../../Utils/config';
import { Link } from 'react-router-dom';
import Heading from '../HomeSections/Heading';
import './ListSections.scss';
import Slider from "react-slick";
import Loader from '../Loader/Loader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from 'jquery';

class ChannelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    componentDidMount(){
        PaywallInstance.get('/live')
        .then(res =>{
            this.setState({data: res.data})
        })
    }

    handleRedirect(item){
        let permission = localStorage.getItem('livePermission');
        // let url = permission ? `/channel/${item.slug}` : `${config.hepage}?slug=${item.slug}`;
        let url = permission ? `/channel/${item.slug}` : `${config.hepage}?slug=${item.slug}`;
        return url;
    }
    render() {
        var settings = {
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 3000,
                  settings: {
                    slidesToShow: 8.5,
                    slidesToScroll: 3,
                    initialSlide: 0,
                    arrow: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 0
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 0,
                    arrows: true
                  }
                }
            ]
          };

        return (
            <div className={this.props.class}>
                <Heading heading="Live Channels" url="/live-tv" />
                <div className="channelListContainer channelContainerMargin">
                    {this.state.data.length > 0 ?
                        <Slider className="channelSlider" {...settings}>
                             {
                                this.state.data.map(item =>
                                    <div className="channelListDiv" key={item.slug}>
                                        <a href={this.handleRedirect(item)}>
                                            {/* <div className="premiumTag">Premium</div> */}
                                            <img className="channelListImg" src={`${config.channelLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} />
                                            <p className="channelListName">{item.name}</p>
                                        </a>
                                    </div>
                                )
                               
                            }
                         
                         </Slider>
                    : <Loader />
                    }
                </div>
            </div>
        );
    }
}
 
export default ChannelList;