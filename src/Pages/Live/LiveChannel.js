import React, { Component } from 'react';
import VideoPlayer from '../../Components/Player/VideoPlayer';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import PaywallInstance from '../../Utils/PaywallInstance';
import { withRouter } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { CheckLiveStatus } from '../../Services/apiCalls';

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
        if(this.props.match.params.slug !== nextProps.match.params.slug) {
            window.location.reload();
        }
    }
    componentDidMount(){
        this.checkStatus();
    }
    checkStatus(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let slug = urlParams.get("slug");
        let urlMsisdn = urlParams.get("msisdn");
        let urlPkgId = urlParams.get("package_id");
        let urlSource = urlParams.get("source");
        const msisdn = localStorage.getItem('liveMsisdn') ? localStorage.getItem('liveMsisdn') : urlMsisdn;
        const source = localStorage.getItem('source') ? localStorage.getItem('source') : urlSource;
        const package_id = localStorage.getItem('livePackageId') ? localStorage.getItem('livePackageId') : urlPkgId;
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
                console.log("here here")
                this.props.history.push(`/paywall/live?slug=${this.props.match.params.slug}`);
            }
            else if(result.is_allowed_to_stream === true){
                this.setState({
                    loading: false,
                    status: true
                })
            }
            else{
                console.log("in here");
                this.props.history.push(`/paywall/live?slug=${this.props.match.params.slug}`);
            }
            })
        }
        else{
                this.props.history.push(`/paywall/live?slug=${this.props.match.params.slug}`);
        }
    }

    render(){
        const slug = this.props.match.params.slug;
        return(
            this.state.loading === false & this.state.status === true ?
            <div style={{marginTop: "3%"}}>
                <VideoPlayer slug={slug} />
                <ChannelList />
                <PopularList title="Popular on Goonj" />
            </div>
            :
            <Loader />
        );
    }
}
 
export default withRouter(LiveChannel);