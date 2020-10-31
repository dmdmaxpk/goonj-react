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
            // height: '390',
            width: '70vw',
            
          };
        return(
            <div className="videoPlayerContainer">
                <div>
                    <YouTube 
                        videoId="gerRFlEcXM8"
                        className="ytVP"
                        // onReady={this._onReady} 
                    />
                </div>
                <div className="title_div">
                    <div className="title_hashTag_and_heading channelTitle"> 
                        <div style={{textTransform: "capitalize"}}>FFCS - Pakistan Qualifier</div>
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
 
export default YoutubePlayer;