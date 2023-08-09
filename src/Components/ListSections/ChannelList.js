//ChannelList.js
import React, { Component } from 'react';
import AxiosInstance from "../../Utils/AxiosInstance";
import config from '../../Utils/config';
import Heading from '../HomeSections/Heading';
import './ListSections.scss';
import Slider from "react-slick";
import Loader from '../Loader/Loader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from 'jquery';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

ReactGA.initialize('G-ZLSBYDDG31'); 

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
            });
    }

    //handleRedirect(item)
    handleRedirect(item) {
        //console.log("clicked");
        // event.preventDefault(); 
        const permission = localStorage.getItem('livePermission');
        const Urlmsisdn = localStorage.getItem('urlMsisdn');
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlSource = urlParams.get("source");
        const source = localStorage.getItem('source') ? localStorage.getItem('source') : urlSource;
       
        let url = "";
        
        if(permission) {
            url =`/channel/${item.slug}` 
        } else{
            if(Urlmsisdn)
                url = `/paywall/${item.slug !== 'pak-zim' ? 'live' : 'cricket'}?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=${item.slug}`
            else 
                url = `${config.hepage}?slug=${item.slug}`
        }

       if(source == "web"){
           if(permission) {
            url =`/channel/${item.slug}` 
            } else{
                if(Urlmsisdn)
                    url = `/paywall/${item.slug !== 'pak-zim' ? 'live' : 'cricket'}?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=${item.slug}`
                else 
                    url = `${config.hepage}?slug=${item.slug}`
            }   
        }else if(source == "mta"){
            //const channelsWithoutPaywall = ['bol', 'express-news', 'urdu-1'];
            const channelsWithoutPaywall = ['bol', 'express-news', 'urdu-1','film-world','ltn-family','aplus','a1-entertainment','Aruj-tv','city-42','mashriq-tv','makkah-live','madina-live','dawn-news','pnn-news','24_news','neo-news','gtv-news','suchtv-news','aaj-news','express-entertainment'];
            const isChannelWithoutPaywall = channelsWithoutPaywall.includes(item.slug);

            if (isChannelWithoutPaywall) {
                // Create custom events for MTA channels
                //console.log("in if condition where live channel info to displayed");
                console.log(`MTA-${item.slug} event triggered`);
                    ReactGA.event({
                        category: 'Custom Event',
                        action: `MTA_${item.slug}`,
                        label: window.location.href // Include the page location in the 'label' parameter

                    });
                url = `/channel/${item.slug}`;// Redirect directly to channel for free if source=mta
            }

        }
     
        console.log("final url:", url)
        // const { history } = this.props;

        // setTimeout(()=>{
        //     history.replace(url); 
        // },500)
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
                <Heading heading="Live Channels" url="/live-tv" classname={this.props.classname+" "+this.props.class ? this.props.class:" "} />
                <div className={"channelListContainer channelContainerMargin position-relative "+this.props.pageMargin}>
                <fadeleft className="channelLeftFade"/>
                    {this.state.data.length > 0 ?
                        <Slider className="channelSlider" {...settings}>
                            {
                                this.state.data.map(item =>
                                    <div className="channelListDiv" key={item.slug} >
                                        <a 
                                         href={this.handleRedirect(item)}
                                            //onClick={(event)=>this.handleRedirect(event,item)
                                        >
                                    
                                            <img className="channelListImg" src={`${config.channelLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} alt={item.thumbnail} />
                                            <p className="channelListName">{item.name}</p>
                                            <div className="contentCategory">
                                                <img src={require('../../Assets/crown.png')} />
                                            </div>
                                        
                                        </a>
                                    </div>
                                )
                            }
                        </Slider>
                    : <Loader />
                    }
                <faderight className="channelRightFade"/>
                </div>
            </div>
        );
    }
}

export default withRouter(ChannelList);