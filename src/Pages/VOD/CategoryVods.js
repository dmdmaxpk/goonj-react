import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../Utils/AxiosInstance';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import config from '../../Utils/config';
import './vod.scss';
import ReactTimeAgo from 'react-time-ago';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Loader from '../../Components/Loader/Loader';
import CategoryDD from '../../Components/VOD/categoryDropdown';


class CategoryVodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            skip: 60,
            limit: 60,
            page: this.props.match.params.pageNumber,
            isPremium: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
    }
    componentDidMount(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        let apiUrl = `/video?category=${this.props.match.params.category}&limit=${this.state.limit}&skip=${this.state.skip * (this.props.match.params.pageNumber - 1)}`;
        let comedyApiUrl = `/video?is_premium=${this.state.isPremium}&category=${this.props.match.params.category}&limit=${this.state.limit}&skip=${this.state.skip * (this.props.match.params.pageNumber - 1)}`;
        AxiosInstance.get(this.props.match.params.category === "comedy" ? comedyApiUrl : apiUrl)
        .then(res =>{
            this.setState({data: res.data});
        })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.pageNumber !== nextProps.match.params.pageNumber || this.props.match.params.category !== nextProps.match.params.category) {
            window.location.reload();
        }
    }
    handleClick(item){
        let {history} = this.props;
        let cat = this.props.match.params.category;
        let url = this.getVodUrl(item.title, item._id);
        if(cat === "comedy"){
            let permission = localStorage.getItem('CPPermission');
            console.log(url);
            permission ? window.location.href = `/${url}` : window.location.href = `${config.hepage}?postUrl=${url}`;
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
        return(
            <div className="vodCategroyContainer">
                <div>
                    <p className="headingVOD floatLeft">{this.props.match.params.category}</p>
                    <CategoryDD category={this.props.match.params.category} />
                </div>
                <GridContainer>
                    {this.state.data.length > 1 ?
                        this.state.data.map(item =>
                            <GridItem className="vodGridItem" xs={6} md={6} lg={2}>
                                <div className="imgDiv" onClick={()=> this.handleClick(item)}>
                                    <span className="playBtn">
                                        <img src={require("../../Assets/playBtn.png")} />
                                    </span>
                                    <img src={`${config.videoLogoUrl}/${item.thumbnail}`} className="videoLogo" />
                                </div>
                                <div className="vodDetailsDiv">
                                    <p className="title" onClick={()=> this.handleClick(item)}>{item.title}</p>
                                    <p className="source"><Link to={`/source/${item.source}/page/1`}>{item.source}</Link></p>
                                    <p className="daysAgo"><ReactTimeAgo date={item.publish_dtm} /></p>
                                </div>
                            </GridItem>
                        )
                    : <Loader />
                    }
                    <GridItem sm={12} md={12} xs={12} >
                        <div className="paginationDiv">
                            {this.state.data.length >= this.state.limit ?
                                <Pagination
                                    page={parseInt(this.props.match.params.pageNumber)}
                                    className="pagination"
                                    count={10}
                                    size="small"
                                    color="primary"
                                    renderItem={(item) => (
                                        <PaginationItem
                                        component={Link}
                                        to={`/category/${this.props.match.params.category}/page/${item.page}`}
                                        {...item}
                                        />
                                        )}
                                />
                                :
                                ""
                            }
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
 
export default CategoryVodPage;