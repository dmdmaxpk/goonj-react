import React, { Component } from 'react';
import Plyr from 'plyr';
import config from '../../Utils/config';
import Hls from 'hls.js';

class VodVideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
        this.removeExtension = this.removeExtension.bind(this);
    }
    componentWillMount(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    componentDidMount(){
        console.log("data", this.props.data);
        let item = this.props.data;
        const source = this.props.data ? `//webvod.goonj.pk/${this.removeExtension(item.file_name)}_,baseline_144,main_360,main_480,.m4v.urlset/master.m3u8` : '';
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
    removeExtension(filename){
        let file = filename.split(".");
        console.log(file[0]);
        return file[0];
    }
    render(){
        let item = this.props.data;
        return(
                <div className="videoPlayerContainer" style={{width: "1200px", height: "500px", padding: "0 10%"}}>
                    {this.props.data ?
                    <video className="" autoPlay controls crossOrigin={true} playsInline poster={`${config.videoLogoUrl}/${item.thumbnail}`}>
                        {/* <source src={`//webvod.goonj.pk/${this.removeExtension(item.file_name)}_,baseline_144,main_360,main_480,.m4v.urlset/master.m3u8`} type='application/x-mpegURL' /> */}
                        {/* <!-- Caption files --> */}
                        <track kind="captions" label="Urdu" srcLang="ur" src="" default />
                        {/* <!-- Fallback for browsers that don't support the <video> element --> */}
                        <a href="" download>Download</a>
                    </video>
                    :''}
                </div>

        );
    }
}
 
export default VodVideoPlayer;