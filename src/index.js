import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import * as serviceWorker from './serviceWorker';

JavascriptTimeAgo.addLocale(en);

/*
// Get the query parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const source = urlParams.get("source");

// Define a function to apply the theme based on the 'source' query parameter
function applyTheme() {
  if (source === "mta2") {
    console.log("Applying white theme");
    document.body.setAttribute("data-source", source);
  } else {
    // Remove the "data-source" attribute to revert to the default theme
    console.log("Reverting to default theme");
    document.body.removeAttribute("data-source");
  }
}

// Apply the theme initially
applyTheme();
*/

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// Listen for changes to the 'source' query parameter and reapply the theme
//window.addEventListener("popstate", applyTheme);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.unregister();
