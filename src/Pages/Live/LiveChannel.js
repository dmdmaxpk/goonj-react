import React, { Component } from 'react';
import VideoPlayer from '../../Components/Player/VideoPlayer';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import AxiosInstance from '../../Utils/AxiosInstance';
import { withRouter } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';

class LiveChannel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            status: true,
            loading: false
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
        AxiosInstance.post('/payment/status', statusData)
        .then(res =>{
            const result = res.data.data;
            // if(result.code === -1){
            //     localStorage.removeItem('livePermission');
            //     this.props.history.push('/paywall/live');
            // }
            if(result.is_allowed_to_stream){
                this.setState({
                    loading: false,
                    status: true
                })
            }
            else{
                // this.props.history.push(`/paywall/live`);
            }
        })
    }

    render(){
        const slug = this.props.match.params.slug;
        return(
            this.state.loading === false & this.state.status === true ?
            <div style={{marginTop: "3%"}}>
                <VideoPlayer slug={slug} /> <br /><br />
                <ChannelList />
                <PopularList title="Popular on Goonj" />
            </div>
            :
            <Loader />
        );
    }
}
 
export default withRouter(LiveChannel);