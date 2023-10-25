import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaywallInstance from '../../Utils/PaywallInstance';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import config from '../../Utils/config';
import './vod.scss';
import ReactTimeAgo from 'react-time-ago';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import PaginationComponent from '../../Components/Pagination/PaginationComponent'
import Loader from '../../Components/Loader/Loader';
import CategoryDD from '../../Components/VOD/categoryDropdown';
import ReactGA from 'react-ga';

ReactGA.initialize('G-2TG6PV2GL9'); 


class ChannelVodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            skip: 60,
            limit: 60,
            page: this.props.match.params.pageNumber,
            isMta: false,
            loading: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
        this.getVideos = this.getVideos.bind(this);
    }
    componentDidMount(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.getVideos();

        // MTA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");
        // mta check
        if(this.source === 'mta'){
            this.setState({isMta: true});
        }
        else{
            this.setState({isMta: false});
        }

    }
    getVideos(){
        this.setState({loading: true});
        let apiUrl = `/video?source=${this.props.match.params.source}&limit=${this.state.limit}&skip=${this.state.skip * (this.props.match.params.pageNumber - 1)}`;
        PaywallInstance.get(apiUrl)
        .then(res =>{
            this.setState({data: res.data, loading: false});
        })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.pageNumber !== nextProps.match.params.pageNumber) {
            this.setState({page: this.props.match.params.pageNumber}, function(){
                this.componentDidMount();
            })
        }
    }
    
    handleClick(item){
        let url = this.getVodUrl(item.title, item._id);
        // source=mta check
        let pathname = `/${url}`;
        if (this.state.isMta){
            pathname += '?source=mta';
        }
        this.props.history.push({
            pathname: pathname,
            state: {data: item}
          });
        
        //GA4
        console.log("MTA is: ",this.state.isMta);
        if(this.state.isMta){
            console.log("MTA Vod is invoked in ChannelVods!");
            console.log("VOD Channel is: ", pathname);
            const fullURL = pathname;
            console.log("Vod URL landed on through ChannelVods: ", pathname);
            // Trigger a custom event with the full URL as the page_location parameter
            console.log(`MTA_VOD_Play event triggered`);
            ReactGA.event({
                category: 'Custom Event',
                    action: 'MTA_VOD_Play',
                    label: fullURL // Include the page location in the 'label' parameter
            });
        }
          
    }
    getVodUrl(title, id){
        let specialCharStr = title.replace(/[^\w\s]/gi, '');
        let str = specialCharStr.replace(/\s+/g, '-').toLowerCase();
        let url = id + "_" + str;
        return url;
    }
    render(){
        return(
            <div className="vodCategoryContainer">
                <div>
                    <p className="headingVOD floatLeft">{this.props.match.params.source}</p>
                    <CategoryDD category={this.props.match.params.category} />
                </div>
                <GridContainer>
                    {this.state.loading === false ?
                        this.state.data.map(item =>
                            <GridItem className="vodGridItem" xs={6} md={6} lg={2}>
                                <div className="imgDiv" onClick={()=> this.handleClick(item)}>
                                    <span className="playBtn">
                                        <img src={require("../../Assets/playBtn.png")} alt="Play" />
                                    </span>
                                    <img src={`${config.videoLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} className="videoLogo" alt={item.thumbnail} />
                                </div>
                                <div className="vodDetailsDiv">
                                    <p className="title" onClick={()=> this.handleClick(item)}>{item.title}</p>
                                    <p className="source"><Link to={`/source/${item.source}/page/1`}>{item.category} | <ReactTimeAgo className="daysAgo" date={item.publish_dtm}/></Link> | <font style={{fontSize: "smaller"}}>{item.views_count} views</font></p>
                                </div>
                            </GridItem>
                        )
                    : <Loader />
                    }
                    <GridItem sm={12} md={12} xs={12}>
                        <div className="paginationDiv">
                            {/* <Pagination
                                page={parseInt(this.props.match.params.pageNumber)}
                                className="pagination"
                                count={this.state.data.length >= this.state.limit ? parseInt(this.props.match.params.pageNumber) + 1 : parseInt(this.props.match.params.pageNumber)}
                                color="primary"
                                renderItem={(item) => (
                                    <PaginationItem
                                    component={Link}
                                    to={`/source/${this.props.match.params.source}/page/${item.page}`}
                                    {...item}
                                    />
                                )}
                            /> */}
                             <PaginationComponent params={this.props.match.params} data={this.state.data} />
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
 
export default ChannelVodPage;