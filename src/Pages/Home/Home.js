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
import HomeMTAAdBanner from '../../Assets/MTABannerHome.png';
import DynamicDataList from '../../Components/ListSections/DynamicDataList';
import ShortFilmsPlaylist from '../../Components/shortFilms&DW/ShortFilmsPlaylist';

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
        const topShortMoviesList = [
            // {
            //     name: 'Dusri Shadi',
            //     videoUrl: 'https://drive.google.com/file/d/13R9FsYFPNFG7Y2toM-hcEneAEsuh4cIq/view?usp=sharing',
            //     thumbnail: 'DUSRISHADI'
            // },
            // {
            //     name: 'Mithaie',
            //     videoUrl: 'https://drive.google.com/file/d/1WQXYcpaC2uHdXjpjwq0JcNhRM-eEqH9T/view?usp=sharing',
            //     thumbnail: 'MITHAIE'
            // },
            {
                name: 'Washing Machine',
                videoUrl: 'https://drive.google.com/file/d/1WZeafdNasgFJCOiPlCtWmzcdOqaYchr9/view?usp=sharing',
                thumbnail: 'https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/Sliders/shortfilms/WASHINGMACHINE.jpg'
            },
            {
                name: 'Marriage on Divorce',
                videoUrl: 'https://drive.google.com/file/d/1WZeafdNasgFJCOiPlCtWmzcdOqaYchr9/view?usp=sharing',
                thumbnail: 'https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/Sliders/shortfilms/MARRIAGEONDIVORCE.jpg'
            },
            // {
            //     name: 'Injection',
            //     videoUrl: 'https://drive.google.com/file/d/1tPcbxkr-LJmz6NY1AVrasLcm0GXD9oiQ/view?usp=sharing',
            //     thumbnail: 'INJECTION'
            // },
            // {
            //     name: 'Dhoka',
            //     videoUrl: 'https://drive.google.com/file/d/18szX7ZnVG1028qvQV98H6kK7aoAF-tpj/view?usp=sharing',
            //     thumbnail: 'DHOKA'
            // },
            {
                name: 'False Truth',
                videoUrl: 'https://drive.google.com/file/d/1U9mG7c7YKBcNh4xUY_L5Ny1GIlW3TwuW/view?usp=sharing',
                thumbnail: 'https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/Sliders/shortfilms/FALSETRUTH.jpg'
            },
            {
                name: 'Underestimate',
                videoUrl: 'https://drive.google.com/file/d/1PnyWmEOp407Z_Mr1G5BxLrueJA7I6G3y/view?usp=sharing',
                thumbnail: 'https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/Sliders/shortfilms/UNDERESTIMATE.jpg'
            },
            // {
            //     name: 'Munna Electrician',
            //     videoUrl: 'https://drive.google.com/file/d/1NDMp2TUjCLuasanEQi-yW3FRznoOLCll/view?usp=sharing',
            //     thumbnail: 'MUNNAELECTRICIAN'
            // },
            // {
            //     name: 'Doll',
            //     videoUrl: 'https://drive.google.com/file/d/147LTvLdOy7HgtEY6DZ-AD6pl9FSz1pDm/view?usp=sharing',
            //     thumbnail: 'DOLL'
            // },
        ]
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
                            eventTag="HOMEPAGE_AD_BANNER"
                            className={'marginBottom2vh'}
                        />
                        <ShortFilmsPlaylist/>
                        <NewsChannelList />
                        <IslamicChannelList />
                        <DynamicDataList data={topShortMoviesList} />

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
                // return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="entertainment" title="Entertainment" limit={21} infinite={true} subCategory="" 
                // url={ this.state.Mta ? `/category/entertainment/page/1?source=mta`: this.state.Mta2 ? `/category/entertainment/page/1?source=mta2`: `/category/entertainment/page/1` }/></div>;
            }
        
        }
        else if (e === 4) {
            if(!isMtaSource){
                return <VodSection apiLink={`/video?category=sports&limit=5`} title="Sports" category="sports" classname="sportsContainer" />;
            }
            else{
                // return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="sports" title="Sports" limit={60} infinite={true} subCategory="" 
                // url={ this.state.Mta ? `/category/sports/page/1?source=mta`: this.state.Mta2 ? `/category/sports/page/1?source=mta2`: `/category/sports/page/1` }/></div>;
            }
        
        }
        else if (e === 5) {
             if(!isMtaSource){
                return <DramasSection title="Pakistani Dramas" category="drama" />;
            }
            else{
                // return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="drama" title="Pakistani Dramas" limit={100} infinite={true} subCategory=""
                // url={ this.state.Mta ? `/category/drama/page/1?source=mta`: this.state.Mta2 ? `/category/drama/page/1?source=mta2`: `/category/drama/page/1` }/></div>;
            }
        } else if (e === 6) {
            if(!isMtaSource){
                return <div className="Homeheadlines"><HeadlinesSection style={{top:"2%"}} category="news" title="Headlines" limit={21} infinite={true} subCategory="" 
                url={`/category/news/page/1`} /></div>
            }
            else{
                // return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="news" title="Headlines" limit={21} infinite={true} subCategory="" 
                // url={ this.state.Mta ? `/category/news/page/1?source=mta`: this.state.Mta2 ? `/category/news/page/1?source=mta2`: `/category/news/page/1` }/></div>;
            }
        
        } else if (e === 7) {
            if(!isMtaSource){
                return <div className="Homeheadlines"><HeadlinesSection style={{top:"2%"}} category="current_affairs" title="Current Affairs" limit={21} infinite={false} subCategory="" 
                url={`/category/current_affairs/page/1`} /></div>
            }

            // else{
            //     return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="current_affairs" title="Current Affairs" limit={21} infinite={false} subCategory="" 
            //     url={ this.state.Mta ? `/category/current_affairs/page/1?source=mta`: this.state.Mta2 ? `/category/current_affairs/page/1?source=mta2`: `/category/current_affairs/page/1` }/></div>;
            
        
        }  else if (e === 8) {
            if(!isMtaSource){ 
                return <VodSection title="Programs" apiLink={`/video?category=programs&limit=5`} category="programs" classname="programsContainer" />;
            }
            // else{
            //     return <div className="Homeheadlines"><HeadlinesSection style={{ top: "2%" }} category="programs" title="Programs" limit={100} infinite={true} subCategory="" 
            //     url={ this.state.Mta ? `/category/programs/page/1?source=mta`: this.state.Mta2 ? `/category/programs/page/1?source=mta2`: `/category/programs/page/1` }/></div>;
            // }    
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
