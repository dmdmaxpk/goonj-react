//LiveTvList.js
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
            data: []
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
    }
          
    handleRedirect(item) {
        let permission = localStorage.getItem('livePermission');
        let Urlmsisdn = localStorage.getItem('urlMsisdn');
        let url;
      
       // console.log('Item:', item);
        //console.log('source:', this.props.source);
      
       // if (this.props.source === 'mta') {
          const channelsWithoutPaywall = ['bol', 'express-news', 'urdu-1'];
          const isChannelWithoutPaywall = channelsWithoutPaywall.includes(item.slug);
      
          console.log('Is Channel Without Paywall:', isChannelWithoutPaywall);
      
          if (isChannelWithoutPaywall) {
            // Redirect directly to channel for free if source=mta
            url = `/channel/${item.slug}`;
          }
        //} 
          else {
          // Add your existing logic for other scenarios (non-MTA channels) here
          url = permission ? `/channel/${item.slug}` : Urlmsisdn ? `/paywall/${item.slug !== 'pak-zim' ? 'live' : 'cricket'}?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=${item.slug}` : `${config.hepage}?slug=${item.slug}`;
        }
      
       // console.log('Final URL:', url);
        return url;
      }
      

    render(){
        let data = this.state.data;

        return(
            <GridContainer className="liveTvContainer">
                <GridItem xs={12} sm={12} md={12}>
                    <p className="heading">Live Channels</p>
                </GridItem>

                {data.length > 0 ?
                    data.map(item =>
                        <GridItem key={item.slug} xs={6} sm={4} md={2} className="liveGI">
                            <a href={this.handleRedirect(item)}>
                                <img className="channelImg" src={`${config.channelLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} alt={item.thumbnail} />
                                <p className="channelName">{item.name}</p>
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