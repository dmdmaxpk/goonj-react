//App.js
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
import Profile from "./Pages/Profile/Profile";
import PageNotFound from "./Pages/StaticPages/PageNotFound";
import PrivacyPolicy from "./Pages/StaticPages/PrivacyPolicy";
import TermsConditions from "./Pages/StaticPages/TermsConditions";
import Unsubscribe from "./Pages/StaticPages/UnSubPage";
import SubCategoryPage from "./Pages/VOD/SubCategory";
import CricketPaywall from "./Pages/Paywall/CricketPaywall";
import { waleePageview } from "./Services/apiCalls";
import StickyBanner from "./Components/StickyBanner/StickyBanner";
import Logo from "./Assets/logo.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        isMta: false,
        isLightTheme: false
     }
}

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
    let utmSource = urlParams.get("utm_source");
    let Urlmsisdn = urlParams.get("msisdn");
    this.source = urlParams.get("source");
    let src = urlParams.get("src") ? urlParams.get("src") : '';
    let UrlSource = utmSource ? utmSource : src ? src : urlParams.get("source");
    let UrlAccessToken = urlParams.get("access_token");
    let UrlRefreshToken = urlParams.get("refresh_token");
    let mid = urlParams.get("mid");
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
    if(utmSource){
      waleePageview(utmSource);
    }
    else if(mid === 'tiktok'){
      window.ttq.track('ViewContent');
    }

    if((localStorage.getItem('livePermission') && localStorage.getItem('CPPermission') && (!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')))){
      localStorage.clear();
    }

    //mta checks
    if(this.source === 'mta' || this.source === 'mta2') {
      this.setState({isMta: true});
    }else{
      this.setState({isMta: false});
    }
    // Theme checks
    if(this.source === 'mta2'){
      this.setState({isLightTheme: true});
    }
    else{
      this.setState({isLightTheme: false});
    }
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
    const { isLightTheme } = this.state;
    return (
      <div >
        <div className={`App ${isLightTheme ? "light-theme" : "dark-theme"}`}>
          {
            this.props.location.pathname.toLowerCase() === '/binjee' || 
            this.props.location.pathname.toLowerCase() === '/mta'  || 
            this.state.isMta === true || this.props.location.search.includes('source=mta') ?
            ( <div className={`mta_div ${isLightTheme ? 'light-bg' : ''}`}>
                  <div className="mta_logo">
                    <a href={this.source === 'mta' ? "/?source=mta" : this.source === 'mta2' ? "/?source=mta2" : "/home" }> {/* see if i need to change this goonj.pk/?source=mta or not. Rn its working for localhost:3000 */}
                      <img src={Logo}/>  
                    </a>
                  </div>  
                  <div className={`mta_header ${isLightTheme ? 'mta2_header' : ''}`}> Goonj TV - Watch Live TV Anytime, Anywhere</div>
                  <div className="mta_ad1">Ad Space 1</div>
              </div>
      
            )
            :
            (<div>
              <Header currentRoute={this.props.location.pathname} /> 
              <Sidebar />
              {/* <Feedback /> */}
            </div>)
          }
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
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/terms-conditions" component={TermsConditions} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/live-tv" component={LiveTv} />
            <Route exact path="/live-tv?source=mta" component={LiveTv} />
            <Route exact path="/live-tv?source=mta2" component={LiveTv} />
            <Route exact path="/channel/:slug" component={LiveChannel} />
            {/* <Route exact path="/stream/t10-league" component={FreeChannel} /> */}
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
            <Route exact path="/paywall/cricket" component={CricketPaywall} />
            <Route exact path="/goonjplus/subscribe">
              <Redirect to="/paywall/live"/>
            </Route>
            <Route exact path="/news">
              <Redirect to="/stream/zet20"/>
            </Route>
            <Route exact path="/category/drama/Sandy Mandy/page/:pageNumber" component={SubCategoryPage}>
              <Redirect to="/404" />
            </Route>
            <Route exact path="/category/:category/:subCategory/page/:pageNumber" component={SubCategoryPage} />
            <Route exact path="/unsubscribe" component={Unsubscribe} />
            <Route exact path="/unsub" component={Unsubscribe} />
            <Route exact path="/404" component={PageNotFound} />
            <Route path="/:vodID" component={VodPage} />
            <Redirect to="/404" />
          </Switch>
          {(this.props.location.pathname.toLowerCase() !== '/terms-conditions' && this.props.location.pathname.toLowerCase() !== '/privacy-policy') ?
            <div>
              {
                this.state.isMta === true || this.props.location.search.includes('source=mta') || this.props.location.search.includes('source=mta2')  ?
                ( <div className={`mta_footer_div ${isLightTheme ? 'light-bg' : ''}`}>
                    <div className="mta_ad2">Ad Space 2</div>
                  </div>
                )
                :
                (<div><Footer/><StickyBanner /></div>)
              }
            </div>
            :
            ''
          }

        </div>
      </div>
    );
  }
}

export default withRouter(App);
