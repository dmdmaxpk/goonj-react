import React, { Component } from 'react';
import AxiosInstance from "../../Utils/AxiosInstance";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import config from '../../Utils/config';
import { Link } from 'react-router-dom';
import Heading from '../HomeSections/Heading';
import './ListSections.scss';

class PopularList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        AxiosInstance.get('/live')
        .then(res =>{
            // console.log(res.data);
            this.setState({data: res.data})
        })
    }
    render() {
        const responsive = {
            desktop: {
              breakpoint: { max: 4000, min: 1024 },
              items: 4,
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
                <Heading heading={this.props.title} />
                <div className="channelListContainer">
                        <Carousel
                            className="popularListCarousel"
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
                                    <div className="popularListDiv" key={item.slug}>
                                        <Link style={{textDecoration: "none"}} to={{
                                            pathname: `/channel/${item.slug}`,
                                            state: {
                                                logo: item.thumbnail                                            
                                            }
                                            }}>
                                            <img className="popularListImg" src={`${config.channelLogoUrl}/${item.thumbnail}`} />
                                            <p className="channelListName">{item.name}</p>
                                        </Link>
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
 
export default PopularList;