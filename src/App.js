import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import { auth } from "./Firebase/firebase.utils";
import { CreateUserProfileDocument } from "./Firebase/firebase.utils";
import { setCurrentUser } from "./Redux/User/user-actions";
import { selectCurrentUser } from "./Redux/User/user-selectors";
import { connect } from "react-redux";
import SearchPage from "./Components/SearchPage/SearchPage";
import { compose } from "redux";
import { withRouter } from "react-router";
import ListOverview from "./Components/ListOverview/ListOverview";
import Home from "./Pages/Home/Home";
import LiveChannel from "./Pages/LiveChannel/LiveChannel";
import Footer from "./Components/Footer/Footer";
import Sidebar from "./Components/Sidebar/Sidebar";
import ChannelVodPage from "./Pages/VOD/ChannelVods";
import CategoryVodPage from "./Pages/VOD/CategoryVods";
import VodPage from "./Pages/VOD/VodPage";


class App extends React.Component {
  render() {
    return (
      <div>
        <Header currentRoute={this.props.location.pathname} />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/channel/:slug" component={LiveChannel}/>
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignIn />
            }
          />
          <Route
            exact
            path="/signup"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignUp />
            }
          />
          <Route exact path="/searchresults" component={SearchPage} />
          <Route exact path="/category/:category/page/:pageNumber" component={CategoryVodPage} />
          <Route exact path="/source/:source/page/:pageNumber" component={ChannelVodPage} />
          <Route exact path="/:vodID" component={VodPage} />
          <Route exact path="/mylist" component={ListOverview} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default (withRouter)(App);
