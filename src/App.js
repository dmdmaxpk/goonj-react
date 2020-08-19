import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import SearchPage from "./Components/SearchPage/SearchPage";
import { withRouter } from "react-router";
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
import {
  CheckLiveStatus,
  CheckCPStatus,
  getPackages,
} from "./Services/apiCalls";
import Profile from "./Pages/Profile/Profile";
import { setParams } from "./Services/flowIntegrations";
import PageNotFound from "./Pages/StaticPages/PageNotFound";
import PrivacyPolicy from "./Pages/StaticPages/PrivacyPolicy";
import TermsConditions from "./Pages/StaticPages/TermsConditions";
import ReactGA from 'react-ga';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Tooltip } from "@material-ui/core";
import Unsubscribe from "./Pages/StaticPages/UnSubPage";
import Feedback from "./Components/Feedback/Feedback";


class App extends React.Component {
  componentDidMount() {
    const trackingId = "UA-69091505-15"; // Replace with your Google Analytics tracking ID
    ReactGA.initialize(trackingId);
    this.props.history.listen((location) => {
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname); // Record a pageview for the given page
    });
    
    let userID = localStorage.getItem('userID');
    let localUserId = localStorage.hasOwnProperty(userID);
    console.log("checking for item", localUserId)
    if(localUserId === true){
      let count = localStorage.getItem(userID) ? localStorage.getItem(userID) : 1;
      console.log("count", count)
      count = parseFloat(count);
      count = count + 1;
      localStorage.setItem(userID, count);
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let Urlmsisdn = urlParams.get("msisdn");
    let UrlSource = urlParams.get("source");
    if(Urlmsisdn){
      localStorage.setItem('urlMsisdn', Urlmsisdn);
    }
    if(UrlSource){
      localStorage.setItem('source', UrlSource);
    }
    // if (this.props.location.pathname === "/") {
    //   this.props.history.push("/home");
    // }
  }
  render() {
    return (
      <div>
        {this.props.location.pathname !== "/binjee" ? (
          <div>
            <Header currentRoute={this.props.location.pathname} /> 
            <Sidebar />
            <Feedback />
          </div>
        ) : (
          ""
        )}
        <Switch>
          <Route exact path="/" component={Home} />
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
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/terms-conditions" component={TermsConditions} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/live-tv" component={LiveTv} />
          <Route exact path="/channel/:slug" component={LiveChannel} />
          <Route exact path="/searchresults" component={SearchPage} />
          <Route
            exact
            path="/category/:category/page/:pageNumber"
            component={CategoryVodPage}
          />
          <Route
            exact
            path="/source/:source/page/:pageNumber"
            component={ChannelVodPage}
          />
          <Route exact path="/binjee" component={Binjee} />
          <Route exact path="/paywall/live" component={LivePaywall} />
          <Route exact path="/paywall/comedy" component={ComedyPaywall} />
          <Route exact path="/goonjplus/subscribe">
            <Redirect to="/paywall/live"/>
          </Route>
          <Route exact path="/unsubscribe" component={Unsubscribe} />
          <Route exact path="/404" component={PageNotFound} />
          <Route path="/:vodID" component={VodPage} />
          <Redirect to="/404" />
        </Switch>
        {this.props.location.pathname !== "/binjee" ?
          <div>
            <Tooltip title="Contact us at 727200" placement="left">
              <a target="_blank" href="tel:727200" className="customerCareIcon"><CallOutlinedIcon className="floatingLogo"/></a>
            </Tooltip>
            <a target="_blank" href="https://api.whatsapp.com/send?phone=923427729484" className="whatsappIcon"><WhatsAppIcon className="whatsappLogo"/></a>
            <Footer/>
          </div>
        :
          ''
        }
      </div>
    );
  }
}

export default withRouter(App);
