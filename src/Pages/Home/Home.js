//Home.js
import { withRouter } from 'react-router-dom';
import React, { Component, Suspense } from 'react';
import PosterSlider from '../../Components/HomeSections/PosterSlider';
import ChannelList from '../../Components/ListSections/ChannelList';
import NewsChannelList from '../../Components/ListSections/NewsChannelList';
import EntertainmentChannelList from '../../Components/ListSections/EntertainmentChannelList';
import IslamicChannelList from '../../Components/ListSections/IslamicChannelList';
import LiveTv from '../Live/LiveTvList';
import DramasSection from '../../Components/HomeSections/Dramas';
import VodSection from '../../Components/HomeSections/Vod';
import PopularList from '../../Components/ListSections/PopularList';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../../Components/Loader/Loader';
import './Home.scss';
import HeadlinesSection from '../../Components/HomeSections/Headlines';
import MainCategory from '../VOD/MainCategory';
import { Close } from '@material-ui/icons';
import ReactGA from 'react-ga';
import { trackEvent } from '../../Utils/functions';
import AdvertComponent from '../../Components/MTA/AdBanner';
import HomeMTAAdBanner from '../../Assets/HomePageBanner.png';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading: true,
            items: Array.from({ length: 3 }),
            hasMore: true,
            bannerDisplay: "block",
            Mta: false,
            Mta2: false
        }
    }

    componentDidMount() {
        this.checkMta();
    }
    
    checkMta(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");
    
        // Theme checks
        if (this.source === 'mta') {
            this.setState({ Mta: true }, () => {
                console.log("source mta is: ", this.state.Mta);
                this.handleMta();
            });
        } else {
            this.setState({ Mta: false }, () => {
                console.log("source mta is: ", this.state.Mta);
            });
        }
    
        if (this.source === 'mta2') {
            this.setState({ Mta2: true }, () => {
                //console.log("source mta2 is: ", this.state.Mta2);
            });
        } else {
            this.setState({ Mta2: false }, () => {
                //console.log("source mta2 is: ", this.state.Mta2);
            });
        }
    }
    
    handleMta(){
        console.log("Mta Value:", this.state.Mta);
        //GA4
        // Trigger a custom event with the full URL as the page_location parameter
        console.log(`MTA_Landing_Page event triggered`);
        trackEvent('Custom Event', 'MTA_Landing_Page', "https://goonj.pk/?source=mta");
    }
    
    closeBanner = () => {
        this.setState({
            bannerDisplay: "none"
        })
    }

    fetchMoreData = () => {
        if (this.state.items.length >= 10) {
          this.setState({ hasMore: false });
          return;
        }
        this.setState({
            items: this.state.items.concat(Array.from({ length: 1 }))
        });
    }

    UNSAFE_componentWillMount(){
        this.setState({
            loading: false
        })
    }

    
    renderComponent(e){
        const isMtaSource = this.props.location.search.includes('source=mta' || 'source=mta2');
        
        
        if (e === 0 && (!isMtaSource )){
            return <PopularList pageMargin="homePageMargin" title="Latest on Goonj" class="popularContainer" />;
        } 
        //else if (e === 1) {
          //  return (
            //    <div id="youtubeBanner" style={{ display: this.state.bannerDisplay }} className="youtubeBanner">
              //      <a href="https://www.youtube.com/channel/UCE126WZCUfLqOpcxRo55KYg" target="_blank">
                //        <img src={require('../../Assets/youtube.png')} />
                 //   </a>
                  //  <Close style={{ fill: "white" }} className="btnClose" onClick={this.closeBanner} color="primary" />
                //</div>
            //);
        else if (e === 2) {
            return (
                <div className="channelM-T">
                  {/* Pass the 'source' prop to the ChannelList component 
                  <ChannelList/>
                  <NewsChannelList  />
                  <EntertainmentChannelList/>
                  <IslamicChannelList />
                 */}
                  {isMtaSource ? (
                    <>
                    <EntertainmentChannelList />
                    <AdvertComponent
                        imageUrl={HomeMTAAdBanner}
                        redirectUrl="https://www.telenor.com.pk/personal/telenor/offers/monthly-ultimate-offer/"
                        eventTag="MTA_MONTHLY_ULTIMATE_OFFER"
                        className={'marginBottom2vh'}
                    />
                    <NewsChannelList />
                    <IslamicChannelList />
                    </>
                ) : (
                <>
                    <ChannelList /> 
          </>
        )}
                
                </div>
              );
              
        } else if (e === 3) {
            if(!isMtaSource){
                return <div className="Homeheadlines"><HeadlinesSection style={{top:"2%"}} category="entertainment" title="Entertainment" limit={21} infinite={true} subCategory="" 
                url={`/category/entertainment/page/1`} /></div>
            }
            else{
                return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="entertainment" title="Entertainment" limit={21} infinite={true} subCategory="" 
                url={ this.state.Mta ? `/category/entertainment/page/1?source=mta`: this.state.Mta2 ? `/category/entertainment/page/1?source=mta2`: `/category/entertainment/page/1` }/></div>;
            }
        
        }
        else if (e === 4) {
            if(!isMtaSource){
                return <VodSection apiLink={`/video?category=sports&limit=5`} title="Sports" category="sports" classname="sportsContainer" />;
            }
            else{
                return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="sports" title="Sports" limit={60} infinite={true} subCategory="" 
                url={ this.state.Mta ? `/category/sports/page/1?source=mta`: this.state.Mta2 ? `/category/sports/page/1?source=mta2`: `/category/sports/page/1` }/></div>;
            }
        
        }
        else if (e === 5) {
             if(!isMtaSource){
                return <DramasSection title="Pakistani Dramas" category="drama" />;
            }
            else{
                return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="drama" title="Pakistani Dramas" limit={100} infinite={true} subCategory=""
                url={ this.state.Mta ? `/category/drama/page/1?source=mta`: this.state.Mta2 ? `/category/drama/page/1?source=mta2`: `/category/drama/page/1` }/></div>;
            }
        } else if (e === 6) {
            if(!isMtaSource){
                return <div className="Homeheadlines"><HeadlinesSection style={{top:"2%"}} category="news" title="Headlines" limit={21} infinite={true} subCategory="" 
                url={`/category/news/page/1`} /></div>
            }
            else{
                return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="news" title="Headlines" limit={21} infinite={true} subCategory="" 
                url={ this.state.Mta ? `/category/news/page/1?source=mta`: this.state.Mta2 ? `/category/news/page/1?source=mta2`: `/category/news/page/1` }/></div>;
            }
        
        } else if (e === 7) {
            if(!isMtaSource){
                return <div className="Homeheadlines"><HeadlinesSection style={{top:"2%"}} category="current_affairs" title="Current Affairs" limit={21} infinite={false} subCategory="" 
                url={`/category/current_affairs/page/1`} /></div>
            }

            else{
                return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="current_affairs" title="Current Affairs" limit={21} infinite={false} subCategory="" 
                url={ this.state.Mta ? `/category/current_affairs/page/1?source=mta`: this.state.Mta2 ? `/category/current_affairs/page/1?source=mta2`: `/category/current_affairs/page/1` }/></div>;
            }
        
        }  else if (e === 8) {
            if(!isMtaSource){ 
                return <VodSection title="Programs" apiLink={`/video?category=programs&limit=5`} category="programs" classname="programsContainer" />;
            }
            else{
                return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="programs" title="Programs" limit={100} infinite={true} subCategory="" 
                url={ this.state.Mta ? `/category/programs/page/1?source=mta`: this.state.Mta2 ? `/category/programs/page/1?source=mta2`: `/category/programs/page/1` }/></div>;
            }    
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
                                <div key={index}>
                                    {this.renderComponent(index)}
                                </div> 
                            ))}
                        </InfiniteScroll>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(Home);
