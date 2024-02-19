import React, { Component } from 'react';
import config from '../../Utils/config';
import './LiveVP.scss';
import SocialShare from '../SocialShare/SocialShare';

import YouTube from 'react-youtube';

class YoutubePlayer extends Component {
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
        
    }
    kFormatter(num) {
        let kFormat = Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
        return kFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render(){
        const opts = {
            height: '50vh',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
              },        
            
          };
        return(
            <div className="videoPlayerContainer">
                <div>
                    <YouTube 
                        videoId={this.props.videoId}
                        className="ytVP"
                        opts={opts}
                        // onReady={this._onReady} 
                    />
                </div>
                <div className="title_div" style={{marginBottom: '2vh'}}>
                    <div className="title_hashTag_and_heading channelTitle"> 
                        <div style={{textTransform: "capitalize"}}>{this.props.title}</div>
                    </div>

                    <div>
                        {/* <div className="views_text"> 
                            {this.kFormatter(data.views_count)} views
                        </div >   */}
                        {this.props?.source === 'mta' ?
                            null
                        :
                            <SocialShare />
                        }
                    </div> 
                </div>
            </div>
        );
    }
}
 
export default YoutubePlayer;