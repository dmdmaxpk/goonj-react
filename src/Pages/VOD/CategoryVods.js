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


class CategoryVodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            skip: 60,
            limit: 60,
            page: this.props.match.params.pageNumber
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
        
        AxiosInstance.get(apiUrl)
        .then(res =>{
            console.log(res.data);
            this.setState({data: res.data});
        })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.pageNumber !== nextProps.match.params.pageNumber) {
            window.location.reload();
        }
    }
    handleClick(item){
        let url = this.getVodUrl(item.title, item._id);
        console.log("url", url);
        this.props.history.push({
            pathname: `/${url}`,
            state: {data: item}
          });
    }
    getVodUrl(title, id){
        let specialCharStr = title.replace(/[^\w\s]/gi, '');
        let str = specialCharStr.replace(/\s+/g, '-').toLowerCase();
        let url = id + "_" + str;
        return url;
    }
    render(){
        console.log(this.props);
        return(
            <div className="vodCategroyContainer">
                <p className="heading">{this.props.match.params.category}</p>
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
                            <Pagination
                                page={parseInt(this.props.match.params.pageNumber)}
                                className="pagination"
                                count={10}
                                color="primary"
                                renderItem={(item) => (
                                    <PaginationItem
                                    component={Link}
                                    to={`/category/${this.props.match.params.category}/page/${item.page}`}
                                    {...item}
                                    />
                                )}
                            />
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
 
export default CategoryVodPage;