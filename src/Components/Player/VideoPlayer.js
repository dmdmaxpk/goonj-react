import React, { Component } from 'react';
// import Plyr from 'plyr';
import config from '../../Utils/config';
import Hls from 'hls.js';
import './LiveVP.scss';
import akamai_auth from 'akamai-edge-auth-generator';
import AxiosInstance from '../../Utils/AxiosInstance';
import Loader from '../Loader/Loader';
import SocialShare from '../SocialShare/SocialShare';
import Akamai from 'akamai-auth-token';
import videojs from 'video.js';
import "video.js/dist/video-js.css";

class VideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            thumbnail: '',
            urlLink: "//kaios.streamax.io",
            source: ''
        }
        this.kFormatter = this.kFormatter.bind(this);
    }
    componentWillMount(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    componentDidMount(){
        var config = {
            algorithm : 'SHA256',
            acl : '/*',
            window : 5000,
            key : "72fb58000a0d1561f60da877b5a009fb",
            encoding: false
       };
    
        var akamai = new Akamai(config),
        token = akamai.generateToken();
        console.log("token", token);

        AxiosInstance.get(`/live?slug=${this.props.slug}`)
        .then(res =>{
            console.log("channel", res.data);
            let data = res.data[0];
            this.setState({data, thumbnail: data.thumbnail}, function(){
                console.log(this.state.data);
                akamai_auth.setConfig({
                    algo: "SHA256",
                    key: "72fb58000a0d1561f60da877b5a009fb",
                    window: 500,
                    acl: '/*', //optional
                    start_time: 0,
                    // session_id:{id}, //optional
                    // url: {url}, //optional
                });
                let generatedToken = akamai_auth.generateToken();
                let token = generatedToken;
                const source = `${this.state.urlLink}/${this.state.data.hls_link.split('.')[0]}_360p/index.m3u8?hdnts=${token}`;
                console.log("url", source);
                this.setState({source});

                this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
                    console.log('onPlayerReady', this)
                });

                this.player.src({
                    src: source,
                    type: "application/x-mpegURL",
                    withCredentials: true
                  });
                

                // const video = document.querySelector('video');
                
                // For more options see: https://github.com/sampotts/plyr/#options
                // captions.update is required for captions to work with hls.js
                // const player = new Plyr(video, {captions: {active: true, update: true, language: 'en'}});
                
                // if (!Hls.isSupported()) {
                //     video.src({
                //         src: source,
                //         type: "application/x-mpegURL",
                //         withCredentials: true
                //       });
                // } else {
                //     // For more Hls.js options, see https://github.com/dailymotion/hls.js
                //     const hls = new Hls();
                //     hls.loadSource(source);
                //     hls.attachMedia(video);
                //     window.hls = hls;
                    
                //     // Handle changing captions
                //     player.on('languagechange', () => {
                //         // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
                //         setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
                //     });
                // }
                // Expose player so it can be used from the console
                // window.player = player;
        })
    })
    .catch(err =>{
        console.log(err);
    })
    }
    kFormatter(num) {
        let kFormat = Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
        return kFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render(){
        let {data} = this.state;
        return(
            this.state.data.length !== 0 ? 
                <div className="videoPlayerContainer" style={{width: "1200px", height: "500px", padding: "0 10%"}} data-vjs-player>
                    <video ref={ node => this.videoNode = node } id='channel-player' className="liveVP" controls poster={`${config.channelLogoUrl}/${this.state.thumbnail.split(".")[0]}.jpg`} data-setup='{"fluid": true, "autoplay": false, "preload": none}' webkit-playsinline>
                        {/* <source src={this.state.source} type="application/x-mpegURL"  /> */}
                        {/* <!-- Caption files --> */}
                        <track kind="captions" label="Urdu" srcLang="ur" src="" default />
                        {/* <!-- Fallback for browsers that don't support the <video> element --> */}
                        <a href="" download>Download</a>
                    </video>
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