//NewsChannelList.js
import React, { Component } from 'react';
import AxiosInstance from "../../Utils/AxiosInstance";
import config from '../../Utils/config';
import Heading from '../HomeSections/Heading';
import './ListSections.scss';
import Slider from "react-slick";
import Loader from '../Loader/Loader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

ReactGA.initialize('G-2TG6PV2GL9'); 

const API_URL = 'https://api.goonj.pk/v2/live';
const FREE_CHANNELS = ['film-world', 'ltn-family', 'aplus', 'a1-entertainment', 'Aruj-tv', 'express-entertainment'];

class EntertainmentChannelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            channelClick: false,
            channelMetadata: undefined,
            isMta: false,
            isLightTheme: false
        };
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    componentDidMount() {
        // MTA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");
        
        if (this.source === 'mta' || this.source === 'mta2') {
            this.setState({ isMta: true });
            this.fetchData(); // Fetch MTA data when source is mta
        } else {
            this.setState({ isMta: false });
    
            // Fetch live-tv data when source is not mta
            AxiosInstance.get('/live')
                .then(res => {
                    // Filter channels based on the 'category' field
                    const newsChannels = res.data.filter(channel => channel.category === 'entertainment');
                    this.setState({ data: newsChannels });
                })
                .catch(error => {
                    console.error('Error fetching live-tv data:', error);
                });
        }

        // Theme checks
        if(this.source === 'mta2'){
            this.setState({isLightTheme: true});
        }
        else{
            this.setState({isLightTheme: false});
        }
    }
    
    

    // MTA
    fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const jsonData = await response.json();
            const filteredItems = jsonData.filter(item => FREE_CHANNELS.includes(item.slug));
            this.setState({ data: filteredItems });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // MTA 
    handleItemClick = (item) => {
        console.log('Channel is:', item);
        this.setState({ channelMetadata: item, channelClick: true });
        // MTA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");
    
        let url= ``;
        if(this.source === 'mta'){
            console.log('HandleItemClick -ChannelList.js');
            localStorage.setItem('mta', true);
            url = `/channel/${item.slug}?source=mta`;
        }
        else if(this.source === 'mta2'){
            console.log('HandleItemClick -ChannelList.js');
            localStorage.setItem('mta2', true);
            url = `/channel/${item.slug}?source=mta2`;
        }
        
        // Create custom events for MTA channels
        console.log(`MTA-${item.slug} event triggered`);
            ReactGA.event({
                category: 'Custom Event',
                action: `MTA_${item.slug}`,
                label: window.location.href // Include the page location in the 'label' parameter
            });

        this.props.history.push(url); 
    };

    handleRedirect(item) {
        let permission = localStorage.getItem('livePermission');
        let Urlmsisdn = localStorage.getItem('urlMsisdn');
        let url = permission ? `/channel/${item.slug}` : Urlmsisdn ? `/paywall/${item.slug !== 'pak-zim' ? 'live' : 'cricket'}?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=${item.slug}` : `${config.hepage}?slug=${item.slug}`;
        return url;
    }

    render() {
        var settings = {
            dots: false,
            arrows: true,
            infinite: false,
            slidesToShow: this.state.data.length > 6 ? 6 : this.state.data.length,
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

        const { isLightTheme } = this.state;

        return (
            <div className={this.props.class}>
                <Heading heading="Live Channels" url={(this.state.isMta && this.state.isLightTheme) ? "/live-tv?source=mta2" : ((this.state.isMta) && (!this.state.isLightTheme)) ? "/live-tv?source=mta" : "/live-tv"} 
                classname={this.props.classname + " " + (this.props.class ? this.props.class : "")} category="Entertainment Channels" />
                <div className={"channelListContainer channelContainerMargin position-relative " + this.props.pageMargin}>
                    <fadeleft className="channelLeftFade" />
                    {this.state.data.length > 0 && this.state.isMta === false ? ( // Conditionally render the slider
                        <Slider className="channelSlider" {...settings}>
                            {this.state.data.map((item) => (
                                <div className="channelListDiv" key={item.slug}>
                                    <a href={this.handleRedirect(item)}>
                                        <img className="channelListImg" src={`${config.channelLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} alt={item.thumbnail} />
                                        {/*<p className="channelListName">{item.name}</p>*/}
                                        <p className={`channelListName ${isLightTheme ? 'channelListName_mta2' : ''}`}>{item.name}</p>
                                        <div className="contentCategory">
                                            <img src={require('../../Assets/crown.png')} alt="Crown" />
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        this.state.isMta === true ? (
                        <Slider className="channelSlider" {...settings}>
                            {this.state.data.map((item) => (
                            <div className="channelListDiv" key={item.slug} onClick={() => this.handleItemClick(item)}>
                                <img className="channelListImg" src={`${config.channelLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} alt={item.thumbnail} />
                                {/*<p className="channelListName">{item.name}</p>*/}
                                <p className={`channelListName ${isLightTheme ? 'channelListName_mta2' : ''}`}>{item.name}</p>
                                {/*<div className="contentCategory">
                                    <img src={require('../../Assets/crown.png')} alt="Crown" />
                                </div>*/}
                            </div>
                        ))}
                        </Slider>)
                            : null  
                    )}
                    <faderight className="channelRightFade" />
                </div>
            </div>
        );


    }
}

export default withRouter(EntertainmentChannelList);
