import React, { Component } from 'react';
import AxiosInstance from "../../Utils/AxiosInstance";
import 'react-multi-carousel/lib/styles.css';
import config from '../../Utils/config';
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
        let url = permission ? `/channel/${item.slug}` : `${config.hepage}?slug=${item.slug}`;
        return url;
    }
    render() {
        var settings = {
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 3000,
                  settings: {
                    slidesToShow: 8.5,
                    slidesToScroll: 3,
                    infinite: false,
                    arrow: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    arrows: true
                  }
                }
            ]
          };

        return (
            <div className={this.props.class}>
                <Heading heading="Live Channels" url="/live-tv" />
                <div className="channelListContainer channelContainerMargin">
                        <Slider className="channelSlider" {...settings}>
                            {this.state.data.length > 1 ?
                                this.state.data.map(item =>
                                    <div className="channelListDiv" key={item.slug}>
                                        <a href={this.handleRedirect(item)}>
                                            <img className="channelListImg" src={`${config.channelLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} />
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