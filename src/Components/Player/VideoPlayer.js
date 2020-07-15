import React, { Component } from 'react';
import config from '../../Utils/config';
import './LiveVP.scss';
import akamai_auth from 'akamai-edge-auth-generator';
import AxiosInstance from '../../Utils/AxiosInstance';
import Loader from '../Loader/Loader';
import SocialShare from '../SocialShare/SocialShare';
import videojs from 'video.js';
import './videojs.css';

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
                <div className="videoPlayerContainer">
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