import React, { Component } from 'react';
import videojs from 'video.js';
import Player from 'griffith';


import config from '../../Utils/config';

class VideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("logo", this.props.location.state.logo);


    }
    componentWillUnmount = () => {
        this.player && this.player.dispose();
        this.player = null;
    }

    render(){
        const sources = {
            hd: {
                bitrate: 905,
                size: 10105235,
                duration: 89,
                format: 'm3u8',
                width: 640,
                height: 480,
                play_url:
                  'http://teststream.goonj.pk/samaaweb.m3u8',
            },
            sd: {
                bitrate: 580,
                size: 6531802,
                duration: 89,
                format: 'm3u8',
                width: 320,
                height: 240,
                play_url:
                  'http://teststream.goonj.pk/samaaweb.m3u8',
            },
          };
          const props = {
            id: 'testVideo',
            title: 'testVideo',
            standalone: true,
            cover: `${config.channelLogoUrl}/${this.props.location.state.logo}`,
            duration: 89,
            sources,
            shouldObserveResize: true,
          }
        return(
            <div style={{width: "200px !important"}}>
                <Player {...props} />
            </div>
            // <div alt="snap"
            //     key="media"
            //     style={ this.props.style }
            //     data-vjs-player>

            //     <video playsInline
            //         className="video-js"
            //         preload="auto"
            //         controls
            //         src="http://teststream.goonj.pk/samaaweb.m3u8"
            //         autoPlay={true}
            //         poster={`${config.channelLogoUrl}/${this.props.location.state.logo}`}
            //         // ref={ r => { this.videoNode = r; } } 
            //         />

            //         {/* <source controls autoplay src="http://teststream.goonj.pk/samaaweb.m3u8" type="application/x-mpegURL" /> */}

            //     {/* </video> */}
            // </div>
        );
    }
}
 
export default VideoPlayer;