import React from "react";
import "./SearchBar.scss";
import { withRouter } from "react-router";
import { selectSearchItems } from "../../Redux/Search/search-selectors";
import { getSearchData } from "../../Redux/Search/search-actions";
import { connect } from "react-redux";
import { compose } from "redux";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPath: "",
      value: ""
    };
  }
  handleClick = event => {
    const { value } = this.state;
    this.props.history.push({
      pathname: "/searchresults",
      state: {searchValue: value}
    })
  }
  handleChange = event => {
    const { value } = event.target;
    this.setState({value});
    if (
      Number(value.length) === 1 &&
      this.props.currentRoute !== "/searchresults"
    ) {
      this.setState({ currentPath: this.props.currentRoute }, () =>
        this.props.history.push({
          pathname: "/searchresults",
          state: {searchValue: value}
        })  
      );
    }
    else if (Number(value.length) === 0) {
      // this.props.history.push(`${this.state.currentPath}`);
    }
    else if (Number(value.length) > 0) {
      this.props.history.push({
        pathname: "/searchresults",
        state: {searchValue: value}
      });
    }
    // return value ? this.props.dispatch(getSearchData(value)) : null;
  };

  render() {
    return (
      <div className="container-1">
        <div className="container-2">
          <input onChange={this.handleChange} type="search" id="search" placeholder="Search..." />
          <span className="search-icon" style={{cursor: "pointer"}}>
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchItems: selectSearchItems(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(SearchBar);
