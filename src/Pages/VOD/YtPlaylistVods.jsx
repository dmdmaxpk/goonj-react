import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaywallInstance from '../../Utils/PaywallInstance';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import config from '../../Utils/config';
import ReactTimeAgo from 'react-time-ago';
import PaginationComponent from '../../Components/Pagination/PaginationComponent'
import Loader from '../../Components/Loader/Loader';
import CategoryDD from '../../Components/VOD/categoryDropdown';
import './vod.scss';
import MainCategory from './MainCategory';
import ReactGA from 'react-ga';
import { withRouter } from "react-router-dom";
import Axios from 'axios';
import GoogleAdBanner from '../../Components/MTA/GoogleAdBanner';

ReactGA.initialize('G-2TG6PV2GL9'); 

let count,strURL;
let subCats = ['drama', 'programs'];

class YtPlaylistPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            data: [],
            skip: 60,
            limit: 60,
            page: this.props.match.params.pageNumber,
            isPremium: true,
            loading: true,
            isMta: false,
            isLightTheme: false
           
        }
    }

    getPlaylist = async() => {
        const playlistId = this.props.match.params.playlistId;
        console.log('playlistId', playlistId)
        Axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&&key=${config.googleApiKey}`)
        .then(res => {
            const result = res.data;
            console.log('result', result);
            this.setState({title: result.items[0].snippet.title});
        })
        .catch(error => {
            console.log('error', error);
        })
    }

    getPlaylistDramas = async() => {
        const playlistId = this.props.match.params.playlistId;
        console.log('playlistId', playlistId)
        Axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${config.googleApiKey}`)
        .then(res => {
            const result = res.data;
            console.log('result', result);
            this.setState({data: result.items, loading: false})
        })
        .catch(error => {
            console.log('error', error);
        })
    }

    handleClick = (item) => {
        console.log('item', item);
        // this.props.history.push(`/green-tv-ent/${this.props.match.params.playlistId}/${item.snippet.resourceId.videoId}?title=${item.snippet.title}${this.props.location.search.includes('source=mta') ? '&source=mta' : ''}`)
        window.location.href = `/green-tv-ent/${this.props.match.params.playlistId}/${item.snippet.resourceId.videoId}?title=${item.snippet.title}${this.props.location.search.includes('source=mta') ? '&source=mta' : ''}`;
    }

    componentDidMount() {
        this.getPlaylist();
        this.getPlaylistDramas();
    };

    
    render(){
        const { isLightTheme } = this.state;
        const dramas = this.state.data.filter((item) => 
            item.snippet.resourceId.videoId !== this.props.match.params.videoId
            &&
            item?.snippet?.title !== 'Private video'
        );
        return(
            <div className="vodCategoryContainer">
                {this.props?.disableHeading ?
                    null
                :
                    <div>
                        <p style={{ color: isLightTheme ? "#87CEEB" : "white" }}>{this.state.title.toUpperCase()}</p>
                    </div>
                }
                {/* Top Ad Banner */}
                {dramas.length === 0 ?
                    <></>
                    :
                    <GridContainer>
                        <div style={{ margin: '1vh 1vw' }}>
                            <GoogleAdBanner
                                adUnitPath="/23081330779/goonj_web_top"
                                sizes={[[320, 100], [320, 50]]}
                                divId="div_goonj_web_top"
                                targeting={{ goonj_section: ['YtPlaylistPage'] }} // Replace 'home' with other sections as needed
                            />
                        </div>
                        {this.state.loading === false ?
                            dramas?.reverse()?.map((item, index) =>
                                <GridItem className={`vodGridItem ${index % 2 === 0 && this.props.className ? this.props.className : ''}`} style={{marginBottom: '4vh !important'}} xs={6} md={6} lg={2}>
                                    {dramas.length!=0?
                                    <div>
                                    <div className="imgDiv" onClick={()=> this.handleClick(item)}>
                                        <span className="playBtn">
                                            <img src={require("../../Assets/playBtn.png")} alt="Play" />
                                        </span>
                                        <img src={item?.snippet?.thumbnails?.standard?.url} width={item?.snippet?.thumbnails?.standard?.width} height={item?.snippet?.thumbnails?.standard?.height} className="videoLogo" alt="" />
                                    </div>
                                    <div className="" style={{textAlign: 'center'}}>
                                        <p className="title" style={{ color: isLightTheme ? "#87CEEB" : "white" }} onClick={()=> this.handleClick(item)}>{item.snippet.title}</p>
                                        <p className="source"><ReactTimeAgo className="daysAgo" date={item.snippet.publishedAt}/>
                                        {/* | <font style={{fontSize: "smaller"}}>{item.views_count} views</font> */}
                                        </p>
                                        {/* <p className="daysAgo"><ReactTimeAgo date={item.publish_dtm} /></p> */}
                                    </div></div>
                                    :
                                    ''
                                        }
                                </GridItem>
                            )
                        : <Loader />
                        }
                        {/* {this.props?.disablePagination ? 
                            null
                        :
                            <GridItem sm={12} md={12} xs={12} >
                                <div className="paginationDiv">
                                    <PaginationComponent params={this.props.match.params} data={this.state.data} limit={50} />
                                </div>
                            </GridItem>
                        } */}
                        <div style={{ margin: '1vh 1vw' }}>
                            <GoogleAdBanner
                                adUnitPath="/23081330779/goonj_web_body"
                                sizes={[[320, 100], [320, 50]]}
                                divId="div_goonj_web_body"
                                targeting={{ goonj_section: ['YtPlaylistPage'] }} // Replace 'home' with other sections as needed
                            />
                        </div>
                    </GridContainer>
                }
                {/* Bottom Ad Banner */}
            </div>
        );
    }
}
 
export default withRouter(YtPlaylistPage);