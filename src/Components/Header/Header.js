import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import "./Header.scss";
import { withRouter } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import {
  selectCurrentUser,
  selectToggleHidden
} from "../../Redux/User/user-selectors";
import { ToggleMenuHidden } from "../../Redux/User/user-actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { Hidden } from "@material-ui/core";
import { setParams } from "../../Services/flowIntegrations";
import { CheckLiveStatus, CheckCPStatus } from "../../Services/apiCalls";
import LiveTvIcon from '@material-ui/icons/LiveTv';

const Header = ({history,currentUser,currentRoute,hidden,ToggleMenuHidden}) => {
  function signout(){
    localStorage.clear();
    window.location.reload();
  };
  setParams();

  let pathname = history.location.pathname.split('/')[1];
  if(pathname === "channel"){
  }
  else{
    CheckLiveStatus();
  }

  if(pathname.split('_')[0].length === 4 && pathname.includes('_')){
  }
  else{
    // CheckCPStatus();
  }
  return (
    <div className="header">
      <div className="header__logo-box" onClick={() => history.push("/home")}>
        <img src={Logo} alt="logo" className="header__logo" alt="Header logo" />
      </div>

      <Hidden mdDown >
        <div className="header__options">
          <div className="header__searchbar">
            <SearchBar currentRoute={currentRoute} />
          </div>
          
          <div className="header__option header__LiveTvBtn">
            <button className="headerLiveBtn" onClick={() => history.push('/live-tv')}>
              <LiveTvIcon className="liveTvIcon" fontSize="small" />
              <p className="ml-2">Live TV</p>
            </button>
          </div>

          <div className="header__playstoreBtn">
            <a target="_blank" href="https://play.google.com/store/apps/details?id=com.dmdmax.goonj&hl=en">
              <img src={require('../../Assets/playstore-header.png')} alt="Playstore" />
            </a>
          </div>

          {currentUser ? (
            <div className="header__option">
              <div
                className="header__option header__option--signout"
              >
                Sign Out
              </div>
            </div>
          ) : (
            <div className="header__option header__signin">
              {!(localStorage.getItem('livePermission') || localStorage.getItem('CPPermission')) ?
                <Link
                  className="header__option header__option--signin"
                  to="/paywall/live"
                  >
                  Sign In
                </Link>
              :
                ""
                // <Link
                //   onClick={()=> signout()}
                //   className="header__option header__option--signin"
                //   to="/paywall/live"
                //   >
                //   Sign Out
                // </Link>
              }
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
