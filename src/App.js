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
import Home from "./Pages/Home/Index";
import LiveChannel from "./Pages/LiveChannel";
import Footer from "./Components/Footer/Footer";



class App extends React.Component {
  render() {
    return (
      <div>
        <Header currentRoute={this.props.location.pathname} />
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
          <Route exact path="/mylist" component={ListOverview} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default (withRouter)(App);
