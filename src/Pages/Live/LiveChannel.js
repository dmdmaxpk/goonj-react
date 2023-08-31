import React, { Component } from 'react';
import VideoPlayer from '../../Components/Player/VideoPlayer';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import PaywallInstance from '../../Utils/PaywallInstance';
import { withRouter } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';

class LiveChannel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            status: false,
            loading: true,
            isMta: false
         }
         this.checkStatus = this.checkStatus.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.slug !== nextProps.match.params.slug) {
            window.location.reload();
        }
    }
    componentDidMount(){
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get("source") !== 'mta') {
            this.checkStatus();
        }else{
            this.setState({loading: false})
            this.setState({status: true})
        }
        this.setState({isMta: urlParams.get("source") === 'mta' ? true : false});
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
        if(msisdn){

            PaywallInstance.post('/payment/status', statusData)
            .then(res =>{
            const result = res.data.data;
            if(res.data.code === -1){
                localStorage.clear();
                // console.log("here here")
                this.props.history.push(`/paywall/${slug !== 'pak-zim' ? 'live' : 'cricket'}?slug=${this.props.match.params.slug}&msisdn=${msisdn}`);
            }
            else if(result.is_allowed_to_stream === true){
                this.setState({
                    loading: false,
                    status: true
                })
            }
            else{
                // console.log("in here");
                this.props.history.push(`/paywall/${slug !== 'pak-zim' ? 'live' : 'cricket'}?slug=${slug}&msisdn=${msisdn}`);
            }
            })
        }
        else{
            this.props.history.push(`/paywall/${slug !== 'pak-zim' ? 'live' : 'cricket'}?slug=${slug}`);
        }
    }

    render(){
        const slug = this.props.match.params.slug;
        return(
            this.state.loading === false & this.state.status === true ?
            <div style={{marginTop: "3%"}}>
                <VideoPlayer slug={slug} />
                {
                    this.state.isMta === true ? "" : (
                    <div className="liveChannelMarginLeft">
                        <ChannelList classname="liveChannel"/>
                        <PopularList title="Latest on Goonj" classname="liveChannel"  />
                    </div>
                    )
                }
            </div>
            :
            <Loader />
        );
    }
}
 
export default withRouter(LiveChannel);