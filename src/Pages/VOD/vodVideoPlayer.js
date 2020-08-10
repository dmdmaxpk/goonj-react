import React, { Component } from 'react';
import Plyr from 'plyr';
import config from '../../Utils/config';
import Hls from 'hls.js';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import { Divider } from '@material-ui/core';
import SocialShare from '../../Components/SocialShare/SocialShare';
import RecommendationList from '../../Components/ListSections/RecommendationList';
import Loader from '../../Components/Loader/Loader';


class VodVideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state ={
            data: [],
            topics: '',
            limit: 10,
            recommendations: []
        }
        this.removeExtension = this.removeExtension.bind(this);
        this.kFormatter = this.kFormatter.bind(this);
        this.initializeVideoPlayer = this.initializeVideoPlayer.bind(this);
        this.showError = this.showError.bind(this)
    }
    componentWillMount(){
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
    }
    initializeVideoPlayer(){
        let item = this.props.data;
        const source = item ? `//webvod.goonj.pk/${this.removeExtension(item.file_name)}_,baseline_144,main_360,main_480,.m4v.urlset/master.m3u8` : '';
        const video = document.querySelector('video');
        
        const player = new Plyr(video, {captions: {active: true, update: true, language: 'en'}});
        if (!Hls.isSupported()) {
            video.src = source;
        } else {
            const hls = new Hls();
            hls.loadSource(source);
            hls.attachMedia(video);
            window.hls = hls;
            
            player.on('languagechange', () => {
                setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
            });
        }
        
        window.player = player;
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
        
        return(
            data.length !== 0 ?
                <GridContainer className="">
                    <GridItem xs={12} sm={12} md={12}>
                        {item ?
                            <GridContainer xs={12} sm={12} md={12} className="videoPlayerDiv">
                                <GridItem className="videoPlayerGI" xs={12} sm={12} md={7}>
                                    <video className="videoPlayer" autoPlay controls crossOrigin playsInline poster={`${config.videoLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} onError={this.showError} >
                                        <track kind="captions" label="Urdu" srcLang="ur" src="" default />
                                        <a href="" download>Download</a>
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
                                    <div>  {item.title}</div>
                                    </div>

                                   <div>
                                    <div className="views_text"> 
                                    {this.kFormatter(item.views_count)} views
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