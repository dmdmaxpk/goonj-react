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
        let pathname = window.location.pathname;
        let id = pathname.split('_')[0].split('/')[1];
        return(
            <div style={{marginTop: "3%"}}>
                <VodVideoPlayer id={id} /> <br />
                <ChannelList />
                <PopularList title="Popular on Goonj" />
            </div>
        );
    }
}
 
export default VodPage;