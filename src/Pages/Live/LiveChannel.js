//LiveChannel.js
import React, { Component } from 'react';
import VideoPlayer from '../../Components/Player/VideoPlayer';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import PaywallInstance from '../../Utils/PaywallInstance';
import { withRouter } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import GreenEntertainment from '../../Components/ListSections/GreenEntertainment';
import { trackEvent } from '../../Utils/functions';
import AdvertComponent from '../../Components/MTA/AdBanner';
import ChannelMtaBanner from '../../Assets/MTABannerChannel.png';
import GoogleAdBanner from '../../Components/MTA/GoogleAdBanner';

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
        /*
        // Extract the dynamic part of the URL (slug)
        const { slug } = this.props.match.params;
        //console.log("Live Channel is: ",slug);

        const fullURL = `https://goonj.pk/channel/${slug}?source=mta`;
        //console.log("Live URL landed on: ", fullURL);

        // Trigger a custom event with the full URL as the page_location parameter
        console.log(`MTA_Live_Play event triggered`);
        trackEvent('Custom Event', 'MTA_Live_Play', fullURL);
        */
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
        if (source === 'mta' || source === 'mta2') {
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
        const source = localStorage.getItem('source'); // Get the source from localStorage
        
        return (
            this.state.loading === false && this.state.status === true ?
            <div style={{marginTop: (source === 'mta' || source === 'mta2' ? "20%" : "3%")}}>
                <VideoPlayer slug={slug} />
                <div className="liveChannelMarginLeft">
                        {(source === 'mta' || source === 'mta2') && slug === 'green-tv-ent' ?
                            <div style={{marginTop: '2vh'}}>
                                {/* <AdvertComponent
                                    imageUrl={ChannelMtaBanner}
                                    redirectUrl="https://www.telenor.com.pk/personal/telenor/offers/weekly-easycardmax/"
                                    eventTag="GREEN_ENTERTAINMENT_AD_BANNER"
                                    className="marginBottom2vh"
                                /> */}
                                <div style={{margin: '1vh 1vw'}}>
                                    <GoogleAdBanner
                                        adUnitPath="/23081330779/goonj_web_body"
                                        sizes={[[320, 50], [320, 100]]}
                                        divId="div_goonj_web_body"
                                        targeting={{ goonj_section: [slug] }}
                                    />
                                </div>
                                <GreenEntertainment />
                            </div>
                        :
                        <div>
                            <div style={{margin: '1vh 1vw'}}>
                                <GoogleAdBanner
                                    adUnitPath="/23081330779/goonj_web_body"
                                    sizes={[[320, 50], [320, 100]]}
                                    divId="div_goonj_web_body"
                                    targeting={{ goonj_section: [slug] }}
                                />
                            </div>
                            <ChannelList classname="liveChannel"  />
                        </div>
                    }
                    {/* Passing 'source' prop to ChannelList component */}
                    {/*<PopularList title="Latest on Goonj" classname="liveChannel" />*/}
                    {!(source === 'mta' || source === 'mta2') ? (
                    // Display PopularList only if 'source' is not 'mta' or 'mta2'
                    <>
                        <PopularList title="Latest on Goonj" classname="liveChannel" />
                    </>
                    
                ) : null}
                </div>
            </div>
            :
            <Loader />
        );
    }
}

export default withRouter(LiveChannel);
