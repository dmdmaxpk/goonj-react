import React, { Component } from 'react';
import PosterSlider from './PosterSlider';
import './Home.scss';
import ChannelList from '../../Components/Live/ChannelList'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render(){ 
        return(
            <div>
                <PosterSlider />
                <ChannelList />
            </div>
        );
    }
}
 
export default Home;