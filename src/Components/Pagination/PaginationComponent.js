//PaginationComponent.js
import React, { Component } from "react";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link, withRouter } from "react-router-dom";
import "./Pagination.css"

class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      limit: this.props?.limit ?? 60,
      isDarkTheme: false,
      isLightTheme: false
    };
    this.getUrl = this.getUrl.bind(this);
  }
  componentDidMount(){
    // MTA
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.source = urlParams.get("source");

  //// Theme checks
    
    if(this.source === 'mta'){
      this.setState({isDarkTheme: true});
    }
    else{
        this.setState({isDarkTheme: false});
    }


    if(this.source === 'mta2'){
        this.setState({isLightTheme: true});
    }
    else{
        this.setState({isLightTheme: false});
    }

  ////


    this.getUrl();
  }
  getUrl(){
    let path = this.props.history.location.pathname;
    let str = path.split('/');
    let url = str.slice(0, -1).join('/');
    return url;
  }
    
  render() {
    const { isLightTheme, isDarkTheme } = this.state;
    return (
      <div>
        <Pagination
          page={parseInt(this.props.params.pageNumber)}
          className="MuiPaginationItem-root"
          count={
            this.props.data.length >= this.state.limit
              ? parseInt(this.props.params.pageNumber) + 1
              : parseInt(this.props.params.pageNumber)
          }
          size="small"
          color="primary"
          /*type={"page"|| "first" || "last" || "next" || "previos"}*/
          hideNextButton
          showFirstButton
          hidePrevButton
          showLastButton
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              /*to={`${this.getUrl()}/${item.page}`}*/
              to={`${this.getUrl()}/${item.page}${isDarkTheme? '?source=mta' :isLightTheme ? '?source=mta2' : ''}`}
              {...item}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(PaginationComponent);