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
import MainCategory from '../VOD/MainCategory';
import { Close } from '@material-ui/icons';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading: true,
            items: Array.from({ length: 3 }),
            hasMore: true,
            bannerDisplay: "block"
        }
    }

    // update 2

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
      };

  
      UNSAFE_componentWillMount(){
        this.setState({
            loading: false
        })
    }

    renderComponent(e){
        if(e==0){
            return  <PopularList pageMargin="homePageMargin" title="Popular on Goonj" class="popularContainer" />
        }else if(e==1){
            return  <div id="youtubeBanner" style={{display: this.state.bannerDisplay}} className="youtubeBanner">
                        <a href="https://www.youtube.com/channel/UCE126WZCUfLqOpcxRo55KYg" target="_blank"><img src={require('../../Assets/youtube.png')} /></a>
                        <Close style={{fill: "white"}} className="btnClose" onClick={this.closeBanner} color="primary"/>
                    </div>
        }else if(e==2){
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


                        {/* <PopularList pageMargin="homePageMargin" title="Popular on Goonj" class="popularContainer" />
                        <div className="channelM-T"><ChannelList pageMargin="homePageMargin" classname="channelList"/></div>
                        <DramasSection category="entertainment" /> 
                        <HeadlinesSection style={{top:"2%"}} category="news" title="Headlines" />
                        <VodSection apiLink={`/video?category=sports&limit=5`} title="Sports" category="sports"  classname="sportsContainer" />
                        <VodSection title="Programs" apiLink={`/video?category=programs&limit=5`} category="programs" classname="programsContainer" /> */}
                        </div>
                    </div>
                }
            </div>
        );
    }
}
 
export default Home;