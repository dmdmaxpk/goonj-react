import React, { Component } from 'react';
import PosterSlider from '../../Components/HomeSections/PosterSlider';
import './Home.scss';
import ChannelList from '../../Components/ListSections/ChannelList';
import DramasSection from '../../Components/HomeSections/Dramas';
import VodSection from '../../Components/HomeSections/Vod';
import PopularList from '../../Components/ListSections/PopularList';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render(){
        return(
            <div>
                <PosterSlider /> <br />
                <PopularList />
                <ChannelList />
                <DramasSection />
                <ChannelList />
                <VodSection title="Sports" />
                <VodSection title="Programs" />
            </div>
        );
    }
}
 
export default Home;