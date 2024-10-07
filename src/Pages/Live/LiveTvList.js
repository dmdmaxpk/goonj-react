import React, { Component } from 'react';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import AxiosInstance from '../../Utils/AxiosInstance';
import config from '../../Utils/config';
import './Live.scss';
import Loader from '../../Components/Loader/Loader';
import GoogleAdBanner from '../../Components/MTA/GoogleAdBanner';

const API_URL = 'https://api.goonj.pk/v2/live';
const FREE_CHANNELS = [
    'film-world',
    'ltn-family',
    'aplus',
    'a1-entertainment',
    'lahorerang-news',
    'abn-news',
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
    "madina-live",
    'aan-tv',
    "kay2-tv",
    "bol-entertainment"
];

const newChannelLinks = [
    // {slug: 'Dunya News', newLink: 'https://dunyanews.tv/live/', thumbnail: 'dunya-news.png' },
    {slug: "G Tv", newLink:"https://live.gtvnewshd.com/livelan/stream.m3u8", thumbnail:"gtv.png"},
    {slug: "Jalwa", newLink:"https://www.mjunoon.tv/embedplayer/jalwa-tv-live.html", thumbnail:"jalwa.png"},
    // {slug: 'Lahore News', newLink: 'https://lahorenews.tv/live/', thumbnail: 'lahore-news.png' },
    {slug: "Suno News", newLink:"http://live.sunonews.tv:1935/sunotv/live/playlist.m3u8", thumbnail:"suno-news.png"},
    {slug: "8xm", newLink:"https://www.mjunoon.tv/embedplayer/8xm-live.html", thumbnail:"eightXM.png"},
    {slug: 'Khyber', newLink: 'https://mjunoon.tv/embedplayer/avt-khyber-tv-live.html', thumbnail:"khyber-tv.png" },
    {slug: "Khyber News", newLink:"https://mjunoon.tv/embedplayer/khyber-news-live.html", thumbnail:"khyber-news.png"},
    {slug: "K2", newLink:"https://www.mjunoon.tv/embedplayer/kay2-tv-live.html", thumbnail:"k2.png"},
    // {slug: "Raavi", newLink:"https://www.mjunoon.tv/embedplayer/kay2-tv-live.html", thumbnail: 'raavi'},
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
            let filteredItems = jsonData.filter(item => FREE_CHANNELS.includes(item.slug));
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
            );

            const customChannels = newChannelLinks.map((item, index) => {
                return {
                    _id: `${item?.slug}-${index}`,
                    ad_tag: "",
                    views_count: 0,
                    name: item?.slug,
                    hls_link: "",
                    slug: item?.slug,
                    thumbnail: item?.thumbnail,
                    package_id: [
                    "QDfG",
                    "QDfC"
                    ],
                    seq: index,
                    is_streamable: false,
                    category: "entertainment",
                    redirectLink: item?.newLink
                }
            });
            filteredItems = filteredItems?.concat(customChannels);
            
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
    
        let url= `/channel/${item.slug}?source=${this.source}&link=${encodeURIComponent(item?.redirectLink)}`;
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

    handleCustomChannelRedirect(link){
        this.props.history.push(`/channel/custom?source=mta&link=${link}`)
    }

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
                 {/* Top Google Ad Banner */}
                    <div style={{ margin: '1vh 1vw' }}>
                        <GoogleAdBanner
                            adUnitPath="/23081330779/goonj_web_top"
                            sizes={[[320, 100], [320, 50]]}
                            divId="div_goonj_web_top"
                            targeting={{ goonj_section: ['live'] }} // Replace 'live' with other sections as needed
                        />
                    </div> 
                </GridItem>

                {data.length > 0 ?
                    data.map(item =>
                        <GridItem key={item.slug} xs={6} sm={4} md={2} className="liveGI">
                            {isMta ? (
                                // If isMta is true, use handleItemClick separately
                                <div onClick={item?.redirectLink ? () => this.handleCustomChannelRedirect(item.redirectLink)  : ()=> this.handleItemClick(item)}>
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
                <div style={{margin: '1vh 1vw'}}>
                    <GoogleAdBanner
                        adUnitPath="/23081330779/goonj_web_body"
                        sizes={[[320, 100], [320, 50]]}
                        divId="div_goonj_web_body"
                        targeting={{ goonj_section: ['live'] }} // Replace 'home' with other sections as needed
                    />
                </div>
            </GridContainer>
        );
    }
}
 
export default LiveTv;