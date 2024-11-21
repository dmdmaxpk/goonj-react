import React, { Component } from 'react';
import ChannelList from '../../Components/ListSections/ChannelList';
import VodVideoPlayer from './vodVideoPlayer';
import AxiosInstance from '../../Utils/AxiosInstance';
import PaywallInstance from '../../Utils/PaywallInstance';
import Loader from '../../Components/Loader/Loader';
import { withRouter } from 'react-router-dom';
import { trackEvent } from '../../Utils/functions';
import GoogleAdBanner from '../../Components/MTA/GoogleAdBanner';

class VodPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            topics: [],
            status: false,
            loading: true,
            isLightTheme: false,
            isMta: false
         }
         this.checkStatus = this.checkStatus.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.vodID !== nextProps.match.params.vodID) {
            window.location.reload();
        }
    }
    componentDidMount(){
        let pathname = window.location.pathname;
        let id = pathname.split('_')[0].split('/')[1];
        AxiosInstance.get(`/video?_id=${id}&is_premium=true`)
        .then(res =>{
            const result = res.data
            this.setState({data: result, topics: result.topics, category: result.category});
            this.checkStatus(result.category);
            if(result.length === 0){
                this.props.history.push('/404');
            }
        })
        .catch(err =>{

        })

        // MTA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");

        // Theme checks
        if(this.source === 'mta2'){
            this.setState({Mta2: true});
        }
        else{
            this.setState({Mta2: false});
        }
        if (this.source === 'mta') {
            this.setState({isMta: true})
        }


        this._isMounted = true;
        window.onpopstate = ()=> {
            if(this._isMounted) {
                if(this.source === 'mta' || this.source === 'mta2') {
                    this.props.history.push(`/?source=${this.source}`)
                    // window.location.href = `/`
                }
            }
        }
        
        /*
        // Extract the dynamic part of the URL (slug)
        const dynamicurl = window.location.pathname;
        const dynamicPart = dynamicurl.split('/').pop(); // Extract the last part of the pathname
        console.log("VOD Channel is: ", dynamicPart);
        // Construct the full URL with the dynamicPart
        const fullURL = `https://goonj.pk/${dynamicPart}?source=mta`;
        console.log("VOD URL landed on: ", fullURL);
        // Trigger a custom event with the full URL as the page_location parameter
        trackEvent('Custom Event', 'MTA_VOD_Play', fullURL);
        */

    }

    checkStatus(cat){
        if(cat === "comedy"){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            let urlMsisdn = urlParams.get("msisdn");
            let urlPkgId = urlParams.get("package_id");
            let urlSource = urlParams.get("source");
            const msisdn = localStorage.getItem('CPMsisdn') ? localStorage.getItem('CPMsisdn') : urlMsisdn;
            const source = localStorage.getItem('source') ? localStorage.getItem('source') : urlSource;
            const package_id = localStorage.getItem('CPPackageId') ? localStorage.getItem('CPPackageId') : urlPkgId;
            const statusData = {
                msisdn,
                source,
                package_id
            }
            if(msisdn){
                PaywallInstance.post('/payment/status', statusData)
                .then(res =>{
                    const result = res.data.data;
                if(res.data.code === -1){
                    localStorage.clear();
                    this.props.history.push(`/paywall/comedy?postUrl=${this.props.match.params.vodID}`);
                }
                else if(result.is_allowed_to_stream === true){
                    this.setState({
                        loading: false,
                        status: true
                    })
                }
                else{
                    this.props.history.push(`/paywall/comedy?postUrl=${this.props.match.params.vodID}`);
                }
            })
            .catch(err =>{
              
            });
        }
        else{
            this.props.history.push(`/paywall/comedy?postUrl=${this.props.match.params.vodID}`);
        }
    }
        else{
            this.setState({
                loading: false,
                status: true
            })
        }
}

    render(){
        let {data, topics, loading, status} = this.state;
        const { isLightTheme } = this.state;
        return(
            data.length !== 0 && loading === false && status === true ?
                <div style={{marginLeft: "10px", marginTop: (this.source === 'mta' || this.source === 'mta2' ? "30px" : "100px")}}>
                    <VodVideoPlayer  data={data?.length !== 0 ? data : ''} topics={topics.length !== 0 ? topics : ''}/>
                    {this.state.isMta ?
                        <div style={{margin: '1vh 1vw'}}>
                            <GoogleAdBanner
                                adUnitPath="/23081330779/goonj_web_top"
                                sizes={[[320, 100], [320, 50]]}
                                divId="div_goonj_web_top"
                                targeting={{ goonj_section: ['vod'] }}
                            />
                        </div>
                    :
                        null
                    }
                    <div className="vod_channel_margin_bottom">
                    <ChannelList class="vod_page_margin_heading channelListVodHeading" style={{ color: isLightTheme ? "#87CEEB" : "white" }}/>
                    {this.state.isMta ?
                        <div style={{margin: '1vh 1vw'}}>
                            <GoogleAdBanner
                                adUnitPath="/23081330779/div_goonj_web_body"
                                sizes={[[320, 100], [320, 50]]}
                                divId="div_goonj_web_body"
                                targeting={{ goonj_section: ['vod'] }}
                            />
                        </div>
                    :
                        null
                    }
                    {/*<PopularList marginTop="vodMarginTop" class="vod_page_margin_heading" style={{ color: isLightTheme ? "#87CEEB" : "white" }} title="Latest on Goonj"/>*/}
                    </div>
                </div>
            :
            <Loader />
        );
    }
}
 
export default withRouter(VodPage);