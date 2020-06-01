import React, { Component } from 'react';
import VideoPlayer from '../Player/VideoPlayer';

class LiveChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render(){ 
        return(
            <div>
                <VideoPlayer />
            </div>
        );
    }
}
 
export default LiveChannel;