import React, { Component } from 'react';
import ChannelList from '../../Components/ListSections/ChannelList';
import PopularList from '../../Components/ListSections/PopularList';
import VodVideoPlayer from './vodVideoPlayer';
import AxiosInstance from '../../Utils/AxiosInstance';
import Loader from '../../Components/Loader/Loader';

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
        })
        .catch(err =>{
            console.log(err);
        })
    }
    checkStatus(cat){
        if(cat === "comedy"){
            const msisdn = localStorage.getItem('CPMsisdn');
            const source = localStorage.getItem('source');
            const package_id = localStorage.getItem('CPPackageId');
            const statusData = {
                msisdn,
                source,
                package_id
            }
            AxiosInstance.post('/payment/status', statusData)
            .then(res =>{
                const result = res.data.data;
                if(result.is_allowed_to_stream){
                    this.setState({
                        loading: false,
                        status: true
                    })
                }
                else{
                    window.location.href = `/paywall/comedy?postUrl=${window.location.pathname}`;
                }
            })
            .catch(err =>{
                console.log(err);
            });
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
                    <br/>
                    <ChannelList class="vodPageMargin"/>
                    <PopularList title="Popular on Goonj"/>
                </div>
            :
            <Loader />
        );
    }
}
 
export default VodPage;