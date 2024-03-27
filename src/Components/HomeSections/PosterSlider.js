import React, { Component } from 'react';
import config from '../../Utils/config';
import { Link } from 'react-router-dom';
import AdvertComponent from '../MTA/AdBanner';

class PosterSlider extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isMta: false,
         }
    }
    componentDidMount(){
        // MTA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");

        if(this.source === 'mta'){
            this.setState({isMta: true});
        }
        else{
            this.setState({isMta: false});
        }
    }
    render(){
        let banners = [
            {
                name: "01",
                url: "#",
                class: "carousel-item active"
            },
            {
                name: "02",
                url: "#",
                class: "carousel-item"
            },
            {
                name: "03",
                url: "#",
                class: "carousel-item"
            },
            {
                name: "04",
                url: "#",
                class: "carousel-item"
            },  
            {
                name: "05",
                url: "#",
                class: "carousel-item"
            }, 
        ]

        let mtaBanners = [
            {
                name: "07",
                url: "https://goonj.pk/channel/green-tv-ent?source=mta",
                class: "carousel-item active"
            },
            // {
            //     name: "08",
            //     url: "#",
            //     class: "carousel-item"
            // },
            // {
            //     name: "09",
            //     url: "#",
            //     class: "carousel-item"
            // },
            {
                name: "10",
                url: "#",
                class: "carousel-item"
            },
            // {
            //     name: "11",
            //     url: "#",
            //     class: "carousel-item"
            // },   
        ]

        //if condition to check which banner to use
        const activeBanners = this.state.isMta ? mtaBanners : banners;

        return(
            <div className="posterSlider">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        {/* <li data-target="#carouselExampleIndicators" data-slide-to="1"></li> */}
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        {/* <li data-target="#carouselExampleIndicators" data-slide-to="3"></li> */}
                        {/* <li data-target="#carouselExampleIndicators" data-slide-to="4"></li> */}
                        {/* <li data-target="#carouselExampleIndicators" data-slide-to="5"></li> */}
                        </ol>
                        

                    <div className="carousel-inner carouselDiv">
                        {
                            activeBanners.map(item =>
                                <div className={item.class} key={item.name} onClick={()=> item?.url !=='#' ? window.open(item.url, '_self') : ()=> {}}>
                                    {/* <Link to={item.url}> */}
                                        <img src={`${config.bannerUrl}/${item.name}.jpg`} className="d-block w-100 slider_images_all" alt={item.name} />
                                    {/* </Link> */}
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