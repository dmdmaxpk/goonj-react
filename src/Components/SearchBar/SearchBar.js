import React from "react";
import "./SearchBar.scss";
import { withRouter } from "react-router-dom";
import { selectSearchItems } from "../../Redux/Search/search-selectors";
import { connect } from "react-redux";
import { compose } from "redux";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPath: "",
      value: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
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
    }
    else if (Number(value.length) > 0) {
      this.props.history.push({
        pathname: "/searchresults",
        state: {searchValue: value}
      });
    }
  };

  render() {
    return (
      <div className="container-1">
        <div className="container-2">
          <input onChange={this.handleChange} type="search" id="search" placeholder="Search..." />
          <span className="search-icon" style={{cursor: "pointer"}} onClick={this.handleClick}>
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
