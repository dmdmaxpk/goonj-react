import React, { Component, Suspense } from 'react';
import PosterSlider from '../../Components/HomeSections/PosterSlider';
import ChannelList from '../../Components/ListSections/ChannelList';
import DramasSection from '../../Components/HomeSections/Dramas';
import VodSection from '../../Components/HomeSections/Vod';
import PopularList from '../../Components/ListSections/PopularList';
import Loader from '../../Components/Loader/Loader';
import AxiosInstance from '../../Utils/AxiosInstance';
import './Home.scss';
import HeadlinesSection from '../../Components/HomeSections/Headlines';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading: true,
            dramas: [],
            sports: [],
            programs: [],
            headlines: []
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

        // Headlines Call
        AxiosInstance.get(`/video?category=news&limit=10`)
        .then(res =>{
            this.setState({headlines: res.data})
        })
        .catch(err =>{
            console.log(err);
        })
    }
    componentWillMount(){
        this.setState({
            loading: false
        })
    }
    render(){
        const {dramas, sports, programs, headlines} = this.state;
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
                            <PopularList title="Popular on Goonj" />
                            <ChannelList />
                            {dramas.length !== 0 ? <DramasSection data={dramas} category="entertainment" /> : <Loader />}
                            {headlines.length !== 0 ? <HeadlinesSection data={headlines} category="news" title="Headlines" /> : <Loader />}
                            {sports.length !== 0 ? <VodSection title="Sports" data={sports} category="sports" /> : <Loader />}
                            {programs.length !== 0 ? <VodSection title="Programs" data={programs} category="programs" classname="programsContainer" /> : <Loader />}
                        </div>
                    </div>
                }
            </div>
        );
    }
}
 
export default Home;