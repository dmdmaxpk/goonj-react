import React, { Component } from "react";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link } from "react-router-dom";

export default class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      limit: 60,
    };
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
              to={`/category/${this.props.params.category}/page/${item.page}`}
              {...item}
            />
          )}
        />
      </div>
    );
  }
}
