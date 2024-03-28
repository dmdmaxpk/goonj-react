import React, { Component } from 'react';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import AxiosInstance from '../../Utils/AxiosInstance';
import config from '../../Utils/config';
import './Live.scss';
import Loader from '../../Components/Loader/Loader';

const API_URL = 'https://api.goonj.pk/v2/live';
const FREE_CHANNELS = [
    'film-world',
    'ltn-family',
    'aplus',
    'a1-entertainment',
    // 'Aruj-tv',
    // 'city-42',
    'mashriq-tv',
    'dawn-news',
    'pnn-news',
    '24_news',
    'neo-news',
    // 'gtv-news',
    // 'suchtv-news',
    // 'aaj-news',
    // 'express-entertainment',
    "mehran-tv",
    "aaj-entertainment",
    "city41-news",
    "rohi_tv",
    "metro1-news",
    "filmax",
    "makkah-live",
    "madina-live"
];

class LiveTv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isMta: false,
            isLightTheme: false
        }
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    componentDidMount(){
        /*AxiosInstance.get('/live')
        .then(res =>{
            this.setState({
                data: res.data
            })
        })
        .catch(err =>{
         
        })*/


        // MTA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");
        
        //mta
        if (this.source === 'mta' || this.source === 'mta2') {
            this.setState({ isMta: true });
            this.fetchData(); // Fetch MTA data when source is mta
        } else {
            this.setState({ isMta: false });
    
            // Fetch live-tv data when source is not mta
            AxiosInstance.get('/live')
                .then(res => {
                    this.setState({ data: res.data });
                })
                .catch(error => {
                    console.error('Error fetching live-tv data:', error);
                });
        }


        // MTA
        this.source = urlParams.get("source");

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
            // add hardcoded green channel object
            filteredItems.push(
                {
                    _id: "WcW2VDb",
                    ad_tag: "",
                    views_count: 2,
                    name: "Green TV Entertainment",
                    hls_link: "greenent.m3u8",
                    slug: "green-tv-ent",
                    thumbnail: "green-ent.jpg",
                    package_id: [
                    "QDfG",
                    "QDfC"
                    ],
                    seq: 492,
                    is_streamable: false,
                    category: "entertainment"
                }
            )
            filteredItems.sort((a, b) => {
                if(a.seq > b.seq) return 1;
                if(a.seq < b.seq) return -1;
                else return 0;
            })
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
        
        this.props.history.push(url); 
    };



    handleRedirect(item){
        console.log('handleRedirect - LiveTvList.js');
        let permission = localStorage.getItem('livePermission');
        let Urlmsisdn = localStorage.getItem('urlMsisdn');
        let url = permission === true ? `/channel/${item.slug}` : Urlmsisdn ? `/paywall/${item.slug !== 'pak-zim' ? 'live' : 'cricket'}?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=${item.slug}` : `${config.hepage}?slug=${item.slug}`;
        return url;
    }
    render(){
        let data = this.state.data;

        const { isLightTheme, isMta } = this.state;
        return(
            <GridContainer className="liveTvContainer">
                <GridItem xs={12} sm={12} md={12}>
                    {/*<p className="heading">Live Channels</p>*/}
                    <p className={`heading ${isLightTheme ? 'heading_mta2' : ''}`}>Live Channels</p>
                </GridItem>

                {data.length > 0 ?
                    data.map(item =>
                        <GridItem key={item.slug} xs={6} sm={4} md={2} className="liveGI">
                            {isMta ? (
                                // If isMta is true, use handleItemClick separately
                                <div onClick={() => this.handleItemClick(item)}>
                                    <img className="channelImg" src={`${config.channelLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} alt={item.thumbnail} />
                                    {/*<p className="channelName">{item.name}</p>*/}
                                    <p className={`channelName ${isLightTheme ? 'channelName_mta2' : ''}`}>{item.name}</p>
                                </div>
                            ) : (
                                // If isMta is false, use handleRedirect in href
                                <a href={this.handleRedirect(item)}>
                                    <img className="channelImg" src={`${config.channelLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} alt={item.thumbnail} />
                                    {/*<p className="channelName">{item.name}</p>*/}
                                    <p className={`channelName ${isLightTheme ? 'channelName_mta2' : ''}`}>{item.name}</p>
                                </a>
                            )}
                        </GridItem>
                    )
                :
                <GridItem className="loaderGI" xs={12} sm={12} md={12}>
                    <Loader />
                </GridItem>
                }
            </GridContainer>
        );
    }
}
 
export default LiveTv;