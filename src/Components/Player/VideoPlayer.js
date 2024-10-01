import React, { Component } from 'react';
import config from '../../Utils/config';
import './LiveVP.scss';
import akamai_auth from 'akamai-edge-auth-generator';
import AxiosInstance from '../../Utils/AxiosInstance';
import Loader from '../Loader/Loader';
import SocialShare from '../SocialShare/SocialShare';
import ReactGA from 'react-ga';
import videojs from 'video.js';
import 'videojs-contrib-ads';
import 'videojs-ima';
import './videojs.css';

ReactGA.initialize('G-2TG6PV2GL9')

class VideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            thumbnail: '',
            urlLink: config.liveStreamUrl,
            source: '',
            isMta: false,
            isLightTheme: false
        }
        this.kFormatter = this.kFormatter.bind(this);
        this.goBackClickHandler = this.goBackClickHandler.bind(this);
    }
    UNSAFE_componentWillMount(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    componentDidMount(){
        AxiosInstance.get(`/live?slug=${this.props.slug}`)
        .then(res =>{
            let data = res.data[0];
            this.setState({data, thumbnail: data.thumbnail}, function(){
                akamai_auth.setConfig({
                    algo: "SHA256",
                    key: config.streamKey,
                    window: 500,
                    acl: '/*',
                    start_time: 0,
                });
                let generatedToken = akamai_auth.generateToken();
                let token = generatedToken;

                let source = '';
                console.log("isMTA value:",this.state.isMta);
                // Conditionally include quality setting '360p' for MTA source
                if (this.state.isMta) {
                    let qualitySetting =  '360p'; 
                    let hlsLinkWithQuality = `${this.state.data.hls_link.replace('.m3u8', `_${qualitySetting}/index.m3u8`)}`;

                    if (this.props.slug === 'a1-entertainment') {
                        source = 'https://sscsott.com/pk/A1GE/index.m3u8';
                    } else {
                        source = `${this.state.urlLink}/${hlsLinkWithQuality}?hdnts=${token}&msisdn=${localStorage.getItem('liveMsisdn')}&uid=${localStorage.getItem('userID')}`;
                    }
                }
                else{
                    source = `${this.state.urlLink}/${this.state.data.hls_link}?hdnts=${token}&msisdn=${localStorage.getItem('liveMsisdn')}&uid=${localStorage.getItem('userID')}`;
                }
                console.log("URL is : ", source);
                this.setState({source});

                videojs.options.hls.overrideNative = true;
                videojs.options.html5.nativeAudioTracks = false;
                videojs.options.html5.nativeVideoTracks= false
                
                videojs.Hls.xhr.beforeRequest = function(options){
                    options.uri = `${options.uri}?msisdn=${localStorage.getItem('liveMsisdn')}&uid=${localStorage.getItem('userID')}`;
                    return options;
                };
                console.log('initiating player...')
                this.player = videojs(this.videoNode, {errorDisplay: false}, function onPlayerReady() {
                    if (this.ads) {
                        // this.ads(); // Ensure the ads plugin is initialized
                        this.ima({
                            id: 'content_video',
                            adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
                            debug: true,
                        });
                        console.log('this.player.ads', this.ima)
                        if (this.player.ads) {
                            this.player.ads.requestAds();
                        } else {
                            console.error('Ads plugin is not initialized.');
                        }
                    } else {
                        console.error('Ads plugin is not available.');
                    }
                });
                
                this.player.src({
                    src: source,
                    type: "application/x-mpegURL",
                    withCredentials: true
                });

                this.player.on('ads-ad-started', () => {
                    console.log('Ad started');
                });
                  
                  this.player.on('ads-ad-ended', () => {
                    console.log('Ad ended');
                });
                  
                  this.player.on('adserror', (error) => {
                    console.error('Ad error:', error);
                });

                //   window.xhook.before((request, callback) => {
                //     // only set header request for the videojs src url (don't touch other xhr requests)
                //     // if (request.url === SOME_VIDEO_URL) {
                //       request.xhr.setRequestHeader('User-Agent', `msisdn_${localStorage.getItem('liveMsisdn')}`);
                //     // }
                //     callback();
                //   });
            })
   
        })
        .catch(err =>{
        })

        // MTA2
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");

         // Theme checks
         if(this.source === 'mta2'){
            this.setState({isLightTheme: true});
        }
        else{
         this.setState({isLightTheme: false});
        }

        // Mta check
        if(this.source === 'mta'){
            this.setState({isMta: true});
        }
        else{
            this.setState({isMta: false});
        }
       
    }

    kFormatter(num) {
        let kFormat = Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
        return kFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    goBackClickHandler() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");

        if(this.source === 'mta' || this.source === 'mta2'){
            window.location.href = `/?source=${this.source}`;
        }
    }

    render(){
        let {data} = this.state;
        const { isLightTheme, isMta } = this.state;
        return(
            this.state.data.length !== 0 ? 
            <div className='container'>
                <div className="videoPlayerContainer">
                    {   
                    /*
                        //this.state.isMta === true ? (<button onClick={this.goBackClickHandler} className="mta_player_header">Go Back</button>) : ""
                        //this.state.isMta === true ? (<button onClick={this.goBackClickHandler} className={`mta_player_header ${isLightTheme ? 'mta2_player_header' : ''}` }>Go Back</button>) : ""
                        this.state.isMta === true ? (
                            <div
                                onClick={this.goBackClickHandler}
                                className={`mta_player_header ${isLightTheme ? 'mta_player_header' : ''}`}
                                style={{ fontSize: '50px', color: '#ABEA1F' }}
                            >
                                &larr;
                            </div>
                        ) : ''
                    */   
                    }
                    <div>
                        <video ref={ node => this.videoNode = node } id='channel-player' className="video-js vjs-16-9" autoPlay controls poster={`${config.channelLogoUrl}/${this.state.thumbnail.split(".")[0]}.jpg`} data-setup={{"fluid": true, "autoplay": true, "preload": "none"}} webkit-playsinline>
                            <source src={this.state.source} />
                            <a href="" download>Download</a>
                        </video>
                    </div>
                    <div className="title_div">
                        <div className="title_hashTag_and_heading channelTitle " style={{ color: isLightTheme ? '#87CEEB' : 'white' }}> 
                            <div>{data.name}</div>
                        </div>

                        <div>
                            <div className="views_text" style={{ color: isLightTheme ? '#87CEEB' : 'white' }}> 
                                {this.kFormatter(data.views_count)} views
                            </div >  
                            {!isMta && <SocialShare />}
                        </div> 
                    </div>
                </div>
            </div>    
            :
            <Loader />
        );
    }
}
 
