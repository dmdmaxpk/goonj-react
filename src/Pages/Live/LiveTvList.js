//LiveTvList.js
import React, { Component } from 'react';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import AxiosInstance from '../../Utils/AxiosInstance';
import config from '../../Utils/config';
import './Live.scss';
import Loader from '../../Components/Loader/Loader';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

ReactGA.initialize('G-ZLSBYDDG31'); 

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
          
    //handleRedirect(item)
    handleRedirect(item) {
        console.log("clicked");
        // event.preventDefault(); 
        const permission = localStorage.getItem('livePermission');
        const Urlmsisdn = localStorage.getItem('urlMsisdn');
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlSource = urlParams.get("source");
        const source = localStorage.getItem('source') ? localStorage.getItem('source') : urlSource;
       
        let url = "";
        
        if(permission) {
            url =`/channel/${item.slug}` 
        } else{
            if(Urlmsisdn)
                url = `/paywall/${item.slug !== 'pak-zim' ? 'live' : 'cricket'}?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=${item.slug}`
            else 
                url = `${config.hepage}?slug=${item.slug}`
        }

       if(source == "web"){
           if(permission) {
            url =`/channel/${item.slug}` 
            } else{
                if(Urlmsisdn)
                    url = `/paywall/${item.slug !== 'pak-zim' ? 'live' : 'cricket'}?msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}&slug=${item.slug}`
                else 
                    url = `${config.hepage}?slug=${item.slug}`
            }   
        }else if(source == "mta"){
            const channelsWithoutPaywall = ['bol', 'express-news', 'urdu-1'];
            const isChannelWithoutPaywall = channelsWithoutPaywall.includes(item.slug);

            if (isChannelWithoutPaywall) {
                // Create custom events for MTA channels
                console.log("in if condition where live channel info to displayed");
                console.log(`MTA-${item.slug} event triggered`);
                    ReactGA.event({
                        category: 'Custom Event',
                        action: `MTA_${item.slug}`,
                        label: window.location.href // Include the page location in the 'label' parameter

                    });
                url = `/channel/${item.slug}`;// Redirect directly to channel for free if source=mta
            }

        }
     
        console.log("final url:", url)
        // const { history } = this.props;

        // setTimeout(()=>{
        //     history.replace(url); 
        // },500)
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
                            <a href={this.handleRedirect(item)}
                                //onClick={(event)=>this.handleRedirect(event,item)}
                            >
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
 
export default withRouter(LiveTv);