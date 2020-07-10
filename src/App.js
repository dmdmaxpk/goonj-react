import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import SearchPage from "./Components/SearchPage/SearchPage";
import { withRouter } from "react-router";
import ListOverview from "./Components/ListOverview/ListOverview";
import Home from "./Pages/Home/Home";
import LiveChannel from "./Pages/Live/LiveChannel";
import Footer from "./Components/Footer/Footer";
import Sidebar from "./Components/Sidebar/Sidebar";
import ChannelVodPage from "./Pages/VOD/ChannelVods";
import CategoryVodPage from "./Pages/VOD/CategoryVods";
import VodPage from "./Pages/VOD/VodPage";
import LiveTv from "./Pages/Live/LiveTvList";
import Binjee from "./Pages/Binjee/Binjee";
import LivePaywall from "./Pages/Paywall/LivePaywall";
import ComedyPaywall from "./Pages/Paywall/ComedyPaywall";
import { CheckLiveStatus, CheckCPStatus, getPackages } from "./Services/apiCalls";
import Profile from './Pages/Profile/Profile';
import { setParams } from "./Services/flowIntegrations";
import PageNotFound from "./Pages/NotFound/PageNotFound";


class App extends React.Component {
  componentDidMount(){
    if(this.props.location.pathname === '/'){
      this.props.history.push('/home');
    }
    // getPackages();
    setParams();
    CheckLiveStatus();
    CheckCPStatus();
;  }
  render() {
    return (
      <div>
        {this.props.location.pathname !== "/binjee" ?
          <div>
            <Header currentRoute={this.props.location.pathname} /> 
             <Sidebar position={"left"} /> 
          </div>
          :
          ''
        }
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route
            exact
            path="/paywall/live"
            render={() =>
              this.props.currentUser ? <Redirect to="/home" /> : <LivePaywall />
            }
          />
          <Route
            exact
            path="/paywall/live"
            render={() =>
              this.props.currentUser ? <Redirect to="/home" /> : <LivePaywall />
            }
          />
          <Route exact path="/404" component={PageNotFound} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/live-tv" component={LiveTv} />
          <Route exact path="/channel/:slug" component={LiveChannel}/>
          <Route exact path="/searchresults" component={SearchPage} />
          <Route exact path="/category/:category/page/:pageNumber" component={CategoryVodPage} />
          <Route exact path="/source/:source/page/:pageNumber" component={ChannelVodPage} />
          <Route exact path="/binjee" component={Binjee} />
          <Route exact path="/:vodID" component={VodPage} />
          <Route exact path="/paywall/live" component={LivePaywall} />
          <Route exact path="/paywall/comedy" component={ComedyPaywall} />
          <Redirect to="/404" />
        </Switch>
        {this.props.location.pathname !== "/binjee" ?
          <Footer/>
        :
          ''
        }
      </div>
    );
  }
}

export default (withRouter)(App);
