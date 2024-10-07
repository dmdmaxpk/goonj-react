import React, { Component } from 'react';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import { withRouter } from 'react-router-dom';
import YoutubePlayer from '../../Components/Player/YoutubePlayer';
import YtPlaylistPage from "../../Pages/VOD/YtPlaylistVods";
import GoogleAdBanner from '../../Components/MTA/GoogleAdBanner';

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
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const title = urlParams.get("title");
        const source = urlParams.get('source');
        // const slug = this.props.match.params.slug;
        return(
            <div style={{marginTop: "12vh"}}>
                <YoutubePlayer videoId={this.props.match.params.videoId} title={title} source={source} />
                <div style={{margin: '1vh 1vw'}}>
                    <GoogleAdBanner
                        adUnitPath="/23081330779/goonj_web_top"
                        sizes={[[320, 100], [320, 50]]}
                        divId="div_goonj_web_top"
                        targeting={{ goonj_section: ['home'] }} // Replace 'home' with other sections as needed
                    />
                </div>
                <div className="liveChannelMarginLeft">
                    <YtPlaylistPage disableHeading={true} disablePagination={true} className="marginRight5px" />
                </div>
            </div>
        );
    }
}
 
export default withRouter(YoutubeChannel);