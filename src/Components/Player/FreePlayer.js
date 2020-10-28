import React, { Component } from 'react';
import config from '../../Utils/config';
import './LiveVP.scss';
import akamai_auth from 'akamai-edge-auth-generator';
import SocialShare from '../SocialShare/SocialShare';
import videojs from 'video.js';
import './videojs.css';

class FreePlayer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            thumbnail: '',
            urlLink: config.liveStreamUrl,
            source: ''
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
        akamai_auth.setConfig({
            algo: "SHA256",
            key: config.streamKey,
            window: 500,
            acl: '/*',
            start_time: 0,
        });
        let generatedToken = akamai_auth.generateToken();
        let token = generatedToken;
        const source = `${this.state.urlLink}/zesl2020.m3u8?hdnts=${token}`;
        this.setState({source});

        this.player = videojs(this.videoNode, {errorDisplay: false}, this.props, function onPlayerReady() {
        });

        this.player.src({
            src: source,
            type: "application/x-mpegURL",
            withCredentials: true
        });
    }
    kFormatter(num) {
        let kFormat = Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
        return kFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render(){
        return(
            <div className="videoPlayerContainer">
                <div>
                    <video ref={ node => this.videoNode = node } id='channel-player' className="video-js vjs-16-9" autoPlay controls poster='' data-setup={{"fluid": true, "autoplay": true, "preload": "none"}} webkit-playsinline>
                        <source src={this.state.source} />
                        {/* <a href="" download>Download</a> */}
                    </video>
                </div>
                <div className="title_div">
                    <div className="title_hashTag_and_heading channelTitle"> 
                        <div style={{textTransform: "capitalize"}}>Zahoor Elahi T20 League</div>
                    </div>

                    <div>
                        {/* <div className="views_text"> 
                            {this.kFormatter(data.views_count)} views
                        </div >   */}
                        <SocialShare />
                    </div> 
                </div>
            </div>
        );
    }
}
 
export default FreePlayer;