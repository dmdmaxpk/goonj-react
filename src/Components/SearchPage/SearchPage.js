import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../Utils/AxiosInstance';
import GridContainer from '../../Components/Grid/GridContainer';
import GridItem from '../../Components/Grid/GridItem';
import config from '../../Utils/config';
import '../../Pages/VOD/vod.scss';
import ReactTimeAgo from 'react-time-ago';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Loader from '../../Components/Loader/Loader';


class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            skip: 0,
            limit: 102,
            limitNum: 0,
            page: this.props.match.params.pageNumber,
            loading: true,
            noData: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.getVodUrl = this.getVodUrl.bind(this);
    }
    componentDidMount(){
      let searchValue = this.props.history.location.state.searchValue ? this.props.history.location.state.searchValue : " ";
      let apiUrl = `/search?term=${searchValue}&limit=${this.state.limit}&skip=${this.state.skip}`;
      this.setState({noData: false, loading: true})
      AxiosInstance.get(apiUrl)
      .then(res =>{
          this.setState({data: res.data, loading: false});
          if(res.data.length === 0){
              this.setState({noData: true})
          }
          else{
              this.setState({noData: false})
          }
      })
  }
    componentWillReceiveProps(nextProps, nextState) {
        if(this.props.match.params.pageNumber !== nextProps.match.params.pageNumber) {
            window.location.reload();
        }
        if(this.state.data !== nextState.data){
          let searchValue = this.props.history.location.state.searchValue ? this.props.history.location.state.searchValue : " ";
          let apiUrl = `/search?term=${searchValue}&limit=${this.state.limit}&skip=${this.state.skip}`;
          this.setState({noData: false, loading: true});
          AxiosInstance.get(apiUrl)
          .then(res =>{
              this.setState({data: res.data, loading: false});
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
            <div className="vodCategroyContainer">
                <p className="heading">Search result for: {searchValue}</p>
                <GridContainer>
                    {
                        this.state.loading === false && this.state.noData === false ?
                            this.state.data.map(item =>
                                <GridItem className="vodGridItem" xs={6} md={6} lg={2}>
                                    <div className="imgDiv" onClick={()=> this.handleClick(item)}>
                                        <span className="playBtn">
                                            <img src={require("../../Assets/playBtn.png")} />
                                        </span>
                                        <img src={`${config.videoLogoUrl}/${item.thumbnail.split(".")[0]}.jpg`} className="videoLogo" />
                                    </div>
                                    <div className="vodDetailsDiv">
                                        <p className="title" onClick={()=> this.handleClick(item)}>{item.title}</p>
                                        <p className="source"><Link to={`/source/${item.source}/page/1`}>{item.source}</Link></p>
                                        <p className="daysAgo"><ReactTimeAgo date={item.publish_dtm} /></p>
                                    </div>
                                </GridItem>
                            )
                            :
                            this.state.loading === true && this.state.noData === false ?
                            <Loader />
                            :
                            this.state.loading === false && this.state.noData === true ?
                            <GridItem xs={12} sm={12} md={12} style={{textAlign: "center"}}>
                                <img src={require('../../Assets/nodata-found.png')} />
                            </GridItem>
                            :
                            ''
                    }
                </GridContainer>
            </div>
        );
    }
}
 
export default SearchPage;