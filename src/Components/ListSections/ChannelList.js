import React, { Component } from 'react';
import AxiosInstance from "../../Utils/AxiosInstance";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import config from '../../Utils/config';
import { Link } from 'react-router-dom';
import Heading from '../HomeSections/Heading';
import './ListSections.scss';

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
        const responsive = {
            desktop: {
              breakpoint: { max: 4000, min: 1024 },
              items: 6,
              slidesToSlide: 2, // optional, default to 1.
              partialVisibilityGutter: 0
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
              slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
              slidesToSlide: 1 // optional, default to 1.
            }
        };

        return (
            <div>
                <Heading heading="Live Channels" url="/live-tv" />
                <div className="channelListContainer channelContainerMargin">
                        <Carousel
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
                            customTransition="all 1"
                            transitionDuration={1000}
                            containerClass="carousel-container"
                            // removeArrowOnDeviceType={["tablet", "mobile"]}
                            deviceType={this.props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding"
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
                        </Carousel>
                </div>
            </div>
        );
    }
}
 
export default ChannelList;