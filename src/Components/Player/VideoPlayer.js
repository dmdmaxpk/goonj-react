import React, { Component } from 'react';
import config from '../../Utils/config';
import './LiveVP.scss';
import akamai_auth from 'akamai-edge-auth-generator';
import AxiosInstance from '../../Utils/AxiosInstance';
import Loader from '../Loader/Loader';
import SocialShare from '../SocialShare/SocialShare';
import videojs from 'video.js';
import './videojs.css';
import ReactGA from 'react-ga';

ReactGA.initialize('G-2TG6PV2GL9')

class VideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            thumbnail: '',
            urlLink: config.liveStreamUrl,
            source: '',
            isMta: false
        }
        this.kFormatter = this.kFormatter.bind(this);
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
                const source = `${this.state.urlLink}/${this.state.data.hls_link}?hdnts=${token}&msisdn=${localStorage.getItem('liveMsisdn')}&uid=${localStorage.getItem('userID')}`;
                this.setState({source});

                videojs.options.hls.overrideNative = true;
                videojs.options.html5.nativeAudioTracks = false;
                videojs.options.html5.nativeVideoTracks= false
                
                videojs.Hls.xhr.beforeRequest = function(options){
                    options.uri = `${options.uri}?msisdn=${localStorage.getItem('liveMsisdn')}&uid=${localStorage.getItem('userID')}`;
                    return options;
                };
                
                this.player = videojs(this.videoNode, {errorDisplay: false}, this.props, function onPlayerReady() {
                });

                this.player.src({
                    src: source,
                    type: "application/x-mpegURL",
                    withCredentials: true
                  });

                //   window.xhook.before((request, callback) => {
                //     // only set header request for the videojs src url (don't touch other xhr requests)
                //     // if (request.url === SOME_VIDEO_URL) {
                //       request.xhr.setRequestHeader('User-Agent', `msisdn_${localStorage.getItem('liveMsisdn')}`);
                //     // }
                //     callback();
                //   });
            })

            const urlParams = new URLSearchParams(window.location.search);
            this.setState({isMta: urlParams.get("source") === 'mta' ? true : false});
        })
        .catch(err =>{
        })
    }

    kFormatter(num) {
        let kFormat = Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
        return kFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    goBackClickHandler() {
       // window.location = 'https://goonj.pk//?source=mta'; //production area url
        window.location = 'http://localhost:3000/?source=mta'; //local area url
    }

    render(){
        let {data} = this.state;
        return(
            this.state.data.length !== 0 ? 
                <div className="videoPlayerContainer">
                    {
                        this.state.isMta === true ? (<button onClick={this.goBackClickHandler} className="mta_player_header">Go Back</button>) : ""
                    }
                    <div>
                        <video ref={ node => this.videoNode = node } id='channel-player' className="video-js vjs-16-9" autoPlay controls poster={`${config.channelLogoUrl}/${this.state.thumbnail.split(".")[0]}.jpg`} data-setup={{"fluid": true, "autoplay": true, "preload": "none"}} webkit-playsinline>
                            <source src={this.state.source} />
                            <a href="" download>Download</a>
                        </video>
                    </div>
                    <div className="title_div">
                        <div className="title_hashTag_and_heading channelTitle"> 
                            <div>{data.name}</div>
                        </div>

                        <div>
                            <div className="views_text"> 
                                {this.kFormatter(data.views_count)} views
                            </div >  
                            <SocialShare />
                        </div> 
                    </div>
                </div>
            :
            <Loader />
        );
    }
}
 
export default VideoPlayer;