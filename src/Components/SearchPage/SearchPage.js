import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../Utils/AxiosInstance';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import config from '../../Utils/config';
import '../../Pages/VOD/vod.scss';
import InfiniteScroll from "react-infinite-scroll-component";
import ReactTimeAgo from 'react-time-ago';
import Loader from '../../Components/Loader/Loader';
import './SearchPage.scss'


class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            skip: 30,
            limit: 30,
            page: this.props.match.params.pageNumber,
            loading: true,
            hasMoree: true,
            noData: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
    }

    fetchingData = () =>{
        let searchValue = this.props.history.location.state.searchValue ? this.props.history.location.state.searchValue : " ";
        let apiUrl = `/search?term=${searchValue}&limit=${this.state.limit}&skip=${this.state.skip}`;
        this.setState({noData: false, loading: false})
        AxiosInstance.get(apiUrl)
        .then(res =>{
            this.setState({data: this.state.data.concat(res.data)});
        })
        this.state.skip = this.state.skip+30;
    }
    componentDidMount(){
        let searchValue = this.props.history.location.state.searchValue ? this.props.history.location.state.searchValue : " ";
        let apiUrl = `/search?term=${searchValue}&limit=${this.state.limit}&skip=${0}`;
        this.setState({noData: false, loading: true})
        AxiosInstance.get(apiUrl)
        .then(res =>{
            this.setState({data:res.data, loading: false});
            if(res.data.length === 0){
                this.setState({noData: true})
            }
            else{
                this.setState({noData: false})
            }
        })
  }
    componentWillReceiveProps(nextProps, nextState) {
        if(this.state.data !== nextState.data){
          let searchValue = this.props.history.location.state.searchValue ? this.props.history.location.state.searchValue : " ";
          let apiUrl = `/search?term=${searchValue}&limit=${30}&skip=${0}`;
          this.setState({noData: false, loading: true});
          AxiosInstance.get(apiUrl)
          .then(res =>{
              this.setState({data: res.data, loading: false});
              console.log("HEllo  "+res.data)
              if(res.data.length === 0){
                this.setState({noData: true})
              }
              else{
                  this.setState({noData: false})
              }
          })
          .catch(err =>{
            // console.log(err);
          });
            this.setState({skip: 30, isDeleted: true})
            
        }
    }
    handleClick(item){
        let url = this.getVodUrl(item.title, item._id);
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
        let searchValue = this.props.history.location.state.searchValue ? this.props.history.location.state.searchValue : " ";
        return(
            <div className="vodCategoryContainer">
                <p className="searchHeading">Search result for: {searchValue}</p>
                <GridContainer >
                    {this.state.loading === false && this.state.noData === false ?
                            <InfiniteScroll
                                dataLength={this.state.data.length}
                                next={this.fetchingData}
                                hasMore={this.state.hasMoree}
                                className="infiniteScrollPadding"
                                >   
                                <GridContainer >
                                    {this.state.data.map(item =>
                                    <GridItem className="vodGridItem" xs={6} md={6} lg={2}>
                                    
                                            <div className="imgDiv" onClick={()=> this.handleClick(item)}>
                                                <span className="playBtn">
                                                    <img src={require("../../Assets/playBtn.png")} alt="Play" />
                                                </span>
                                                <img src={`${config.videoLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} className="videoLogo" alt={item.thumbnail} />
                                            </div>
                                            <div className="vodDetailsDiv">
                                                <p className="title" onClick={()=> this.handleClick(item)}>{item.title}</p>
                                                <p className="source"><Link to={`/source/${item.source}/page/1`}>{item.source} | <ReactTimeAgo date={item.publish_dtm} /></Link></p>
                                            </div>
                                    </GridItem>
                                    )}
                                </GridContainer>
                            </InfiniteScroll>
                    :
                    ''
                    }
                </GridContainer>
                
            </div>
        );
    }
}
 
export default SearchPage;