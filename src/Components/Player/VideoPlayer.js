import React, { Component } from 'react';
import Plyr from 'plyr';
import config from '../../Utils/config';
import Hls from 'hls.js';

import akamai_auth from 'akamai-edge-auth-generator';

class VideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {  }
    }
    componentWillMount(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    componentDidMount(){
        console.log("logo", this.props.logo);

        akamai_auth.setConfig({
            key: "4db8dd0a0cf9271e4f7fe2fe8ded6fe3",
            window: 500,
            acl: '/*', //optional
            // session_id:{id}, //optional
            // url: {url}, //optional
          });
        let generatedToken = akamai_auth.generateToken();
        let token = "hdnts=" + generatedToken;
        console.log("hdnts=" + token);
        const source = `http://teststream.goonj.pk/samaaweb.m3u8?${token}`;
        const video = document.querySelector('video');
        
        // For more options see: https://github.com/sampotts/plyr/#options
        // captions.update is required for captions to work with hls.js
        const player = new Plyr(video, {captions: {active: true, update: true, language: 'en'}});
        
        if (!Hls.isSupported()) {
            video.src = source;
        } else {
            // For more Hls.js options, see https://github.com/dailymotion/hls.js
            const hls = new Hls();
            hls.loadSource(source);
            hls.attachMedia(video);
            window.hls = hls;
            
            // Handle changing captions
            player.on('languagechange', () => {
                // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
                setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
            });
        }
        
        // Expose player so it can be used from the console
        // window.player = player;
    }

    render(){
        return(
                <div className="videoPlayerContainer" style={{width: "1200px", height: "500px", padding: "0 10%"}}>
                    <video className="" autoPlay controls crossOrigin={true} playsInline poster={`${config.channelLogoUrl}/${this.props.logo}`}>
                        {/* <source src="http://teststream.goonj.pk/samaaweb.m3u8" type="video/m3u8" size="1080" /> */}
                        {/* <!-- Caption files --> */}
                        <track kind="captions" label="Urdu" srcLang="ur" src="" default />
                        {/* <!-- Fallback for browsers that don't support the <video> element --> */}
                        <a href="" download>Download</a>
                    </video>
                </div>

        );
    }
}
 
export default VideoPlayer;