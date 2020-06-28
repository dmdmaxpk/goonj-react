import React, { Component } from 'react';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import AxiosInstance from '../../Utils/AxiosInstance';
import config from '../../Utils/config';
import { Link } from 'react-router-dom';
import './Live.scss';
import Loader from '../../Components/Loader/Loader';

class LiveTv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    componentDidMount(){
        AxiosInstance.get('/live')
        .then(res =>{
            this.setState({
                data: res.data
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }
    handleRedirect(item){
        let userVerified = localStorage.getItem('userVerified');
        let url = userVerified ? `/channel/${item.slug}` : `${config.hepage}?slug=${item.slug}`;
        return url;
    }
    render(){
        let data = this.state.data;

        return(
            <GridContainer className="liveTvContainer">
                <GridItem xs={12} sm={12} md={12}>
                    <p className="heading">Live Channels</p>
                </GridItem>

                {data.length > 0 ?
                    data.map(item =>
                        <GridItem key={item.slug} xs={6} sm={4} md={2} className="liveGI">

                            <a href={this.handleRedirect(item)}>
                                <img className="channelImg" src={`${config.channelLogoUrl}/${item.thumbnail}`}  />
                                <p className="channelName">{item.name}</p>
                            </a>
                        </GridItem>
                    )
                :
                <GridItem className="loaderGI" xs={12} sm={12} md={12}>
                    <Loader />
                </GridItem>
                }
            </GridContainer>
        );
    }
}
 
export default LiveTv;