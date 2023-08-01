//LiveChannel.js
import React, { Component } from 'react';
import VideoPlayer from '../../Components/Player/VideoPlayer';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import PaywallInstance from '../../Utils/PaywallInstance';
import { withRouter } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
//import ReactGA from 'react-ga';


// Initialize Google Analytics with your GA4 Measurement ID
//ReactGA.initialize('G-RXE717ZSC2'); 


class LiveChannel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            status: false,
            loading: true
        }
        this.checkStatus = this.checkStatus.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.slug !== nextProps.match.params.slug) {
            window.location.reload();
        }
    }

    componentDidMount(){
        this.checkStatus();
    }

    checkStatus(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let urlMsisdn = urlParams.get("msisdn");
        let urlPkgId = urlParams.get("package_id");
        let urlSource = urlParams.get("source");
        const msisdn = localStorage.getItem('liveMsisdn') ? localStorage.getItem('liveMsisdn') : urlMsisdn;
        const source = localStorage.getItem('source') ? localStorage.getItem('source') : urlSource;
        const package_id = localStorage.getItem('livePackageId') ? localStorage.getItem('livePackageId') : urlPkgId;
        let slug = this.props.match.params.slug;
        const statusData = {
            msisdn,
            source,
            package_id
        }

        // If 'source=mta', set status to true without going through paywall
        if (source === 'mta') {
            this.setState({
            loading: false,
            status: true
            });
        } 
        else if (msisdn) {
            PaywallInstance.post('/payment/status', statusData)
            .then(res => {
                const result = res.data.data;
                if (res.data.code === -1) {
                localStorage.clear();
                this.props.history.push(`/paywall/${slug !== 'pak-zim' ? 'live' : 'cricket'}?slug=${this.props.match.params.slug}&msisdn=${msisdn}&source=${source}`); // Include source in the redirection URL
                } else if (result.is_allowed_to_stream === true) {
                this.setState({
                    loading: false,
                    status: true
                });
                } else {
                this.props.history.push(`/paywall/${slug !== 'pak-zim' ? 'live' : 'cricket'}?slug=${slug}&msisdn=${msisdn}&source=${source}`);
                }
            });
        } else {
            this.props.history.push(`/paywall/${slug !== 'pak-zim' ? 'live' : 'cricket'}?slug=${slug}&source=${source}`);
        }
    }

    render(){
        const slug = this.props.match.params.slug;
        return (
            this.state.loading === false && this.state.status === true ?
            <div style={{marginTop: "3%"}}>
                <VideoPlayer slug={slug} />
                <div className="liveChannelMarginLeft">
                    {/* Passing 'source' prop to ChannelList component */}
                    <ChannelList classname="liveChannel" source={this.props.location.search} />
                    <PopularList title="Latest on Goonj" classname="liveChannel" />
                </div>
            </div>
            :
            <Loader />
        );
    }
}

export default withRouter(LiveChannel);
