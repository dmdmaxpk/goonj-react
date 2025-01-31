import React, { Component } from 'react';
import AxiosInstance from '../../Utils/AxiosInstance';
import config from '../../Utils/config';
import ReactTimeAgo from 'react-time-ago';
import { withRouter } from 'react-router-dom';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import { CircularProgress } from '@material-ui/core';

class RecommendationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendations: [],
            limit: 4,
            loading: true
        }
        this.getRecommendations = this.getRecommendations.bind(this);
        this.kFormatter = this.kFormatter.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
    }
    componentDidMount(){
        this.getRecommendations();
    }
    getRecommendations(){
        const {topics} = this.props;
        let topicString = topics.toString();
        AxiosInstance.get(`/video/recommendations?id=${this.props.id}&msisdn=${localStorage.getItem('liveMsisdn')}`)
        .then(res =>{
            console.log('res', res)
            this.setState({
                recommendations: res.data.code === -1 ? [] : res.data,
                loading: false
            });
        })
        .catch(err =>{
        })
    }
    kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }
    handleClick(item){
        let url = this.getVodUrl(item.title, item._id);
        this.props.history.push({
            pathname: `/${url}`
          });
    }
    getVodUrl(title, id){
        let specialCharStr = title.replace(/[^\w\s]/gi, '');
        let str = specialCharStr.replace(/\s+/g, '-').toLowerCase();
        let url = id + "_" + str;
        return url;
    }
    render(){
        let {recommendations} = this.state;
        let pathname = window.location.pathname;
        let id = pathname.split('_')[0].split('/')[1];
        let {loading} = this.state;
        return(
            <div className="recomListContainer">
            <p className="recomHeading">Up Next</p>
            <GridContainer className="recomGridContainer" style={{position: `${loading === true ? 'relative' : ''}`, left: `${loading === true ? '50%' : ''}`}}>
                {this.state.loading === false ?
                    recommendations.filter(element => element._id !== id).map(item =>
                            <GridItem xs={3} sm={3} md={12} className="recomDiv" key={item._id} onClick={()=> this.handleClick(item)}>
                                <img className="recomImg" src={`${config.videoLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} alt={item.thumnail} />
                                <img className="recomPlayBtn" src={require('../../Assets/playBtn.png')} alt="Play" />
                                <div className="recomTextDiv">
                                    <p className="recomTitle">{item.title}</p>
                                    <div className="recomendation_details_div">
                                    <p className="grey recomSource">{item.source}</p>
                                    {/* <p className="grey recomCount">{this.kFormatter(item.views_count)} views</p> */}
                                    <p className="grey"><ReactTimeAgo date={item.publish_dtm ? item.publish_dtm : new Date()} /></p>
                                    </div>
                                </div>
                            </GridItem>
                    )
                :
                <CircularProgress className=""/>
                }
            </GridContainer>
            </div>
        );
    }
}
 
export default withRouter(RecommendationList);