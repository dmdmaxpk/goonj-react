import React, { Component } from 'react';
import PosterSlider from './PosterSlider';
import './Home.scss';
import ChannelList from '../../Components/Live/ChannelList'
import DramasSection from '../../Components/Home/Dramas';
import SportsSection from '../../Components/Home/Sports';
import ProgramsSection from '../../Components/Home/Programs';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render(){ 
        return(
            <div>
                <PosterSlider />
                <ChannelList /> <br /><br/>
                <DramasSection />
                <ChannelList /> <br /><br/>
                <SportsSection />
                <ProgramsSection />
            </div>
        );
    }
}
 
export default Home;