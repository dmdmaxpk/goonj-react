import React, { Component } from 'react';
import Plyr from 'plyr';
import config from '../../Utils/config';

class VideoPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("logo", this.props.location.state.logo);
        // Change the second argument to your options:
        // https://github.com/sampotts/plyr/#options
        const player = new Plyr('video', {captions: {active: true}});

        // Expose player so it can be used from the console
        window.player = player;
    }
    componentWillUnmount = () => {
        // this.player && this.player.dispose();
        // this.player = null;
    }

    render(){

        return(
                <div class="container">
                    <video controls crossorigin playsinline poster={`${config.channelLogoUrl}/${this.props.location.state.logo}`}>
                        <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" size="576" />
                            <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" type="video/mp4" size="720" />
                            <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4" type="video/mp4" size="1080" />

                            {/* <!-- Caption files --> */}
                            <track kind="captions" label="English" srclang="en" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
                                    default />
                            <track kind="captions" label="Français" srclang="fr" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt" />
                            {/* <!-- Fallback for browsers that don't support the <video> element --> */}
                            <a href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" download>Download</a>
                    </video>
                </div>

        );
    }
}
 
export default VideoPlayer;