export default VideoPlayer;

// import videojs from 'video.js';
// import 'videojs-contrib-ads'; // Import ads plugin
// import 'videojs-ima'; // Import IMA plugin
// import 'video.js/dist/video-js.css'; // Ensure you have video.js styles

// class VideoPlayer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.videoNode = React.createRef(); // Create a ref for the video node
//     }

//     componentDidMount() {
//         // Initialize the video.js player
//         this.player = videojs(this.videoNode.current, { 
//             errorDisplay: false 
//         }, function onPlayerReady() {
//             console.log('Player is ready, initializing ads...');
//             // Initialize ads plugin
//             if (this.ads) {
//                 // this.ads(); // Ensure the ads plugin is initialized
//                 this.ima({
//                     id: 'content_video',
//                     adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=', // Your ad URL
//                     debug: true,
//                 });
//                 if (this.player.ads) {
//                     this.player.ads.requestAds();
//                 } else {
//                     console.error('Ads plugin is not initialized.');
//                 }
//             } else {
//                 console.error('Ads plugin is not available.');
//             }
//         });
        
//         // Set the video source
//         this.player.src({
//             src: 'your-video-url.m3u8', // Replace with your video source
//             type: 'application/x-mpegURL', // Replace with your video type
//         });
//     }

//     componentWillUnmount() {
//         if (this.player) {
//             this.player.dispose(); // Dispose of the player on unmount
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <video ref={this.videoNode} className="video-js vjs-16-9" />
//             </div>
//         );
//     }
// }

// export default VideoPlayer;
