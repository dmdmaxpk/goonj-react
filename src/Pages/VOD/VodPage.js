import React, { Component } from 'react';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import VodVideoPlayer from './vodVideoPlayer';

class VodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.vodID !== nextProps.match.params.vodID) {
            window.location.reload();
        }
    }

    render(){
        return(
            <div style={{marginTop: "3%"}}>
                <VodVideoPlayer data={this.props.history.location.state.data} /> <br /><br />
                <ChannelList />
                <PopularList />
            </div>
        );
    }
}
 
export default VodPage;