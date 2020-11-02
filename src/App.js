import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Switch, Route, Redirect } from "react-router-dom";
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
import Profile from "./Pages/Profile/Profile";
import PageNotFound from "./Pages/StaticPages/PageNotFound";
import PrivacyPolicy from "./Pages/StaticPages/PrivacyPolicy";
import TermsConditions from "./Pages/StaticPages/TermsConditions";
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Tooltip } from "@material-ui/core";
import Unsubscribe from "./Pages/StaticPages/UnSubPage";
import Feedback from "./Components/Feedback/Feedback";
import MainCategory from "./Pages/VOD/MainCategory";
import SubCategoryPage from "./Pages/VOD/SubCategory";
import FreeChannel from "./Pages/Live/FreeChannel";
import YoutubeChannel from "./Pages/Live/YoutubeChannel";

class App extends React.Component {
  installPrompt = null;
  componentDidMount() {

    // console.log("Listening for Install prompt");
    window.addEventListener('beforeinstallprompt',e=>{
      // For older browsers
      e.preventDefault();
      // console.log("Install Prompt fired");
      this.installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true){
        return false;
      }
      // Set the state variable to make button visible
      this.setState({
        installButton:true
      })
    })



    let userID = localStorage.getItem('userID');
    let localUserId = localStorage.hasOwnProperty(userID);
    // console.log("checking for item", localUserId)
    if(localUserId === true){
      let count = localStorage.getItem(userID) ? localStorage.getItem(userID) : 1;
      // console.log("count", count)
      count = parseFloat(count);
      count = count + 1;
      localStorage.setItem(userID, count);
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let Urlmsisdn = urlParams.get("msisdn");
    let UrlSource = urlParams.get("source");
    let UrlAccessToken = urlParams.get("access_token");
    let UrlRefreshToken = urlParams.get("refresh_token");
    if(Urlmsisdn){
      localStorage.setItem('urlMsisdn', Urlmsisdn);
    }
    if(UrlSource){
      localStorage.setItem('source', UrlSource);
    }
    if(UrlAccessToken){
      localStorage.setItem('accessToken', UrlAccessToken);
    }
    if(UrlRefreshToken){
      localStorage.setItem('refreshToken', UrlRefreshToken);
    }
    // if (this.props.location.pathname === "/") {
    //   this.props.history.push("/home");
    // }

    if((localStorage.getItem('livePermission') && localStorage.getItem('CPPermission') && (!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')))){
      localStorage.clear();
    }
    
    this.installApp();
  }


  installApp=async ()=>{
    if(!this.installPrompt) return false;
    this.installPrompt.prompt();
    let outcome = await this.installPrompt.userChoice;
    if(outcome.outcome=='accepted'){
      // console.log("App Installed")
    }
    else{
      // console.log("App not installed");
    }
    // Remove the event reference
    this.installPrompt=null;
    // Hide the button
    this.setState({
      installButton:false
    })
  }

  render() {
    return (
      <div>
        {this.props.location.pathname.toLowerCase() !== "/binjee"  ? (
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
          <Route exact path="/stream/zet20" component={FreeChannel} />
          {/* <Route exact path="/stream/ffcs" component={YoutubeChannel} /> */}
          <Route exact path="/searchresults" component={SearchPage} />
          <Route path='/category/comedy/page/:pageNumber' component={() => { window.location = 'http://comedy.goonj.pk'; return null;} }/>
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
          <Route exact path="/binjee" component={Binjee}>
            <Redirect to="/home" />
          </Route>
          <Route exact path="/paywall/live" component={LivePaywall} />
          <Route exact path="/paywall/comedy" component={ComedyPaywall} />
          <Route exact path="/goonjplus/subscribe">
            <Redirect to="/paywall/live"/>
          </Route>
          <Route exact path="/news">
            <Redirect to="/stream/zet20"/>
          </Route>
          <Route exact path="/category/:category/:subCategory/page/:pageNumber" component={SubCategoryPage} />
          <Route exact path="/unsubscribe" component={Unsubscribe} />
          <Route exact path="/404" component={PageNotFound} />
          <Route path="/:vodID" component={VodPage} />
          <Redirect to="/404" />
        </Switch>
        {(this.props.location.pathname.toLowerCase() !== '/terms-conditions' && this.props.location.pathname.toLowerCase() !== '/privacy-policy') ?
          <div>
            <Tooltip title="Contact us at 03401832782" placement="left">
              <a target="_blank" href="tel:03401832782" className="customerCareIcon"><CallOutlinedIcon className="floatingLogo"/></a>
            </Tooltip>
            <a target="_blank" href="https://api.whatsapp.com/send?phone=923427729484" className="whatsappIcon">Unsub via Whatsapp</a>
            {/* <a target="_blank" href="https://api.whatsapp.com/send?phone=923427729484" className="whatsappIcon"><WhatsAppIcon className="whatsappLogo"/></a> */}
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
