import React, { Component, Suspense } from 'react';
import PosterSlider from '../../Components/HomeSections/PosterSlider';
import './Home.scss';
import ChannelList from '../../Components/ListSections/ChannelList';
import DramasSection from '../../Components/HomeSections/Dramas';
import VodSection from '../../Components/HomeSections/Vod';
import PopularList from '../../Components/ListSections/PopularList';
import Loader from '../../Components/Loader/Loader';
import AxiosInstance from '../../Utils/AxiosInstance';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading: true,
            dramas: [],
            sports: [],
            programs: []
        }
    }
    componentDidMount(){
        // Dramas API call
        AxiosInstance.get(`/video?category=entertainment&limit=5`)
        .then(res => {
            this.setState({dramas: res.data});
        })
        .catch(err =>{
            console.log(err);
        });

        // Sports API call
        AxiosInstance.get(`/video?category=sports&limit=5`)
        .then(res => {
            this.setState({sports: res.data});
        })
        .catch(err =>{
            console.log(err);
        });

        // Programs API call
        AxiosInstance.get(`/video?category=programs&limit=5`)
        .then(res => {
            this.setState({programs: res.data});
        })
        .catch(err =>{
            console.log(err);
        });
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
                    <Suspense fallback={<div></div>}>
                        <PosterSlider />
                        <PopularList title="Popular on Goonj" />
                        <ChannelList />
                        <DramasSection data={this.state.dramas} category="entertainment" />
                        <PopularList title="Headlines" />
                        <VodSection title="Sports" data={this.state.sports} category="sports" />
                        <VodSection title="Programs" data={this.state.programs} category="programs" classname="programsContainer" />
                    </Suspense>
                }
            </div>
        );
    }
}
 
export default Home;