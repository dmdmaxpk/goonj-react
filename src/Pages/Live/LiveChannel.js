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
        const msisdn = localStorage.getItem('liveMsisdn');
        const source = localStorage.getItem('source');
        const package_id = localStorage.getItem('livePackageId');
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
                this.props.history.push(`/paywall/live`);
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