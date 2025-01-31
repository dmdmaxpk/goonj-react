import React, { Component } from 'react';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import { withRouter } from 'react-router-dom';
import YoutubePlayer from '../../Components/Player/YoutubePlayer';

class YoutubeChannel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            status: false,
            loading: true
         }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.slug !== nextProps.match.params.slug) {
            window.location.reload();
        }
    }
    componentDidMount(){
    }

    render(){
        // const slug = this.props.match.params.slug;
        return(
            <div style={{marginTop: "3%"}}>
                <YoutubePlayer />
                <div className="liveChannelMarginLeft">
                <ChannelList classname="liveChannel"/>
                <PopularList title="Latest on Goonj" classname="liveChannel"  />
                </div>
            </div>
        );
    }
}
 
export default withRouter(YoutubeChannel);