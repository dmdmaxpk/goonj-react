import React, { Component } from 'react';
import PosterSlider from './PosterSlider';
import './Home.scss';
import ChannelList from '../../Components/Live/ChannelList'
import DramasSection from '../../Components/HomeSections/Dramas';
import VodSection from '../../Components/HomeSections/Vod';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render(){
        return(
            <div>
                <PosterSlider /> <br />
                <ChannelList /> <br /><br/><br/><br/>
                <DramasSection />
                <ChannelList /> <br /><br/><br /><br/>
                <VodSection title="Sports" />
                <VodSection title="Programs" />
            </div>
        );
    }
}
 
export default Home;