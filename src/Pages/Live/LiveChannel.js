import React, { Component } from 'react';
import VideoPlayer from '../../Components/Player/VideoPlayer';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';

class LiveChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.slug !== nextProps.match.params.slug) {
            window.location.reload();
        }
    }

    render(){
        const data = this.props.location.state.data;
        // console.log("channelData", data);
        return(
            <div style={{marginTop: "3%"}}>
                <VideoPlayer data={data} /> <br /><br />
                <ChannelList />
                <PopularList title="Popular on Goonj" />
            </div>
        );
    }
}
 
export default LiveChannel;