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

let count,strURL;

class SubCategoryPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            skip: 60,
            limit: 60,
            page: this.props.match.params.pageNumber,
            isPremium: true,
            loading: true
           
        }
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
        this.getVideos = this.getVideos.bind(this);
    }
    componentDidMount(){
        strURL = window.location.href.split("/");
        count = parseInt(strURL[strURL.length-1]);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.getVideos();
    }
    countCheck(value){
        let {history} = this.props;
       if(value==0){
            count--;
            history.push(`/category/${this.props.match.params.category}/page/${count}`);
        } if(value==1){
            count++;
            history.push(`/category/${this.props.match.params.category}/page/${count}`);
        }if(value==2){
            history.push(`/category/${this.props.match.params.category}/page/${1}`);
        }
    }
    getVideos(){
        this.setState({loading: true});
        let apiUrl = `/video?sub_category=${this.props.match.params.subCategory}&limit=${this.state.limit}&skip=${this.state.skip * (this.props.match.params.pageNumber - 1)}`;
        let comedyApiUrl = `/video?is_premium=${this.state.isPremium}&category=${this.props.match.params.category}&limit=${this.state.limit}&skip=${this.state.skip * (this.props.match.params.pageNumber - 1)}`;
        PaywallInstance.get(this.props.match.params.category === "comedy" ? comedyApiUrl : apiUrl)
        .then(res =>{
            this.setState({data: res.data, loading: false});
            if(res.data.length < 1){
                this.props.history.push(`/category/${this.props.match.params.category}/${this.props.match.params.subCategory}/page/${1}`);
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.pageNumber !== nextProps.match.params.pageNumber || this.props.match.params.subCategory !== nextProps.match.params.subCategory) {
            this.setState({page: this.props.match.params.pageNumber}, function(){
                this.componentDidMount();
            });
        }
    }
    handleClick(item){
        let {history} = this.props;
        let cat = this.props.match.params.category;
        let url = this.getVodUrl(item.title, item._id);
        if(cat === "comedy"){
            let permission = localStorage.getItem('CPPermission');
            let Urlmsisdn = localStorage.getItem("urlMsisdn");
            // localStorage.setItem('urlMsisdn', Urlmsisdn);
            permission ? this.props.history.push(`/${url}`) : (Urlmsisdn ? this.props.history.push(`/paywall/comedy?postUrl=${url}&msisdn=${Urlmsisdn ? Urlmsisdn : (localStorage.getItem('liveMsisdn') || localStorage.getItem('CPMsisdn'))}`) : window.location.href = `${config.hepage}?postUrl=${url}`);
        }
        else{
            history.push(`/${url}`);
        }
    }
    getVodUrl(title, id){
        let specialCharStr = title.replace(/[^\w\s]/gi, '');
        let str = specialCharStr.replace(/\s+/g, '-').toLowerCase();
        let url = id + "_" + str;
        return url;
    }

    render(){
        console.log("data", this.state.data)
        return(
            <div className="vodCategoryContainer">
                <div>
                    <h4 className="headingVOD floatLeft"><Link style={{color: "#2691D5"}} to={`/category/${this.props.match.params.category}/page/1`}>{this.props.match.params.category}</Link> {">"} {this.props.match.params.subCategory}</h4>
                    {/* <CategoryDD category={this.props.match.params.category} /> */}
                </div>
                    <GridContainer>
                        {this.state.loading === false ?
                            this.state.data.map(item =>
                                <GridItem className="vodGridItem" xs={6} md={6} lg={2}>
                                    {this.state.data.length!=0?
                                    <div>
                                    <div className="imgDiv" onClick={()=> this.handleClick(item)}>
                                        <span className="playBtn">
                                            <img src={require("../../Assets/playBtn.png")} alt="Play" />
                                        </span>
                                        <img src={`${config.videoLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} className="videoLogo" alt={item.thumbnail} />
                                    </div>
                                    <div className="vodDetailsDiv">
                                        <p className="title" onClick={()=> this.handleClick(item)}>{item.title}</p>
                                        <p className="source"><Link to={`/source/${item.source}/page/1`}>{item.source} | <ReactTimeAgo className="daysAgo" date={item.publish_dtm}/></Link></p>
                                        {/* <p className="daysAgo"><ReactTimeAgo date={item.publish_dtm} /></p> */}
                                    </div></div>
                                    :
                                    ''
                                        }
                                </GridItem>
                            )
                        : <Loader />
                        }
                        <GridItem sm={12} md={12} xs={12} >
                            <div className="paginationDiv">
                                <PaginationComponent params={this.props.match.params} data={this.state.data} />
                            </div>
                        </GridItem>
                    </GridContainer>
            </div>
        );
    }
}
 
export default SubCategoryPage;