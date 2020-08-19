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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading: true,
            items: Array.from({ length: 3 }),
            hasMore: true
        }
    }

    fetchMoreData = () => {
        if (this.state.items.length >= 6) {
          this.setState({ hasMore: false });
          return;
        }
        this.setState({
            items: this.state.items.concat(Array.from({ length: 1 }))
          });
      };

  
    componentWillMount(){
        this.setState({
            loading: false
        })
    }

    renderComponent(e){
        if(e==0){
            return  <PopularList pageMargin="homePageMargin" title="Popular on Goonj" class="popularContainer" />
        }else if(e==1){
            return  <div className="channelM-T"><ChannelList pageMargin="homePageMargin" classname="channelList"/></div>
        }else if(e==2){
            return <DramasSection category="entertainment" /> 
        }else if(e==3){
            return <HeadlinesSection style={{top:"2%"}} category="news" title="Headlines" />
        }else if(e==4){
            return <VodSection apiLink={`/video?category=sports&limit=5`} title="Sports" category="sports"  classname="sportsContainer" />
        }else if(e==5){
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
                        </div>
                    </div>
                }
            </div>
        );
    }
}
 
export default Home;