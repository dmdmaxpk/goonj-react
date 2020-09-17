import React, { Component } from "react";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link, withRouter } from "react-router-dom";

class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      limit: 60,
    };
    this.getUrl = this.getUrl.bind(this);
  }
  componentDidMount(){
    this.getUrl();
  }
  getUrl(){
    let path = this.props.history.location.pathname;
    let str = path.split('/');
    let url = str.slice(0, -1).join('/');
    return url;
  }
  render() {
    return (
      <div>
        <Pagination
          page={parseInt(this.props.params.pageNumber)}
          className="pagination"
          count={
            this.props.data.length >= this.state.limit
              ? parseInt(this.props.params.pageNumber) + 1
              : parseInt(this.props.params.pageNumber)
          }
          size="small"
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${this.getUrl()}/${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(PaginationComponent);