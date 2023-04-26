import React, { Component, Suspense } from 'react';
import PosterSlider from '../../Components/HomeSections/PosterSlider';
import ChannelList from '../../Components/ListSections/ChannelList';
import DramasSection from '../../Components/HomeSections/Dramas';
import VodSection from '../../Components/HomeSections/Vod';
import PopularList from '../../Components/ListSections/PopularList';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../../Components/Loader/Loader';
import './Home.scss';
import HeadlinesSection from '../../Components/HomeSections/Headlines';
import { Button, Snackbar } from '@material-ui/core';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            displayMessage: false,
            message: 'You have been successfully subscribed, watch live tv anytime, anywhere',
            loading: true,
            items: Array.from({ length: 3 }),
            hasMore: true,
            bannerDisplay: "block",
            statusCode: new URLSearchParams(this.props.location.search).get("statusCode") ? new URLSearchParams(this.props.location.search).get("statusCode") : undefined,
            msisdn: new URLSearchParams(this.props.location.search).get("msisdn") ? new URLSearchParams(this.props.location.search).get("msisdn") : undefined
        }

        // trial or billed
        // 01 -trial
        // 02 - billed
        if(this.state.statusCode === '01' || this.state.statusCode === '02') {
            localStorage.setItem('livePermission', true);
            console.log('live permission set to true');
            this.state.displayMessage = true;

            if(this.state.msisdn) {
                localStorage.setItem('liveMsisdn', this.state.msisdn);
                console.log('live url set to ', this.state.msisdn);
            }
        }else{
            this.state.displayMessage = false;
            localStorage.setItem('livePermission', false);
            console.log('live permission set to false');
        }
    }

    // update 2
    closeBanner = () => {
        this.setState({
            bannerDisplay: "none"
        })
    }

    // subscribe(){
    //     const payload = {
    //         msisdn: localStorage.getItem('liveMsisdn'),
    //         source: 'web',
    //         payment_source: 'telenor',
    //         package_id: ''
    //     }

    //     PaywallInstance.post(`/payment/subscribe`, payload)
    //     .then(res =>{
    //         const result = res.data;

    //         if(result.code === -1){
    //             this.setState({loading: false});
    //             alert(res.data.message);
    //         }
            
    //         else if(result.code === 9 || result.code === 10 || result.code === 11 || result.code === 0){
    //             localStorage.setItem(permission, true);
    //             localStorage.setItem(pkgIdKey, packageID2);
    //             let urlMsisdn = localStorage.getItem('urlMsisdn'); 
    //             if(urlMsisdn){
    //                 localStorage.setItem(msisdnKey, urlMsisdn)
    //             }
    //             else{
    //                 localStorage.setItem(msisdnKey, msisdn);
    //             }

    //             if(result.code === 0){
    //                 // google tag for tracking
    //                 window.gtag('event', 'conversion', { 'send_to': 'AW-828051162/xpLgCPWNicADENqd7IoD', 'transaction_id': '' });

    //                 // Pixel event on subscribe
    //                 window.fbq('track', 'Subscribe');
                    
    //                 // useInsider
    //                 window.insider_object = {
    //                     "page": {
    //                         "type": "Confirmation"
    //                     }
    //                 };

    //                 if(mid === 'tiktok'){
    //                     window.ttq.track('Subscribe');
    //                 }
    //             }
                
    //             // redirecting
    //             this.props.history.push(`${url}`);
    //         }
    //     })
    //     .catch(err =>{
    //         this.setState({loading: false});
    //         alert("Something went wrong! :(");
    //     })
    // }

    fetchMoreData = () => {
        if (this.state.items.length >= 10) {
          this.setState({ hasMore: false });
          return;
        }
        this.setState({
            items: this.state.items.concat(Array.from({ length: 1 }))
          });
      };

  
      UNSAFE_componentWillMount(){
        this.setState({
            loading: false
        })
    }

    renderComponent(e){
        if(e==0){
            return  <PopularList pageMargin="homePageMargin" title="Latest on Goonj" class="popularContainer" />
        }
        // else if(e==1){
        //     return  <div id="youtubeBanner" style={{display: this.state.bannerDisplay}} className="youtubeBanner">
        //                 <a href="https://www.youtube.com/channel/UCE126WZCUfLqOpcxRo55KYg" target="_blank"><img src={require('../../Assets/youtube.png')} /></a>
        //                 <Close style={{fill: "white"}} className="btnClose" onClick={this.closeBanner} color="primary"/>
        //             </div>
        // }
        else if(e==2){
            return  <div className="channelM-T"><ChannelList pageMargin="homePageMargin" classname="channelList"/></div>
        }else if(e==3){
            return <DramasSection title="Pakistani Dramas" category="drama" /> 
        }else if(e==4){
            return <div className="Homeheadlines"><HeadlinesSection style={{top:"2%"}} category="news" title="Headlines" limit={21} infinite={true} subCategory="" url={`/category/news/page/1`} /></div>
        }else if(e==5){
            return <div className="Homeheadlines"><HeadlinesSection style={{top:"2%"}} category="current_affairs" title="Current Affairs" limit={21} infinite={false} subCategory="" url={`/category/current_affairs/page/1`} /></div>
        }else if(e==6){
            return <div className="Homeheadlines"><HeadlinesSection style={{top:"2%"}} category="entertainment" title="Entertainment" limit={21} infinite={true} subCategory="" url={`/category/entertainment/page/1`} /></div>
        }else if(e==7){
            return <VodSection apiLink={`/video?category=sports&limit=5`} title="Sports" category="sports" classname="sportsContainer" />
        }else if(e==8){
            return <VodSection title="Programs" apiLink={`/video?category=programs&limit=5`} category="programs" classname="programsContainer" />
        }
    }
    render(){
        return(
            <div>
                {this.state.loading === true ?
                    <div style={{height: "720px"}}>
                        <Loader color="secondary" />
                    </div>
                :
                    <div className="homeContainer">
                        <PosterSlider />
                        <div className="homeSections">
                            <InfiniteScroll
                                dataLength={this.state.items.length}
                                next={this.fetchMoreData}
                                hasMore={this.state.hasMore}
                                >
                                {this.state.items.map((i, index) => (
                                    <div>
                                        {this.renderComponent(index)}
                                    </div> 
                                ))}
                            </InfiniteScroll>


                            {/* <PopularList pageMargin="homePageMargin" title="Latest on Goonj" class="popularContainer" />
                            <div className="channelM-T"><ChannelList pageMargin="homePageMargin" classname="channelList"/></div>
                            <DramasSection category="entertainment" /> 
                            <HeadlinesSection style={{top:"2%"}} category="news" title="Headlines" />
                            <VodSection apiLink={`/video?category=sports&limit=5`} title="Sports" category="sports"  classname="sportsContainer" />
                            <VodSection title="Programs" apiLink={`/video?category=programs&limit=5`} category="programs" classname="programsContainer" /> */}
                        </div>
                        <Snackbar
                                severity="success"
                                open={this.state.displayMessage}
                                autoHideDuration={8000}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">{this.state.message}</span>}
                                onClose={() => this.setState({displayMessage: false})}
                            />
                    </div>
                }
            </div>
        );
    }
}
 
export default Home;