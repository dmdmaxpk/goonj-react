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
    }
    componentDidMount(){
        AxiosInstance.get('/live')
        .then(res =>{
            console.log(res.data);
            this.setState({
                data: res.data
            })
        })
        .catch(err =>{
            console.log(err);
        })
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
                        <GridItem xs={6} sm={4} md={2} className="liveGI">
                            <Link style={{textDecoration: "none"}} to={{
                                pathname: `/channel/${item.slug}`,
                                state: {
                                    logo: item.thumbnail,
                                    data: item                                 
                                }
                                }}
                            >
                                <img className="channelImg" src={`${config.channelLogoUrl}/${item.thumbnail}`}  />
                                <p className="channelName">{item.name}</p>
                            </Link>
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