import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import Heading from '../HomeSections/Heading';
import Loader from '../Loader/Loader';
import './ListSections.scss';

class PopularList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const popularList = [
            {
                name: "Binjee",
                url: `/binjee`,
                thumbnail: 'channel03.png'
            },
            {
                name: "Geo Aur Jeenay Do",
                url: `/channel/geo-news/`,
                thumbnail: 'channel01.png'
            },
            {
                name: "Samaa News",
                url: `/channel/samaa-news`,
                thumbnail: 'channel02.png'
            },
            {
                name: "Dunya News Khabar Ki Dunya",
                url: `/channel/dunya-news`,
                thumbnail: 'channel04.png'
            },
            {
                name: "Binjee",
                url: `/binjee`,
                thumbnail: 'channel03.png'
            },
            {
                name: "Geo Aur Jeenay Do",
                url: `/channel/geo-news/`,
                thumbnail: 'channel01.png'
            },
            {
                name: "Samaa News",
                url: `/channel/samaa-news`,
                thumbnail: 'channel02.png'
            },
            {
                name: "Dunya News Khabar Ki Dunya",
                url: `/channel/dunya-news`,
                thumbnail: 'channel04.png'
            },
        ];
        const responsive = {
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 4,
              slidesToSlide: 1, // optional, default to 1.
              partialVisibilityGutter: 0
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
              slidesToSlide: 1 // optional, default to 1.
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
                            ssr={false} // means to render carousel on server-side.
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
                            {popularList.length > 0 ?
                                popularList.map(item =>
                                    <div className="popularListDiv" key={item.slug}>
                                        <Link style={{textDecoration: "none"}} to={`${item.url}`}>
                                            <img className="popularListImg" src={require(`../../Assets/PopularAssets/${item.thumbnail}`)} />
                                            <p className="channelListName popularListName">{item.name}</p>
                                        </Link>
                                    </div>
                                )
                                : <Loader />
                            }
                        </Carousel>
                </div>
            </div>
        );
    }
}
 
export default PopularList;