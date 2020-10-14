import React, { Component } from 'react';
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
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    handleRedirect(item){
        this.props.history.push(item)
    }
    render() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        const Urlmsisdn = localStorage.getItem('urlMsisdn') ? localStorage.getItem('urlMsisdn') : urlParams.get("msisdn");
        const popularList = [
            {
                name: "Binjee",
                url: `https://goonj.binjee.com/`,
                thumbnail: 'channel03.png'
            },
            {
                name: "Markhor Cricket Champions Trophy",
                url: '/stream/markhor-ct',
                thumbnail: 'channel05.jpg'
            },
            {
                name: "Goonj Comedy",
                url: `/category/comedy/page/1`,
                thumbnail: 'comedy.png'
            },
            {
                name: "Geo Aur Jeenay Do",
                url: localStorage.getItem('livePermission') === true ? `/channel/geo-news/` : Urlmsisdn ? `/paywall/live?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=geo-news` : `${config.hepage}?slug=geo-news`,
                thumbnail: 'channel01.png'
            },
            {
                name: "Samaa News",
                url: localStorage.getItem('livePermission') === true ? `/channel/samaa-news` : Urlmsisdn ? `/paywall/live?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=samaa-news` : `${config.hepage}?slug=samaa-news`,
                thumbnail: 'channel02.png'
            },
            {
                name: "Dunya News Khabar Ki Dunya",
                url: localStorage.getItem('livePermission') === true ? `/channel/dunya-news` : Urlmsisdn ? `/paywall/live?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=dunya-news` : `${config.hepage}?slug=dunya-news`,
                thumbnail: 'channel04.png'
            },
            {
                name: "Binjee",
                url: `https://goonj.binjee.com/`,
                thumbnail: 'channel03.png'
            },
            {
                name: "Markhor Cricket Champions Trophy",
                url: '/stream/markhor-ct',
                thumbnail: 'channel05.jpg'
            },
            {
                name: "Goonj Comedy",
                url: `/category/comedy/page/1`,
                thumbnail: 'comedy.png'
            },
            {
                name: "Geo Aur Jeenay Do",
                url: localStorage.getItem('livePermission') === true ? `/channel/geo-news/` : Urlmsisdn ? `/paywall/live?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=geo-news` : `${config.hepage}?slug=geo-news`,
                thumbnail: 'channel01.png'
            },
            {
                name: "Samaa News",
                url: localStorage.getItem('livePermission') === true ? `/channel/samaa-news` : Urlmsisdn ? `/paywall/live?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=samaa-news` : `${config.hepage}?slug=samaa-news`,
                thumbnail: 'channel02.png'
            },
            {
                name: "Dunya News Khabar Ki Dunya",
                url: localStorage.getItem('livePermission') === true ? `/channel/dunya-news` : Urlmsisdn ? `/paywall/live?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=dunya-news` : `${config.hepage}?slug=dunyaa-news`,
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
            <div className={this.props.class+" "+this.props.marginTop}>
                <Heading heading={this.props.title} viewMoreClass="hidden" classname={this.props.classname+" "+this.props.class ? this.props.class:" "}/>
                <div className={"channelListContainer position-relative "+this.props.pageMargin}>
                    <fadeleft className="popularLeftFade"/>
                        <Slider className="propularSlider" {...settings}>
                            {popularList.length > 0 ?
                                popularList.map(item =>
                                    <div className="popularListDiv" key={item.slug}>
                                        <a style={{textDecoration: "none"}} href={`${item.url}`} >
                                            <img className="popularListImg" src={require(`../../Assets/PopularAssets/${item.thumbnail}`)} alt={item.thumbnail} />
                                            <p className="channelListName popularListName">{item.name}</p>
                                        </a>
                                    </div>
                                )
                                : <Loader />
                            }
                         </Slider>
                    <faderight className="popularRightFade"/>
                </div>
            </div>
        );
    }
}
 
export default PopularList;