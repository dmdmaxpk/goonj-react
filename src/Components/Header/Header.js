import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import "./Header.scss";
import { withRouter } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import { auth } from "../../Firebase/firebase.utils";
import {
  selectCurrentUser,
  selectToggleHidden
} from "../../Redux/User/user-selectors";
import { ToggleMenuHidden } from "../../Redux/User/user-actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavMenu from "./NavMenu";
import { Hidden } from "@material-ui/core";

const Header = ({history,currentUser,currentRoute,hidden,ToggleMenuHidden}) => {
  console.log("currentRoute", currentRoute);
  return (
    <div className="header">
      <div className="header__logo-box" onClick={() => history.push("/home")}>
        <img src={Logo} alt="logo" className="header__logo" />
      </div>

      <Hidden mdDown >
        <div className="header__options">
          <div className="header__searchbar">
            <SearchBar currentRoute={currentRoute} />
          </div>
          
          <div className="header__option header__LiveTvBtn">
            <button className="headerLiveBtn" onClick={() => history.push('/live-tv')}>
              <img src={require('../../Assets/btnBg.png')} />
              <p>Live TV</p>
            </button>
          </div>

          <div className="header__playstoreBtn">
            <a target="_blank" href="https://play.google.com/store/apps/details?id=com.dmdmax.goonj&hl=en">
              <img src={require('../../Assets/playstore-header.png')} />
            </a>
          </div>

          {currentUser ? (
            <div className="header__option">
              {/* <Link className="header__option" to="">
                Hi, {currentUser.displayName}
              </Link> */}
              <div
                className="header__option header__option--signout"
                onClick={() => auth.signOut()}
              >
                Sign Out
              </div>
            </div>
          ) : (
            <div className="header__option header__signin">
              {/* <Link className="header__option" to="">
                Hi, Guest
              </Link> */}
              <Link
                className="header__option header__option--signin"
                to="/paywall/live"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </Hidden>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  hidden: selectToggleHidden(state)
});

const mapDispatchToProps = dispatch => ({
  ToggleMenuHidden: () => dispatch(ToggleMenuHidden())
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header);
