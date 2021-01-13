import React, { Component } from 'react';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import VodVideoPlayer from './vodVideoPlayer';
import AxiosInstance from '../../Utils/AxiosInstance';
import PaywallInstance from '../../Utils/PaywallInstance';
import Loader from '../../Components/Loader/Loader';
import { withRouter } from 'react-router-dom';

class VodPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            topics: [],
            status: false,
            loading: true
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
        return(
            data.length !== 0 && loading === false && status === true ?
                <div className="vod_main_div" style={{marginTop: "3%", marginLeft: "3%"}}>
                    <VodVideoPlayer  data={data !== [] ? data : ''} topics={topics !== [] ? topics : ''}/> 
                    <div className="vod_channel_margin_bottom">
                    <ChannelList class="vod_page_margin_heading channelListVodHeading"/>
                    <PopularList marginTop="vodMarginTop" class="vod_page_margin_heading" title="Popular on Goonj"/>
                    </div>
                </div>
            :
            <Loader />
        );
    }
}
 
export default withRouter(VodPage);