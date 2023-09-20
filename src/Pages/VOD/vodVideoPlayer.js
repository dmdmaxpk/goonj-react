import React, { Component } from 'react';
import config from '../../Utils/config';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import { Divider } from '@material-ui/core';
import SocialShare from '../../Components/SocialShare/SocialShare';
import RecommendationList from '../../Components/ListSections/RecommendationList';
import Loader from '../../Components/Loader/Loader';
import videojs from 'video.js';
import '../../Components/Player/videojs.css';

class VodVideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state ={
            data: [],
            topics: '',
            limit: 10,
            recommendations: [],
            isLightTheme: false
        }
        this.removeExtension = this.removeExtension.bind(this);
        this.kFormatter = this.kFormatter.bind(this);
        this.initializeVideoPlayer = this.initializeVideoPlayer.bind(this);
        this.showError = this.showError.bind(this)
    }
    UNSAFE_componentWillMount(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    kFormatter(num) {
        let kFormat = Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
        return kFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    componentDidMount(){
        this.initializeVideoPlayer();

        // MTA
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
    }
    initializeVideoPlayer(){
        let item = this.props.data;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const isMta2 = urlParams.get("source") === "mta2";

        const source = item ? `//webvod.goonj.pk/vod/${this.removeExtension(item.file_name)}_,baseline_144,main_360,main_480,.m4v.urlset/master.m3u8` : '';

        const video = document.querySelector('video');
        
        // const player = new Plyr(video, {captions: {active: true, update: true, language: 'en'}});
        // if (!Hls.isSupported()) {
        //     video.src = source;
        // } else {
        //     const hls = new Hls();
        //     hls.loadSource(source);
        //     hls.attachMedia(video);
        //     console.log(player.hls)
        //     window.hls = hls;
            
        //     player.on('languagechange', () => {
        //         setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
        //         player.source = player.source + `msisdn=${localStorage.getItem('liveMsisdn')}`
        //     });
        // }
        
        // window.player = player;

        videojs.options.hls.overrideNative = true;
        videojs.options.html5.nativeAudioTracks = false;
        videojs.options.html5.nativeVideoTracks= false
        
        videojs.Hls.xhr.beforeRequest = function(options){
            options.uri = `${options.uri}?msisdn=${localStorage.getItem('liveMsisdn')}&uid=${localStorage.getItem('userID')}&category=${item.category}&video_id=${item._id}`;
            return options;
        };
        
        this.player = videojs(this.videoNode, {errorDisplay: false}, this.props, function onPlayerReady() {
        });

        this.player.src({
            src: source,
        });
    }
    removeExtension(filename){
        let file = filename.split(".");
        return file[0];
    }
    showError(){
        this.initializeVideoPlayer();
    }
    

    render(){
        let {topics, data} = this.props;
        let item = data;

        const { isLightTheme } = this.state;
        
        return(
            data.length !== 0 ?
                <GridContainer className="">
                    <GridItem xs={12} sm={12} md={12}>
                        {item ?
                            <GridContainer xs={12} sm={12} md={12} className="videoPlayerDiv">
                                <GridItem className="videoPlayerGI" xs={12} sm={12} md={7}>
                                    <video ref={ node => this.videoNode = node } id='channel-player' className="videoPlayer video-js vjs-16-9" autoPlay controls crossOrigin playsInline poster={`${config.videoLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} onError={this.showError} >
                                        {/* <track kind="captions" label="Urdu" srcLang="ur" src="" default />
                                        <a href="" download>Download</a> */}
                                    </video>

                                <GridItem className="topicGI" xs={12} >
                                <div className="title_div">
                                   <div className="title_hashTag_and_heading"> 
                                       <div className="title_hashTag">
                                        {topics ?
                                            topics.map(topic =>
                                                <p key={item._id} className="hashtagTopic">#{topic}</p>
                                            )
                                            :
                                            ''
                                        }</div>
                                        <div style={{ color: isLightTheme ? "#87CEEB" : "white" }}>{item.title}</div>
                                    </div>

                                   <div>
                                    <div className="views_text"> 
                                    {/* {this.kFormatter(item.views_count)} views */}
                                    </div >  
                                    <SocialShare />
                                    </div> 

                                </div>
                                </GridItem>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5} className="recommendationGI">
                                    <RecommendationList topics={topics} id={item._id} />
                                </GridItem>
                               
                                
                                <Divider />
                            </GridContainer>
                        :''}
                    </GridItem>
                </GridContainer>
            :
            <Loader />
        );
    }
}
 
export default VodVideoPlayer;