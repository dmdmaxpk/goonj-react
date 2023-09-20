import React, { Component } from 'react';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import AxiosInstance from '../../Utils/AxiosInstance';
import config from '../../Utils/config';
import './Live.scss';
import Loader from '../../Components/Loader/Loader';

class LiveTv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLightTheme: false
        }
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    componentDidMount(){
        AxiosInstance.get('/live')
        .then(res =>{
            this.setState({
                data: res.data
            })
        })
        .catch(err =>{
         
        })

        // MTA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");

        // Theme checks
        if(this.source === 'mta2'){
            this.setState({isLightTheme: true});
        }
        else{
            this.setState({isLightTheme: false});
        }
    }
    handleRedirect(item){
        console.log('handleRedirect - LiveTvList.js');
        let permission = localStorage.getItem('livePermission');
        let Urlmsisdn = localStorage.getItem('urlMsisdn');
        let url = permission === true ? `/channel/${item.slug}` : Urlmsisdn ? `/paywall/${item.slug !== 'pak-zim' ? 'live' : 'cricket'}?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=${item.slug}` : `${config.hepage}?slug=${item.slug}`;
        return url;
    }
    render(){
        let data = this.state.data;

        const { isLightTheme } = this.state;
        return(
            <GridContainer className="liveTvContainer">
                <GridItem xs={12} sm={12} md={12}>
                    {/*<p className="heading">Live Channels</p>*/}
                    <p className={`heading ${isLightTheme ? 'heading_mta2' : ''}`}>Live Channels</p>
                </GridItem>

                {data.length > 0 ?
                    data.map(item =>
                        <GridItem key={item.slug} xs={6} sm={4} md={2} className="liveGI">
                            <a href={this.handleRedirect(item)}>
                                <img className="channelImg" src={`${config.channelLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} alt={item.thumbnail} />
                                {/*<p className="channelName">{item.name}</p>*/}
                                <p className={`channelName ${isLightTheme ? 'channelName_mta2' : ''}`}>{item.name}</p>
                            </a>
                        </GridItem>
                    )
                :
                <GridItem className="loaderGI" xs={12} sm={12} md={12}>
                    <Loader />
                </GridItem>
                }
            </GridContainer>
        );
    }
}
 
export default LiveTv;