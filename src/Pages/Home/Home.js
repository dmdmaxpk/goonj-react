import React, { Component, Suspense } from 'react';
import PosterSlider from '../../Components/HomeSections/PosterSlider';
import ChannelList from '../../Components/ListSections/ChannelList';
import DramasSection from '../../Components/HomeSections/Dramas';
import VodSection from '../../Components/HomeSections/Vod';
import PopularList from '../../Components/ListSections/PopularList';
import Loader from '../../Components/Loader/Loader';
import './Home.scss';
import HeadlinesSection from '../../Components/HomeSections/Headlines';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading: true
        }
    }
  
    componentWillMount(){
        this.setState({
            loading: false
        })
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
                            <PopularList title="Popular on Goonj" class="popularContainer" />
                         
                            <ChannelList classname="channelList"/>
                           
                            <DramasSection category="entertainment" /> 
                            <HeadlinesSection style={{top:"2%"}} category="news" title="Headlines" />
                         
                            <VodSection apiLink={`/video?category=sports&limit=5`} title="Sports" category="sports"  classname="sportsContainer" />
                        
                            <VodSection title="Programs" apiLink={`/video?category=programs&limit=5`} category="programs" classname="programsContainer" />
                        </div>
                    </div>
                }
            </div>
        );
    }
}
 
export default Home;