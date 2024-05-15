import React, {Component} from "react";
import AxiosInstance from "../../Utils/AxiosInstance";
import config from "../../Utils/config";
import Heading from "../HomeSections/Heading";
// import './ListSections.scss';
import Slider from "react-slick";
import Loader from '../Loader/Loader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router-dom';
import { trackEvent } from '../../Utils/functions';

class ShortFilmsPlaylist extends Component{
    constructor(props){
        super(props);
        this.state={
            data:["Short films", "DW digital content"],
            channelClick: false,
            channelMetadata: undefined,
            isMta: false,
            isLightTheme: false,
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
            // this.fetchData(); // Fetch MTA data when source is mta
        } else {
            this.setState({ isMta: false });
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
    handleItemClick = (item) => {
        //console.log('Channel is:', item);
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
        trackEvent('Custom Event', `MTA_${item.slug}`, window.location.href);

        this.props.history.push(url); 
    };

    handleRedirect(item) {
        let permission = localStorage.getItem('livePermission');
        let Urlmsisdn = localStorage.getItem('urlMsisdn');
        let url = permission ? `/channel/${item.slug}` : Urlmsisdn ? `/paywall/${item.slug !== 'pak-zim' ? 'live' : 'cricket'}?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=${item.slug}` : `${config.hepage}?slug=${item.slug}`;
        return url;
    }
    //this.state.data.length > # of channels on slider ? # of channels on slider : this.state.data.length,
    render() {
        var settings = {
            dots: false,
            arrows: true,
            infinite: false,
            slidesToShow: this.state.data.length > 2 ? 2 : this.state.data.length,
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
        console.log("this is the response 1",this.state.data);

        return (
            <div className={this.props.class}>
                {console.log("This is the name of the class:", this.props.class)}
                abc {this.state.data.length}
                <Heading heading={this.props.heading} url={(this.state.isMta && this.state.isLightTheme) ? "/live-tv?source=mta2" : ((this.state.isMta) && (!this.state.isLightTheme)) ? "/live-tv?source=mta" : "/live-tv"} 
                classname={this.props.classname + " " + (this.props.class ? this.props.class : "")} category="Short Films" />
                <div className={"channelListContainer channelContainerMargin position-relative " + this.props.pageMargin}>
                    <fadeleft className="channelLeftFade" />
                    <Slider className="channelSlider" {...settings}>
                        {this.state?.data?.map((item, index) => (
                        <div className="channelListDiv" key={index} onClick={() => this.handleItemClick(item)}>
                            <img className="channelListImg" src={item.thumbnail} alt={item?.name} />
                            <p className={`channelListName ${isLightTheme ? 'channelListName_mta2' : ''}`}>{item?.name}</p>
                        </div>
                    ))}
                    </Slider>
                    <faderight className="channelRightFade" />
                </div>
            </div>
        );

    }
}

export default withRouter(ShortFilmsPlaylist);

