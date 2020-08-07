import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import Heading from '../HomeSections/Heading';
import Loader from '../Loader/Loader';
import './ListSections.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import config from '../../Utils/config';

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
                name: "Goonj Comedy",
                url: `/category/comedy/page/1`,
                thumbnail: 'comedy.png'
            },
            {
                name: "Geo Aur Jeenay Do",
                url: localStorage.getItem('livePermission') === true ? `/channel/geo-news/` : `${config.hepage}?slug=geo-news`,
                thumbnail: 'channel01.png'
            },
            {
                name: "Samaa News",
                url: localStorage.getItem('livePermission') === true ? `/channel/samaa-news` : `${config.hepage}?slug=samaa-news`,
                thumbnail: 'channel02.png'
            },
            {
                name: "Dunya News Khabar Ki Dunya",
                url: localStorage.getItem('livePermission') === true ? `/channel/dunya-news` : `${config.hepage}?slug=dunya-news`,
                thumbnail: 'channel04.png'
            },
            {
                name: "Binjee",
                url: `/binjee`,
                thumbnail: 'channel03.png'
            },
            {
                name: "Goonj Comedy",
                url: `/category/comedy/page/1`,
                thumbnail: 'comedy.png'
            },
            {
                name: "Geo Aur Jeenay Do",
                url: localStorage.getItem('livePermission') === true ? `/channel/geo-news/` : `${config.hepage}?slug=geo-news`,
                thumbnail: 'channel01.png'
            },
            {
                name: "Samaa News",
                url: localStorage.getItem('livePermission') === true ? `/channel/samaa-news` : `${config.hepage}?slug=samaa-news`,
                thumbnail: 'channel02.png'
            },
            {
                name: "Dunya News Khabar Ki Dunya",
                url: localStorage.getItem('livePermission') === true ? `/channel/dunya-news` : `${config.hepage}?slug=dunya-news`,
                thumbnail: 'channel04.png'
            }
        ];

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
                    slidesToShow: 6.25,
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
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    arrows: true
                  }
                }
            ]
          };

        return (
            <div className={this.props.class}>
                <Heading heading={this.props.title} viewMoreClass="hidden" classname={this.props.classname}/>
                <div className="channelListContainer position-relative">
                    <fadeleft/>
                        <Slider className="propularSlider" {...settings}>
                            {popularList.length > 0 ?
                                popularList.map(item =>
                                    <div className="popularListDiv" key={item.slug}>
                                        <a style={{textDecoration: "none"}} href={`${item.url}`}>
                                            <img className="popularListImg" src={require(`../../Assets/PopularAssets/${item.thumbnail}`)} />
                                            <p className="channelListName popularListName">{item.name}</p>
                                        </a>
                                    </div>
                                )
                                : <Loader />
                            }
                         </Slider>
                    <faderight/>
                </div>
            </div>
        );
    }
}
 
export default PopularList;