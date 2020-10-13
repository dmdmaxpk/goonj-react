import React, { Component } from 'react';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import { withRouter } from 'react-router-dom';
import FreePlayer from '../../Components/Player/FreePlayer';

class FreeChannel extends Component {
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
                <FreePlayer />
                <div className="liveChannelMarginLeft">
                <ChannelList classname="liveChannel"/>
                <PopularList title="Popular on Goonj" classname="liveChannel"  />
                </div>
            </div>
        );
    }
}
 
export default withRouter(FreeChannel);